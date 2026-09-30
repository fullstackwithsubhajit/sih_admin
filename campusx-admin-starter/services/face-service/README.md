# CampusX Face Recognition Service

Keep the existing Python/OpenCV implementation here and expose it through a small FastAPI service.

Planned endpoint:
- POST /recognize — image/frame -> studentId, name, confidence
- POST /enroll — studentId + image -> face enrollment
- GET /health — service health

Do not rewrite OpenCV into TypeScript. Next.js should call this service over HTTP.
