"use client";

import { useState } from "react";
import {
    BriefcaseBusiness,
    Target,
    Users,
    GraduationCap,
    Building2,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { students } from "@/lib/data/students";

const stakeholders = [
    {
        name: "Oracle",
        role: "Software Engineer",
        openings: 12,
        ready: 34,
        match: 86,
        skills: ["Java", "SQL", "DSA", "Cloud", "System Design"],
    },
    {
        name: "Flipkart",
        role: "SDE - Backend",
        openings: 8,
        ready: 21,
        match: 82,
        skills: ["Java", "Spring Boot", "SQL", "DSA", "AWS"],
    },
    {
        name: "Amazon",
        role: "Software Development Engineer",
        openings: 10,
        ready: 27,
        match: 89,
        skills: ["DSA", "Java", "AWS", "System Design", "Python"],
    },
    {
        name: "TCS",
        role: "Full Stack Developer",
        openings: 15,
        ready: 48,
        match: 84,
        skills: ["React", "Node.js", "SQL", "Git", "JavaScript"],
    },
];

const recruiterStudents = [
    {
        name: "Arjun Sen",
        id: "STU-2026-1048",
        match: 94,
        readiness: 88,
        gap: "AWS",
    },
    {
        name: "Priya Roy",
        id: "STU-2026-1052",
        match: 91,
        readiness: 86,
        gap: "System Design",
    },
    {
        name: "Ananya Dutta",
        id: "STU-2026-1061",
        match: 87,
        readiness: 81,
        gap: "Cloud",
    },
    {
        name: "Reya Sharma",
        id: "STU-2026-1064",
        match: 84,
        readiness: 79,
        gap: "AWS",
    },
];

export default function Careers() {
    const [selectedStakeholder, setSelectedStakeholder] = useState(
        stakeholders[0]
    );

    return (
        <>
            <PageHeader
                title="Career & Jobs"
                description="Monitor career goals, job readiness and institutional skill gaps."
            />

            {/* TOP STATS */}
            <div className="stats-grid four">
                {[
                    ["Avg Career Readiness", "68%", Target],
                    ["Students Targeting Jobs", "1,024", Users],
                    ["Job Roles Tracked", "32", BriefcaseBusiness],
                    ["Ready for Jobs", "342", GraduationCap],
                ].map(([a, b, Icon]) => (
                    <div
                        className="stat-card icon-stat"
                        key={a as string}
                    >
                        <div>
                            <span>{a as string}</span>
                            <strong>{b as string}</strong>
                        </div>

                        <Icon size={21} />
                    </div>
                ))}
            </div>

            {/* HIRING STAKEHOLDERS */}
            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Hiring Stakeholders</h2>
                        <p>
                            Companies currently looking for students from the
                            college.
                        </p>
                    </div>

                    <Building2 size={21} />
                </div>

                <div className="stakeholder-grid">
                    {stakeholders.map((stakeholder) => {
                        const selected =
                            selectedStakeholder.name === stakeholder.name;

                        return (
                            <button
                                key={stakeholder.name}
                                onClick={() =>
                                    setSelectedStakeholder(stakeholder)
                                }
                                className={`stakeholder-card ${
                                    selected ? "selected" : ""
                                }`}
                            >
                                <div className="stakeholder-top">
                                    <div className="stakeholder-logo">
                                        <Building2 size={20} />
                                    </div>

                                    {selected && (
                                        <CheckCircle2
                                            size={18}
                                            className="stakeholder-check"
                                        />
                                    )}
                                </div>

                                <h3>{stakeholder.name}</h3>

                                <p>{stakeholder.role}</p>

                                <div className="stakeholder-stats">
                                    <div>
                                        <span>Openings</span>
                                        <b>{stakeholder.openings}</b>
                                    </div>

                                    <div>
                                        <span>Students Ready</span>
                                        <b>{stakeholder.ready}</b>
                                    </div>
                                </div>

                                <div className="stakeholder-match">
                                    <div>
                                        <span>Avg. Skill Match</span>
                                        <b>{stakeholder.match}%</b>
                                    </div>

                                    <div className="progress">
                                        <i
                                            style={{
                                                width: `${stakeholder.match}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* RECRUITER REQUIREMENT + READY STUDENTS */}
            <div className="grid-2 recruiter-section">
                {/* SELECTED COMPANY */}
                <section className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>{selectedStakeholder.name}</h2>
                            <p>{selectedStakeholder.role}</p>
                        </div>

                        <BriefcaseBusiness size={21} />
                    </div>

                    <div className="recruiter-metrics">
                        <div>
                            <span>Open Positions</span>
                            <strong>
                                {selectedStakeholder.openings}
                            </strong>
                        </div>

                        <div>
                            <span>Students Ready</span>
                            <strong>
                                {selectedStakeholder.ready}
                            </strong>
                        </div>
                    </div>

                    <div className="requirements-section">
                        <h3>Required Skills</h3>

                        <div className="requirements">
                            {selectedStakeholder.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="have"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* READY STUDENTS */}
                <section className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Students Ready for Recruitment</h2>
                            <p>
                                Students matching{" "}
                                {selectedStakeholder.name}'s requirements.
                            </p>
                        </div>

                        <Users size={21} />
                    </div>

                    <div className="recruiter-student-list">
                        {recruiterStudents.map((student) => (
                            <div
                                className="recruiter-student"
                                key={student.id}
                            >
                                <div className="recruiter-student-info">
                                    <strong>{student.name}</strong>
                                    <span>{student.id}</span>
                                </div>

                                <div className="recruiter-score">
                                    <span>Skill Match</span>
                                    <b>{student.match}%</b>
                                </div>

                                <div className="recruiter-score">
                                    <span>Readiness</span>
                                    <b>{student.readiness}%</b>
                                </div>

                                <div className="recruiter-gap">
                                    <span>Skill Gap</span>
                                    <b>{student.gap}</b>
                                </div>

                                <button className="shortlist-button">
                                    Shortlist
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* COLLEGE SKILL GAP */}
            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>College Skill-Gap Planning</h2>
                        <p>
                            Turn common skill gaps into training decisions.
                        </p>
                    </div>
                </div>

                <div className="callout">
                    <b>
                        68% of students targeting Full Stack Development have
                        a Docker skill gap.
                    </b>

                    <span>
                        Suggested institutional response: Docker &amp; DevOps
                        Workshop
                    </span>
                </div>
            </section>
        </>
    );
}