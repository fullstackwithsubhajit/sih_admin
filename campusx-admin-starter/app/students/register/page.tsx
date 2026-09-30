"use client";

import { useState } from "react";
import {
  Camera,
  Check,
  Loader2,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";

const FACE_SERVICE_URL = "http://127.0.0.1:8000";

const demoStudent = {
  name: "Arjun Sen",
  id: "STU-2026-1048",
  email: "arjun.sen@campusx.edu",
  phone: "+91 98765 43210",
  department: "Computer Science & Engineering",
  semester: "3",
  dob: "2006-08-14",
  gender: "Male",
  percentage10: "91%",
  percentage12: "88%",
  cgpa: "8.6",
  admissionYear: "2024",
  careerGoal: "Full Stack Developer",
  targetRole: "Software Engineer",
  industry: "Technology",
  location: "Bengaluru",
  skills: "JavaScript, React, Node.js, SQL, Git",
  bio: "Aspiring software engineer interested in full-stack development and modern web technologies.",
};

export default function RegisterStudent() {
  const router = useRouter();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ==========================================================
  // OPEN CAMERA
  // ==========================================================

  const openCamera = () => {
    setError("");
    setCameraOpen(true);
  };

  // ==========================================================
  // CLOSE CAMERA
  // ==========================================================

  const closeCamera = () => {
    if (capturing) return;

    setCameraOpen(false);
    setError("");
  };

  // ==========================================================
  // CAPTURE PHOTO
  // ==========================================================

  const capturePhoto = async () => {
    setCapturing(true);
    setError("");

    try {
      const response = await fetch(
        `${FACE_SERVICE_URL}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: demoStudent.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to capture the student photo."
        );
      }

      const imageUrl =
        `${FACE_SERVICE_URL}${data.image_url}`;

      setCapturedPhoto(imageUrl);
      setCameraOpen(false);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to capture photo."
      );
    } finally {
      setCapturing(false);
    }
  };

  // ==========================================================
  // REGISTER STUDENT
  // ==========================================================

  const registerStudent = () => {
    if (!capturedPhoto) {
      setError(
        "Please capture the student's photo before continuing."
      );
      return;
    }

    setSaving(true);
    setError("");

    const newStudent = {
      id: demoStudent.id,
      name: demoStudent.name,
      email: demoStudent.email,
      phone: demoStudent.phone,

      department: "CSE",
      semester: Number(demoStudent.semester),

      // Actual captured image
      photo: capturedPhoto,

      // Demo academic data
      attendance: 92,
      readiness: 78,
      courses: 12,
      projects: 4,
      assessments: 8,

      career: demoStudent.careerGoal,

      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Git",
      ],

      status: "On Track",

      // Additional information
      dob: demoStudent.dob,
      gender: demoStudent.gender,
      percentage10: demoStudent.percentage10,
      percentage12: demoStudent.percentage12,
      cgpa: demoStudent.cgpa,
      admissionYear: demoStudent.admissionYear,
      targetRole: demoStudent.targetRole,
      industry: demoStudent.industry,
      location: demoStudent.location,
      bio: demoStudent.bio,
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("campusx_students") ||
          "[]"
      );

      // Remove old version of this student.
      // This is important because Arjun already exists
      // inside students.ts.
      const filtered = Array.isArray(existing)
        ? existing.filter(
            (student: { id: string }) =>
              student.id !== newStudent.id
          )
        : [];

      localStorage.setItem(
        "campusx_students",
        JSON.stringify([
          ...filtered,
          newStudent,
        ])
      );

      // Go to All Students
      setTimeout(() => {
        router.push("/students");
      }, 400);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to save the student. Please try again."
      );

      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Register Student"
        description="Capture the student's face to create their CampusX profile."
      />

      <div className="register-single-page">

        {/* ====================================================
            PHOTO PANEL
        ==================================================== */}

        <section className="panel registration-photo-card">

          <div className="registration-section-heading">
            <div>
              <h2>Student Photo</h2>

              <p>
                Capture one clear face for attendance
                and identification.
              </p>
            </div>

            <span className="required-chip">
              Required
            </span>
          </div>

          <div className="registration-photo-layout">

            <div className="registration-camera-area">

              <div className="camera-box registration-camera-box">

                {cameraOpen ? (
                  <>
                    <img
                      src={`${FACE_SERVICE_URL}/camera`}
                      alt="Live student camera"
                      className="live-camera-feed"
                    />

                    <div className="camera-live-indicator">
                      <span />
                      LIVE
                    </div>
                  </>
                ) : capturedPhoto ? (
                  <>
                    <img
                      src={capturedPhoto}
                      alt="Captured student"
                      className="captured-student-photo"
                    />

                    <div className="photo-success-badge">
                      <Check size={13} />
                      Photo Captured
                    </div>
                  </>
                ) : (
                  <div className="camera-placeholder">
                    <Camera size={34} />

                    <strong>
                      Student Photo
                    </strong>

                    <span>
                      Camera image will appear here
                    </span>
                  </div>
                )}

              </div>

              {cameraOpen ? (
                <div className="camera-controls">

                  <button
                    className="primary-btn full"
                    onClick={capturePhoto}
                    disabled={capturing}
                  >
                    {capturing ? (
                      <>
                        <Loader2
                          size={16}
                          className="spin"
                        />

                        Capturing Face...
                      </>
                    ) : (
                      <>
                        <Camera size={16} />

                        Capture Photo
                      </>
                    )}
                  </button>

                  <button
                    className="secondary-btn full"
                    onClick={closeCamera}
                    disabled={capturing}
                  >
                    <X size={16} />

                    Cancel Camera
                  </button>

                </div>
              ) : (
                <button
                  className="primary-btn full"
                  onClick={openCamera}
                >
                  <Camera size={16} />

                  {capturedPhoto
                    ? "Retake Photo"
                    : "Open Camera"}
                </button>
              )}

              {error && (
                <div className="camera-error">
                  {error}
                </div>
              )}

            </div>

            {/* ==================================================
                STUDENT SUMMARY
            ================================================== */}

            <div className="registration-student-summary">

              <div className="student-summary-avatar">

                {capturedPhoto ? (
                  <img
                    src={capturedPhoto}
                    alt={demoStudent.name}
                  />
                ) : (
                  <UserRound size={28} />
                )}

              </div>

              <div>

                <span className="summary-label">
                  Student being registered
                </span>

                <h3>
                  {demoStudent.name}
                </h3>

                <p>
                  {demoStudent.id}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================================
            STUDENT INFORMATION
        ==================================================== */}

        <section className="panel registration-details-card">

          <div className="registration-section-heading">

            <div>
              <h2>Student Information</h2>

              <p>
                Information is pre-filled for this
                registration demonstration.
              </p>
            </div>

            <span className="prefilled-chip">
              Pre-filled
            </span>

          </div>

          <div className="prefilled-grid">

            <div className="prefilled-field">
              <span>Full Name</span>
              <strong>
                {demoStudent.name}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Student ID / Roll No.</span>
              <strong>
                {demoStudent.id}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Email</span>
              <strong>
                {demoStudent.email}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Phone</span>
              <strong>
                {demoStudent.phone}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Department</span>
              <strong>
                {demoStudent.department}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Semester</span>
              <strong>
                Semester {demoStudent.semester}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Date of Birth</span>
              <strong>
                {demoStudent.dob}
              </strong>
            </div>

            <div className="prefilled-field">
              <span>Gender</span>
              <strong>
                {demoStudent.gender}
              </strong>
            </div>

          </div>

        </section>

        {/* ====================================================
            ACADEMIC + CAREER
        ==================================================== */}

        <div className="registration-bottom-grid">

          <section className="panel">

            <div className="registration-section-heading">

              <div>
                <h2>Academic Profile</h2>

                <p>
                  Current academic information.
                </p>
              </div>

            </div>

            <div className="prefilled-grid compact">

              <div className="prefilled-field">
                <span>10th Percentage</span>
                <strong>
                  {demoStudent.percentage10}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>12th Percentage</span>
                <strong>
                  {demoStudent.percentage12}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>Current CGPA</span>
                <strong>
                  {demoStudent.cgpa}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>Admission Year</span>
                <strong>
                  {demoStudent.admissionYear}
                </strong>
              </div>

            </div>

          </section>

          <section className="panel">

            <div className="registration-section-heading">

              <div>
                <h2>Career Profile</h2>

                <p>
                  Student's career direction.
                </p>
              </div>

            </div>

            <div className="prefilled-grid compact">

              <div className="prefilled-field">
                <span>Career Goal</span>
                <strong>
                  {demoStudent.careerGoal}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>Target Role</span>
                <strong>
                  {demoStudent.targetRole}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>Industry</span>
                <strong>
                  {demoStudent.industry}
                </strong>
              </div>

              <div className="prefilled-field">
                <span>Preferred Location</span>
                <strong>
                  {demoStudent.location}
                </strong>
              </div>

            </div>

            <div className="skills-preview">

              <span>
                Current Skills
              </span>

              <div>
                {demoStudent.skills
                  .split(", ")
                  .map((skill) => (
                    <b key={skill}>
                      {skill}
                    </b>
                  ))}
              </div>

            </div>

          </section>

        </div>

        {/* ====================================================
            CONTINUE
        ==================================================== */}

        <section className="registration-footer panel">

          <div>

            <span>
              Ready to register?
            </span>

            <p>
              Capture the student's face and continue
              to add this profile to All Students.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={registerStudent}
            disabled={!capturedPhoto || saving}
          >
            {saving ? (
              <>
                <Loader2
                  size={16}
                  className="spin"
                />

                Saving Student...
              </>
            ) : (
              <>
                Continue & Register Student

                <Check size={16} />
              </>
            )}
          </button>

        </section>

      </div>
    </>
  );
}