import cv2
import face_recognition
import os
import time
import threading

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


# ============================================================
# CONFIGURATION
# ============================================================

IP_CAMERA_URL = "http://192.0.0.4:8080/video"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SAVE_FOLDER = os.path.join(
    BASE_DIR,
    "Captured_Faces"
)

os.makedirs(SAVE_FOLDER, exist_ok=True)


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="CampusX Face Recognition Service"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/captured-faces",
    StaticFiles(directory=SAVE_FOLDER),
    name="captured-faces",
)


# ============================================================
# CAMERA STATE
# ============================================================

cap = None

camera_lock = threading.Lock()

latest_frame = None

camera_thread = None

camera_running = False


# ============================================================
# CAMERA CONNECTION
# ============================================================

def get_camera():

    global cap

    with camera_lock:

        if cap is not None and cap.isOpened():
            return cap

        print("Connecting to IP Camera...")

        camera = cv2.VideoCapture(
            IP_CAMERA_URL
        )

        camera.set(
            cv2.CAP_PROP_BUFFERSIZE,
            1
        )

        if not camera.isOpened():

            print(
                "IP camera failed. "
                "Trying default webcam..."
            )

            camera.release()

            camera = cv2.VideoCapture(0)

        if not camera.isOpened():

            raise RuntimeError(
                "Could not open IP camera or webcam."
            )

        cap = camera

        print("Camera connected.")

        return cap


# ============================================================
# FACE DETECTION
# ============================================================

def detect_faces(frame):

    small_frame = cv2.resize(
        frame,
        (0, 0),
        fx=0.25,
        fy=0.25
    )

    rgb_small_frame = cv2.cvtColor(
        small_frame,
        cv2.COLOR_BGR2RGB
    )

    locations = face_recognition.face_locations(
        rgb_small_frame,
        model="hog"
    )

    return [
        (
            top * 4,
            right * 4,
            bottom * 4,
            left * 4
        )
        for top, right, bottom, left
        in locations
    ]


# ============================================================
# BACKGROUND CAMERA READER
# ============================================================

def camera_reader():

    global latest_frame
    global camera_running

    camera_running = True

    camera = get_camera()

    print("Camera reader started.")

    while camera_running:

        success, frame = camera.read()

        if not success:

            print("Camera frame read failed.")

            time.sleep(0.1)

            continue

        # Store the newest frame.
        # Capture requests will use this frame.
        with camera_lock:

            latest_frame = frame.copy()


# ============================================================
# START CAMERA READER
# ============================================================

def ensure_camera_reader():

    global camera_thread

    if (
        camera_thread is None
        or not camera_thread.is_alive()
    ):

        camera_thread = threading.Thread(
            target=camera_reader,
            daemon=True
        )

        camera_thread.start()


# ============================================================
# LIVE CAMERA
# ============================================================

def generate_frames():

    ensure_camera_reader()

    while True:

        with camera_lock:

            if latest_frame is None:

                frame = None

            else:

                frame = latest_frame.copy()

        if frame is None:

            time.sleep(0.05)

            continue

        # Detect face on the current frame
        face_locations = detect_faces(frame)

        display_frame = frame.copy()

        for (
            top,
            right,
            bottom,
            left
        ) in face_locations:

            cv2.rectangle(
                display_frame,
                (left, top),
                (right, bottom),
                (0, 255, 0),
                2
            )

            cv2.putText(
                display_frame,
                "Face detected",
                (
                    left,
                    max(25, top - 10)
                ),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

        success, encoded = cv2.imencode(
            ".jpg",
            display_frame
        )

        if not success:
            continue

        frame_bytes = encoded.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes
            + b"\r\n"
        )


@app.get("/camera")
def camera_stream():

    ensure_camera_reader()

    return StreamingResponse(
        generate_frames(),
        media_type=(
            "multipart/x-mixed-replace; "
            "boundary=frame"
        ),
    )


# ============================================================
# CAPTURE REQUEST
# ============================================================

class CaptureRequest(BaseModel):

    student_id: str


@app.post("/capture")
def capture_face(
    request: CaptureRequest
):

    global latest_frame

    print(
        f"Capture requested for student: "
        f"{request.student_id}"
    )

    ensure_camera_reader()

    # --------------------------------------------------------
    # Get the latest frame from the camera
    # --------------------------------------------------------

    with camera_lock:

        if latest_frame is None:

            raise HTTPException(
                status_code=503,
                detail="Camera is starting. Please try again."
            )

        frame = latest_frame.copy()

    print("Got latest camera frame.")

    # --------------------------------------------------------
    # Detect faces
    # --------------------------------------------------------

    face_locations = detect_faces(
        frame
    )

    print(
        f"Faces detected: "
        f"{len(face_locations)}"
    )

    # --------------------------------------------------------
    # No face
    # --------------------------------------------------------

    if len(face_locations) == 0:

        raise HTTPException(
            status_code=400,
            detail=(
                "No face detected. "
                "Please position the student "
                "inside the camera frame."
            )
        )

    # --------------------------------------------------------
    # Multiple faces
    # --------------------------------------------------------

    if len(face_locations) > 1:

        raise HTTPException(
            status_code=400,
            detail=(
                "Multiple faces detected. "
                "Please make sure only the "
                "student is visible."
            )
        )

    # --------------------------------------------------------
    # Exactly one face
    # --------------------------------------------------------

    (
        top,
        right,
        bottom,
        left
    ) = face_locations[0]

    face_width = right - left

    face_height = bottom - top

    face_center_x = (
        left + right
    ) // 2

    # --------------------------------------------------------
    # 3:4 portrait crop
    # --------------------------------------------------------

    crop_width = int(
        face_width * 3.0
    )

    crop_height = int(
        crop_width * 4 / 3
    )

    crop_left = (
        face_center_x
        - crop_width // 2
    )

    crop_top = (
        top
        - int(face_height * 0.7)
    )

    crop_right = (
        crop_left
        + crop_width
    )

    crop_bottom = (
        crop_top
        + crop_height
    )

    # --------------------------------------------------------
    # Keep crop inside image
    # --------------------------------------------------------

    if crop_left < 0:

        crop_right -= crop_left

        crop_left = 0

    if crop_right > frame.shape[1]:

        shift = (
            crop_right
            - frame.shape[1]
        )

        crop_left -= shift

        crop_right = frame.shape[1]

    if crop_top < 0:

        crop_bottom -= crop_top

        crop_top = 0

    if crop_bottom > frame.shape[0]:

        shift = (
            crop_bottom
            - frame.shape[0]
        )

        crop_top -= shift

        crop_bottom = frame.shape[0]

    crop_left = max(
        0,
        crop_left
    )

    crop_top = max(
        0,
        crop_top
    )

    crop_right = min(
        frame.shape[1],
        crop_right
    )

    crop_bottom = min(
        frame.shape[0],
        crop_bottom
    )

    # --------------------------------------------------------
    # Create cropped image
    # --------------------------------------------------------

    face_image = frame[
        crop_top:crop_bottom,
        crop_left:crop_right
    ]

    if face_image.size == 0:

        raise HTTPException(
            status_code=500,
            detail="Could not create face crop."
        )

    # --------------------------------------------------------
    # Save using Student ID
    # --------------------------------------------------------

    filename = (
        f"{request.student_id}.jpg"
    )

    filepath = os.path.join(
        SAVE_FOLDER,
        filename
    )

    saved = cv2.imwrite(
        filepath,
        face_image
    )

    if not saved:

        raise HTTPException(
            status_code=500,
            detail="Could not save captured image."
        )

    print(
        f"Saved face for "
        f"{request.student_id}: "
        f"{filepath}"
    )

    # --------------------------------------------------------
    # Response
    # --------------------------------------------------------

    return {
        "success": True,
        "student_id": request.student_id,
        "filename": filename,
        "image_url": (
            f"/captured-faces/"
            f"{filename}"
        ),
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "camera": (
            cap is not None
            and cap.isOpened()
        ),
        "frame_available": (
            latest_frame is not None
        ),
    }