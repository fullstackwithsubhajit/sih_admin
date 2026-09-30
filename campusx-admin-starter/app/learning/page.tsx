"use client";

import { useMemo, useRef, useState } from "react";
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    Clock3,
    GraduationCap,
    Plus,
    Search,
    Send,
    Target,
    TrendingUp,
    X,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { students } from "@/lib/data/students";

type CourseStatus = "Completed" | "In Progress" | "Not Started";

type LearningCourse = {
    name: string;
    progress: number;
    status: CourseStatus;
};

type LearningSkill = {
    name: string;
    progress: number;
};

type LearningActivity = {
    month: string;
    progress: number;
};

type StudentLearningData = {
    coursesCompleted: number;
    totalCourses: number;
    inProgress: number;
    notStarted: number;
    overallProgress: number;

    courses: LearningCourse[];

    skills: LearningSkill[];

    activity: LearningActivity[];

    recommended: string[];

    skillGaps: string[];
};

type AdminRecommendation = {
    id: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
};

const learningData: Record<string, StudentLearningData> = {
    "1": {
        coursesCompleted: 12,
        totalCourses: 18,
        inProgress: 4,
        notStarted: 2,
        overallProgress: 78,

        courses: [
            {
                name: "Data Structures & Algorithms",
                progress: 91,
                status: "Completed",
            },
            {
                name: "Database Management Systems",
                progress: 87,
                status: "Completed",
            },
            {
                name: "Web Development",
                progress: 88,
                status: "Completed",
            },
            {
                name: "React Development",
                progress: 76,
                status: "In Progress",
            },
            {
                name: "Node.js & Backend",
                progress: 54,
                status: "In Progress",
            },
            {
                name: "Docker & DevOps",
                progress: 20,
                status: "In Progress",
            },
        ],

        skills: [
            {
                name: "JavaScript",
                progress: 90,
            },
            {
                name: "React",
                progress: 82,
            },
            {
                name: "Node.js",
                progress: 65,
            },
            {
                name: "SQL",
                progress: 88,
            },
            {
                name: "Git",
                progress: 94,
            },
            {
                name: "Docker",
                progress: 20,
            },
            {
                name: "AWS",
                progress: 15,
            },
        ],

        activity: [
            {
                month: "Jan",
                progress: 58,
            },
            {
                month: "Feb",
                progress: 64,
            },
            {
                month: "Mar",
                progress: 69,
            },
            {
                month: "Apr",
                progress: 73,
            },
            {
                month: "May",
                progress: 76,
            },
            {
                month: "Jun",
                progress: 78,
            },
        ],

        recommended: [
            "Docker & DevOps Fundamentals",
            "AWS Cloud Practitioner",
            "System Design Basics",
        ],

        skillGaps: [
            "AWS",
            "Docker",
            "System Design",
        ],
    },

    "2": {
        coursesCompleted: 14,
        totalCourses: 18,
        inProgress: 3,
        notStarted: 1,
        overallProgress: 86,

        courses: [
            {
                name: "Data Structures & Algorithms",
                progress: 96,
                status: "Completed",
            },
            {
                name: "Database Management Systems",
                progress: 92,
                status: "Completed",
            },
            {
                name: "Web Development",
                progress: 95,
                status: "Completed",
            },
            {
                name: "React Development",
                progress: 91,
                status: "Completed",
            },
            {
                name: "Node.js & Backend",
                progress: 78,
                status: "In Progress",
            },
            {
                name: "Cloud Computing",
                progress: 61,
                status: "In Progress",
            },
        ],

        skills: [
            {
                name: "JavaScript",
                progress: 96,
            },
            {
                name: "React",
                progress: 94,
            },
            {
                name: "Node.js",
                progress: 82,
            },
            {
                name: "SQL",
                progress: 91,
            },
            {
                name: "Git",
                progress: 97,
            },
            {
                name: "Docker",
                progress: 62,
            },
            {
                name: "AWS",
                progress: 54,
            },
        ],

        activity: [
            {
                month: "Jan",
                progress: 69,
            },
            {
                month: "Feb",
                progress: 74,
            },
            {
                month: "Mar",
                progress: 77,
            },
            {
                month: "Apr",
                progress: 81,
            },
            {
                month: "May",
                progress: 84,
            },
            {
                month: "Jun",
                progress: 86,
            },
        ],

        recommended: [
            "Advanced System Design",
            "AWS Solutions Architecture",
            "Microservices Architecture",
        ],

        skillGaps: [
            "System Design",
            "AWS",
            "Microservices",
        ],
    },

    "3": {
        coursesCompleted: 8,
        totalCourses: 18,
        inProgress: 6,
        notStarted: 4,
        overallProgress: 51,

        courses: [
            {
                name: "Data Structures & Algorithms",
                progress: 61,
                status: "In Progress",
            },
            {
                name: "Database Management Systems",
                progress: 72,
                status: "In Progress",
            },
            {
                name: "Web Development",
                progress: 80,
                status: "Completed",
            },
            {
                name: "React Development",
                progress: 42,
                status: "In Progress",
            },
            {
                name: "Node.js & Backend",
                progress: 30,
                status: "In Progress",
            },
            {
                name: "Docker & DevOps",
                progress: 10,
                status: "Not Started",
            },
        ],

        skills: [
            {
                name: "JavaScript",
                progress: 72,
            },
            {
                name: "React",
                progress: 51,
            },
            {
                name: "Node.js",
                progress: 34,
            },
            {
                name: "SQL",
                progress: 70,
            },
            {
                name: "Git",
                progress: 82,
            },
            {
                name: "Docker",
                progress: 10,
            },
            {
                name: "AWS",
                progress: 8,
            },
        ],

        activity: [
            {
                month: "Jan",
                progress: 38,
            },
            {
                month: "Feb",
                progress: 41,
            },
            {
                month: "Mar",
                progress: 44,
            },
            {
                month: "Apr",
                progress: 47,
            },
            {
                month: "May",
                progress: 49,
            },
            {
                month: "Jun",
                progress: 51,
            },
        ],

        recommended: [
            "JavaScript Fundamentals",
            "React Fundamentals",
            "Backend Development with Node.js",
        ],

        skillGaps: [
            "React",
            "Node.js",
            "Docker",
            "AWS",
        ],
    },

    "4": {
        coursesCompleted: 13,
        totalCourses: 18,
        inProgress: 3,
        notStarted: 2,
        overallProgress: 79,

        courses: [
            {
                name: "Data Structures & Algorithms",
                progress: 88,
                status: "Completed",
            },
            {
                name: "Database Management Systems",
                progress: 91,
                status: "Completed",
            },
            {
                name: "Web Development",
                progress: 93,
                status: "Completed",
            },
            {
                name: "React Development",
                progress: 82,
                status: "In Progress",
            },
            {
                name: "Node.js & Backend",
                progress: 68,
                status: "In Progress",
            },
            {
                name: "Docker & DevOps",
                progress: 31,
                status: "In Progress",
            },
        ],

        skills: [
            {
                name: "JavaScript",
                progress: 91,
            },
            {
                name: "React",
                progress: 86,
            },
            {
                name: "Node.js",
                progress: 70,
            },
            {
                name: "SQL",
                progress: 92,
            },
            {
                name: "Git",
                progress: 95,
            },
            {
                name: "Docker",
                progress: 31,
            },
            {
                name: "AWS",
                progress: 25,
            },
        ],

        activity: [
            {
                month: "Jan",
                progress: 61,
            },
            {
                month: "Feb",
                progress: 65,
            },
            {
                month: "Mar",
                progress: 70,
            },
            {
                month: "Apr",
                progress: 73,
            },
            {
                month: "May",
                progress: 77,
            },
            {
                month: "Jun",
                progress: 79,
            },
        ],

        recommended: [
            "Docker & DevOps",
            "AWS Fundamentals",
            "System Design",
        ],

        skillGaps: [
            "AWS",
            "Docker",
            "System Design",
        ],
    },
};

export default function LearningAnalytics() {
    const [selectedStudentId, setSelectedStudentId] = useState(
        students[0]?.id ?? ""
    );

    const analyticsRef = useRef<HTMLDivElement | null>(null);

    const [search, setSearch] = useState("");

    const [adminRecommendations, setAdminRecommendations] =
        useState<AdminRecommendation[]>([]);

    const [showRecommendationForm, setShowRecommendationForm] =
        useState(false);

    const [recommendationTitle, setRecommendationTitle] =
        useState("");

    const [recommendationDescription, setRecommendationDescription] =
        useState("");

    const [recommendationPriority, setRecommendationPriority] =
        useState<"High" | "Medium" | "Low">("Medium");

    const selectedStudent = students.find(
        (student) => student.id === selectedStudentId
    );

    const filteredStudents = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) {
            return students;
        }

        return students.filter((student) => {
            return (
                student.name.toLowerCase().includes(value) ||
                student.id.toLowerCase().includes(value) ||
                student.department?.toLowerCase().includes(value)
            );
        });
    }, [search]);

    const selectedIndex = Math.max(
        0,
        students.findIndex(
            (student) => student.id === selectedStudentId
        )
    );

    const dataKeys = Object.keys(learningData);

    const selectedLearning =
        learningData[selectedStudentId] ??
        learningData[
        dataKeys[selectedIndex % dataKeys.length]
        ] ??
        learningData["1"];

    const handleStudentSelect = (studentId: string) => {
        setSelectedStudentId(studentId);

        setAdminRecommendations([]);

        setShowRecommendationForm(false);

        setRecommendationTitle("");
        setRecommendationDescription("");
        setRecommendationPriority("Medium");

        // Wait for React to render the selected student's analytics,
        // then smoothly scroll down to it.
        setTimeout(() => {
            analyticsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    const addAdminRecommendation = () => {
        const title = recommendationTitle.trim();

        if (!title) {
            return;
        }

        const newRecommendation: AdminRecommendation = {
            id: Date.now(),
            title,
            description:
                recommendationDescription.trim() ||
                "Recommended by the administrator.",
            priority: recommendationPriority,
        };

        setAdminRecommendations((current) => [
            ...current,
            newRecommendation,
        ]);

        setRecommendationTitle("");
        setRecommendationDescription("");
        setRecommendationPriority("Medium");

        setShowRecommendationForm(false);
    };

    const removeAdminRecommendation = (id: number) => {
        setAdminRecommendations((current) =>
            current.filter(
                (recommendation) =>
                    recommendation.id !== id
            )
        );
    };

    return (
        <>
            <PageHeader
                title="Learning Analytics"
                description="Select a student to monitor their courses, progress, skills and learning gaps."
            />

            {/* =========================================
                STUDENT SELECTOR
            ========================================= */}

            <section className="panel learning-student-selector">
                <div className="panel-head">
                    <div>
                        <h2>Select Student</h2>

                        <p>
                            Open a student's individual learning
                            analytics.
                        </p>
                    </div>
                </div>

                <div className="student-search">
                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search student by name, ID or department..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                </div>

                <div className="learning-student-list">
                    {filteredStudents.map((student) => {
                        const selected =
                            student.id === selectedStudentId;

                        return (
                            <button
                                key={student.id}
                                type="button"
                                className={`learning-student-card ${selected ? "selected" : ""
                                    }`}
                                onClick={() =>
                                    handleStudentSelect(
                                        student.id
                                    )
                                }
                            >
                                <div className="student-avatar">
                                    {student.name
                                        .split(" ")
                                        .map(
                                            (word) => word[0]
                                        )
                                        .join("")
                                        .slice(0, 2)}
                                </div>

                                <div className="learning-student-info">
                                    <strong>
                                        {student.name}
                                    </strong>

                                    <span>
                                        {student.id} •{" "}
                                        {student.department} •
                                        Semester{" "}
                                        {student.semester}
                                    </span>
                                </div>

                                {selected && (
                                    <CheckCircle2
                                        size={19}
                                        className="student-selected-icon"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {filteredStudents.length === 0 && (
                    <div className="learning-empty-state">
                        No students found matching your search.
                    </div>
                )}
            </section>

            {/* =========================================
                SELECTED STUDENT
            ========================================= */}

            {selectedStudent && (
                <div
                    ref={analyticsRef}
                    id="student-learning-analytics"
                    className="student-learning-analytics"
                >
                    <div className="learning-student-header">
                        <div>
                            <span>Currently viewing</span>

                            <h2>{selectedStudent.name}</h2>

                            <p>
                                {selectedStudent.id} •{" "}
                                {selectedStudent.department} •
                                Semester{" "}
                                {selectedStudent.semester}
                            </p>
                        </div>

                        <div className="learning-overall">
                            <span>
                                Overall Learning Progress
                            </span>

                            <strong>
                                {
                                    selectedLearning.overallProgress
                                }
                                %
                            </strong>
                        </div>
                    </div>

                    {/* =========================================
                        STUDENT METRICS
                    ========================================= */}

                    <div className="stats-grid four">
                        <div className="stat-card icon-stat">
                            <div>
                                <span>
                                    Courses Completed
                                </span>

                                <strong>
                                    {
                                        selectedLearning.coursesCompleted
                                    }
                                    /
                                    {
                                        selectedLearning.totalCourses
                                    }
                                </strong>
                            </div>

                            <GraduationCap size={21} />
                        </div>

                        <div className="stat-card icon-stat">
                            <div>
                                <span>In Progress</span>

                                <strong>
                                    {
                                        selectedLearning.inProgress
                                    }
                                </strong>
                            </div>

                            <Clock3 size={21} />
                        </div>

                        <div className="stat-card icon-stat">
                            <div>
                                <span>Not Started</span>

                                <strong>
                                    {
                                        selectedLearning.notStarted
                                    }
                                </strong>
                            </div>

                            <BookOpen size={21} />
                        </div>

                        <div className="stat-card icon-stat">
                            <div>
                                <span>
                                    Learning Progress
                                </span>

                                <strong>
                                    {
                                        selectedLearning.overallProgress
                                    }
                                    %
                                </strong>
                            </div>

                            <TrendingUp size={21} />
                        </div>
                    </div>

                    {/* =========================================
                        COURSE PROGRESS + SKILL DEVELOPMENT
                    ========================================= */}

                    <div className="grid-2 learning-main-grid">
                        <section className="panel">
                            <div className="panel-head">
                                <div>
                                    <h2>Course Progress</h2>

                                    <p>
                                        Courses this student is
                                        currently learning.
                                    </p>
                                </div>

                                <BookOpen size={21} />
                            </div>

                            <div className="course-progress-list">
                                {selectedLearning.courses.map(
                                    (course) => (
                                        <div
                                            className="course-progress-item"
                                            key={course.name}
                                        >
                                            <div className="course-progress-top">
                                                <div>
                                                    <strong>
                                                        {
                                                            course.name
                                                        }
                                                    </strong>

                                                    <span
                                                        className={`course-status ${course.status
                                                            .toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )}`}
                                                    >
                                                        {
                                                            course.status
                                                        }
                                                    </span>
                                                </div>

                                                <b>
                                                    {
                                                        course.progress
                                                    }
                                                    %
                                                </b>
                                            </div>

                                            <div className="progress">
                                                <i
                                                    style={{
                                                        width: `${course.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        <section className="panel">
                            <div className="panel-head">
                                <div>
                                    <h2>
                                        Skill Development
                                    </h2>

                                    <p>
                                        Current proficiency across
                                        important skills.
                                    </p>
                                </div>

                                <Target size={21} />
                            </div>

                            <div className="skill-progress-list">
                                {selectedLearning.skills.map(
                                    (skill) => (
                                        <div
                                            className="skill-progress-item"
                                            key={skill.name}
                                        >
                                            <div>
                                                <span>
                                                    {
                                                        skill.name
                                                    }
                                                </span>

                                                <b>
                                                    {
                                                        skill.progress
                                                    }
                                                    %
                                                </b>
                                            </div>

                                            <div className="progress">
                                                <i
                                                    style={{
                                                        width: `${skill.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>

                    {/* =========================================
                        LEARNING TREND + SKILL GAPS
                    ========================================= */}

                    <div className="grid-2 learning-main-grid">
                        <section className="panel">
                            <div className="panel-head">
                                <div>
                                    <h2>
                                        Learning Progress
                                    </h2>

                                    <p>
                                        Student progress over the
                                        last six months.
                                    </p>
                                </div>

                                <TrendingUp size={21} />
                            </div>

                            <div className="learning-trend">
                                {selectedLearning.activity.map(
                                    (item) => (
                                        <div
                                            className="learning-trend-item"
                                            key={item.month}
                                        >
                                            <div className="trend-bar-container">
                                                <div
                                                    className="trend-bar"
                                                    style={{
                                                        height: `${item.progress}%`,
                                                    }}
                                                />
                                            </div>

                                            <strong>
                                                {
                                                    item.progress
                                                }
                                                %
                                            </strong>

                                            <span>
                                                {item.month}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        <section className="panel">
                            <div className="panel-head">
                                <div>
                                    <h2>
                                        Learning Gaps
                                    </h2>

                                    <p>
                                        Skills that require
                                        additional development.
                                    </p>
                                </div>

                                <AlertCircle size={21} />
                            </div>

                            <div className="learning-gap-list">
                                {selectedLearning.skillGaps.map(
                                    (gap) => (
                                        <div
                                            className="learning-gap"
                                            key={gap}
                                        >
                                            <div className="gap-icon">
                                                <AlertCircle
                                                    size={17}
                                                />
                                            </div>

                                            <div>
                                                <strong>
                                                    {gap}
                                                </strong>

                                                <span>
                                                    Additional
                                                    learning
                                                    recommended
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>

                    {/* =========================================
                        LEARNING RECOMMENDATIONS
                    ========================================= */}

                    <section className="panel learning-recommendations-panel">
                        <div className="panel-head">
                            <div>
                                <h2>
                                    Learning Recommendations
                                </h2>

                                <p>
                                    Review automatic recommendations
                                    and assign additional learning
                                    tasks to this student.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="add-recommendation-button"
                                onClick={() =>
                                    setShowRecommendationForm(
                                        (current) => !current
                                    )
                                }
                            >
                                {showRecommendationForm ? (
                                    <>
                                        <X size={15} />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Plus size={15} />
                                        Recommend Learning
                                    </>
                                )}
                            </button>
                        </div>

                        {/* =========================================
                            ADMIN RECOMMENDATION FORM
                        ========================================= */}

                        {showRecommendationForm && (
                            <div className="admin-recommendation-form">
                                <div className="form-title">
                                    <div className="admin-form-icon">
                                        <Send size={17} />
                                    </div>

                                    <div>
                                        <strong>
                                            Recommend something to{" "}
                                            {
                                                selectedStudent.name
                                            }
                                        </strong>

                                        <span>
                                            This recommendation is
                                            manually assigned by the
                                            administrator.
                                        </span>
                                    </div>
                                </div>

                                <div className="recommendation-form-grid">
                                    <div className="recommendation-field">
                                        <label>
                                            What should the student
                                            study?
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Docker Fundamentals"
                                            value={
                                                recommendationTitle
                                            }
                                            onChange={(event) =>
                                                setRecommendationTitle(
                                                    event.target
                                                        .value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="recommendation-field">
                                        <label>
                                            Priority
                                        </label>

                                        <select
                                            value={
                                                recommendationPriority
                                            }
                                            onChange={(event) =>
                                                setRecommendationPriority(
                                                    event.target
                                                        .value as
                                                    | "High"
                                                    | "Medium"
                                                    | "Low"
                                                )
                                            }
                                        >
                                            <option value="High">
                                                High
                                            </option>

                                            <option value="Medium">
                                                Medium
                                            </option>

                                            <option value="Low">
                                                Low
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="recommendation-field">
                                    <label>
                                        Instructions for the
                                        student
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Explain what the student should learn or complete..."
                                        value={
                                            recommendationDescription
                                        }
                                        onChange={(event) =>
                                            setRecommendationDescription(
                                                event.target
                                                    .value
                                            )
                                        }
                                    />
                                </div>

                                <div className="recommendation-form-actions">
                                    <button
                                        type="button"
                                        className="cancel-recommendation"
                                        onClick={() =>
                                            setShowRecommendationForm(
                                                false
                                            )
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="save-recommendation"
                                        onClick={
                                            addAdminRecommendation
                                        }
                                        disabled={
                                            !recommendationTitle.trim()
                                        }
                                    >
                                        <Send size={14} />
                                        Assign Recommendation
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* =========================================
                            ADMIN RECOMMENDATIONS
                        ========================================= */}

                        {adminRecommendations.length > 0 && (
                            <div className="admin-recommendations">
                                <div className="recommendation-section-title">
                                    <div>
                                        <span>
                                            Admin Recommendations
                                        </span>

                                        <small>
                                            Assigned specifically to
                                            this student
                                        </small>
                                    </div>
                                </div>

                                {adminRecommendations.map(
                                    (recommendation) => (
                                        <div
                                            className="admin-recommendation"
                                            key={
                                                recommendation.id
                                            }
                                        >
                                            <div className="admin-recommendation-icon">
                                                <GraduationCap
                                                    size={18}
                                                />
                                            </div>

                                            <div className="admin-recommendation-content">
                                                <div className="admin-recommendation-title">
                                                    <strong>
                                                        {
                                                            recommendation.title
                                                        }
                                                    </strong>

                                                    <span
                                                        className={`priority-${recommendation.priority.toLowerCase()}`}
                                                    >
                                                        {
                                                            recommendation.priority
                                                        }{" "}
                                                        Priority
                                                    </span>
                                                </div>

                                                <p>
                                                    {
                                                        recommendation.description
                                                    }
                                                </p>

                                                <small>
                                                    Assigned by Admin
                                                </small>
                                            </div>

                                            <button
                                                type="button"
                                                className="remove-recommendation"
                                                title="Remove recommendation"
                                                onClick={() =>
                                                    removeAdminRecommendation(
                                                        recommendation.id
                                                    )
                                                }
                                            >
                                                <X size={15} />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* =========================================
                            AUTOMATIC RECOMMENDATIONS
                        ========================================= */}

                        <div className="automatic-recommendations">
                            <div className="recommendation-section-title">
                                <div>
                                    <span>
                                        Automatic Recommendations
                                    </span>

                                    <small>
                                        Based on learning progress
                                        and identified skill gaps
                                    </small>
                                </div>
                            </div>

                            <div className="recommended-learning">
                                {selectedLearning.recommended.map(
                                    (course) => (
                                        <div
                                            className="recommended-course"
                                            key={course}
                                        >
                                            <div className="recommended-icon">
                                                <BookOpen size={18} />
                                            </div>

                                            <div>
                                                <strong>
                                                    {course}
                                                </strong>

                                                <span>
                                                    Recommended based
                                                    on this student's
                                                    learning profile
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                               </section>
        </div>
    )}
        </>
    );
}