"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { students as initialStudents } from "@/lib/data/students";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/shared/PageHeader";

export default function Students() {
  const [studentList, setStudentList] =
    useState(initialStudents);

  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [sem, setSem] = useState("All");
  const [status, setStatus] = useState("All");

  // ==========================================================
  // LOAD SAVED STUDENTS
  // ==========================================================

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("campusx_students") ||
          "[]"
      );

      if (!Array.isArray(saved)) {
        return;
      }

      const merged = [...initialStudents];

      saved.forEach((savedStudent) => {
        const existingIndex =
          merged.findIndex(
            (student) =>
              student.id === savedStudent.id
          );

        if (existingIndex >= 0) {
          // Replace existing demo student
          // with newly registered student.
          merged[existingIndex] = savedStudent;
        } else {
          // Add a completely new student.
          merged.push(savedStudent);
        }
      });

      setStudentList(merged);
    } catch (error) {
      console.error(
        "Could not load registered students:",
        error
      );
    }
  }, []);

  // ==========================================================
  // FILTER STUDENTS
  // ==========================================================

  const filtered = useMemo(() => {
    return studentList.filter((s) => {
      const search =
        `${s.name} ${s.id} ${s.department}`
          .toLowerCase();

      return (
        search.includes(q.toLowerCase()) &&
        (dept === "All" ||
          s.department === dept) &&
        (sem === "All" ||
          String(s.semester) === sem) &&
        (status === "All" ||
          s.status === status)
      );
    });
  }, [
    studentList,
    q,
    dept,
    sem,
    status,
  ]);

  return (
    <>
      <PageHeader
        title="All Students"
        description="Manage and view all registered students."
        action="Add Student"
        href="/students/register"
      />

      <div className="panel">

        {/* ====================================================
            FILTERS
        ==================================================== */}

        <div className="filters">

          <input
            placeholder="Search by name, ID or department..."
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
          />

          <select
            value={dept}
            onChange={(e) =>
              setDept(e.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="IT">
              IT
            </option>

            <option value="ME">
              ME
            </option>
          </select>

          <select
            value={sem}
            onChange={(e) =>
              setSem(e.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="On Track">
              On Track
            </option>

            <option value="Monitor">
              Monitor
            </option>

            <option value="Needs Attention">
              Needs Attention
            </option>
          </select>

        </div>

        {/* ====================================================
            STUDENT TABLE
        ==================================================== */}

        <div className="table-scroll">

          <table className="students-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>ID</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Attendance</th>
                <th>Career Readiness</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((s, i) => (

                <tr
                  key={s.id}
                  className="student-clickable-row"
                  onClick={() => {
                    window.location.href =
                      `/students/${s.id}`;
                  }}
                >

                  <td>
                    {i + 1}
                  </td>

                  <td>

                    <Link
                      href={`/students/${s.id}`}
                      className="person link-person"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <img
                        src={s.photo}
                        alt={s.name}
                      />

                      <span>
                        {s.name}
                      </span>

                    </Link>

                  </td>

                  <td>
                    {s.id}
                  </td>

                  <td>
                    {s.department}
                  </td>

                  <td>
                    {s.semester}
                  </td>

                  <td>
                    <b>
                      {s.attendance}%
                    </b>
                  </td>

                  <td>
                    <b>
                      {s.readiness}%
                    </b>
                  </td>

                  <td>

                    <Badge
                      tone={
                        s.status === "On Track"
                          ? "green"
                          : s.status === "Monitor"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {s.status}
                    </Badge>

                  </td>

                  <td>

                    <Link
                      href={`/students/${s.id}`}
                      className="icon-btn"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <MoreHorizontal
                        size={18}
                      />
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}