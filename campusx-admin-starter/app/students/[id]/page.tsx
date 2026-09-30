"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  GraduationCap,
  Target,
} from "lucide-react";
import { useParams } from "next/navigation";

import { students as initialStudents } from "@/lib/data/students";
import { Badge } from "@/components/shared/Badge";
import { TrendChart } from "@/components/dashboard/Charts";

type Student = (typeof initialStudents)[number] & {
  phone?: string;
  dob?: string;
  gender?: string;
  percentage10?: string;
  percentage12?: string;
  cgpa?: string;
  admissionYear?: string;
  targetRole?: string;
  industry?: string;
  location?: string;
  bio?: string;
};

export default function StudentProfile() {
  const params = useParams();

  const id = params.id as string;

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // LOAD STUDENT
  // ==========================================================

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("campusx_students") ||
          "[]"
      );

      const savedStudents: Student[] =
        Array.isArray(saved) ? saved : [];

      // First look for the latest registered version
      const savedStudent =
        savedStudents.find(
          (s) => s.id === id
        );

      if (savedStudent) {
        setStudent(savedStudent);
        setLoading(false);
        return;
      }

      // Otherwise use original demo data
      const originalStudent =
        initialStudents.find(
          (s) => s.id === id
        );

      if (originalStudent) {
        setStudent(originalStudent);
      }

      setLoading(false);
    } catch (error) {
      console.error(
        "Could not load student:",
        error
      );

      const originalStudent =
        initialStudents.find(
          (s) => s.id === id
        );

      if (originalStudent) {
        setStudent(originalStudent);
      }

      setLoading(false);
    }
  }, [id]);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="panel">
        <p>Loading student...</p>
      </div>
    );
  }

  // ==========================================================
  // STUDENT NOT FOUND
  // ==========================================================

  if (!student) {
    return (
      <div className="panel">
        <h2>Student not found</h2>

        <Link
          href="/students"
          className="back-link"
        >
          <ArrowLeft size={16} />
          Back to Students
        </Link>
      </div>
    );
  }

  // ==========================================================
  // MAIN PROFILE
  // ==========================================================

  return (
    <>
      {/* BACK */}

      <Link
        href="/students"
        className="back-link"
      >
        <ArrowLeft size={16} />
        Back to Students
      </Link>

      {/* ====================================================
          PROFILE HEADER
      ==================================================== */}

      <div className="profile-head panel">

        <div className="profile-main">

          <img
            src={student.photo}
            alt={student.name}
          />

          <div>

            <h1>
              {student.name}
            </h1>

            <p>
              {student.id} · {student.department} ·
              {" "}
              Semester {student.semester}
            </p>

            <p>
              {student.email}
            </p>

            <Badge tone="green">
              Active
            </Badge>

          </div>

        </div>

        <div>
          <b>Career Goal</b>

          <strong>
            {student.career}
          </strong>
        </div>

      </div>

      {/* ====================================================
          METRICS
      ==================================================== */}

      <div className="metric-grid">

        {[
          [
            "Career Readiness",
            `${student.readiness}%`,
            Target,
          ],

          [
            "Attendance",
            `${student.attendance}%`,
            CalendarCheck,
          ],

          [
            "Courses",
            `${student.courses}/18`,
            BookOpen,
          ],

          [
            "Projects",
            student.projects,
            BriefcaseBusiness,
          ],

          [
            "Assessments",
            student.assessments,
            GraduationCap,
          ],
        ].map(([label, value, Icon]) => {

          const MetricIcon =
            Icon as React.ElementType;

          return (
            <div
              className="metric-card"
              key={label as string}
            >
              <span>
                {label as string}
              </span>

              <strong>
                {value as string}
              </strong>

              <MetricIcon size={20} />
            </div>
          );
        })}

      </div>

      {/* ====================================================
          PROFILE GRID
      ==================================================== */}

      <div className="profile-grid">

        {/* LEARNING */}

        <section className="panel">

          <div className="panel-head">

            <div>
              <h2>
                Learning Progress
              </h2>

              <p>
                Recent attendance and engagement trend
              </p>
            </div>

          </div>

          <TrendChart />

          <div className="course-list">

            {[
              ["React", "60%"],
              ["Node.js", "45%"],
              ["SQL", "70%"],
              ["Docker", "20%"],
            ].map(([name, percentage]) => (

              <div key={name}>

                <span>
                  {name}
                </span>

                <div>
                  <i
                    style={{
                      width: percentage,
                    }}
                  />
                </div>

                <b>
                  {percentage}
                </b>

              </div>

            ))}

          </div>

        </section>

        {/* SKILLS */}

        <section className="panel">

          <div className="panel-head">
            <h2>
              Skill Proficiency
            </h2>
          </div>

          <div className="skill-list">

            {student.skills.map(
              (skill, index) => {

                const percentage =
                  Math.max(
                    42,
                    92 - index * 7
                  );

                return (
                  <div key={skill}>

                    <span>
                      {skill}
                    </span>

                    <div>
                      <i
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <b>
                      {percentage}%
                    </b>

                  </div>
                );
              }
            )}

          </div>

          <h3 className="subheading">
            Skill Gaps
          </h3>

          <div className="gap-list">

            <span>
              Docker
            </span>

            <span>
              AWS
            </span>

            <span>
              System Design
            </span>

            <span>
              Testing
            </span>

          </div>

        </section>

      </div>

      {/* ====================================================
          CAREER MONITORING
      ==================================================== */}

      <section className="panel career-card">

        <div>

          <h2>
            Career Monitoring
          </h2>

          <p>
            Job alignment against the student's
            target role.
          </p>

        </div>

        <div className="career-cols">

          <div>

            <span>
              Target role
            </span>

            <b>
              {student.career}
            </b>

          </div>

          <div>

            <span>
              Job skill alignment
            </span>

            <b>
              {student.readiness + 15}%
            </b>

          </div>

          <div>

            <span>
              Ready for
            </span>

            <b>
              Junior Software Engineer
            </b>

          </div>

        </div>

      </section>
    </>
  );
}