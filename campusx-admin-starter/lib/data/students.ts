export type Student = {
  id: string;
  name: string;
  department: string;
  semester: number;
  attendance: number;
  readiness: number;
  status:
    | "On Track"
    | "Monitor"
    | "Needs Attention";
  email: string;
  career: string;
  skills: string[];
  courses: number;
  projects: number;
  assessments: number;
  photo: string;
};

export const students: Student[] = [
  {
    id: "STU-2026-1048",
    name: "Arjun Sen",
    department: "CSE",
    semester: 3,
    attendance: 84,
    readiness: 67,
    status: "On Track",
    email: "arjun.sen@example.com",
    career: "Full Stack Developer",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "SQL",
      "Git",
      "HTML",
      "CSS",
    ],
    courses: 12,
    projects: 4,
    assessments: 8,

    // Temporary seed image.
    // Registration will replace this with
    // the actual captured image.
    photo: "https://i.pravatar.cc/100?img=12",
  },

  {
    id: "STU-2026-1049",
    name: "Priya Roy",
    department: "CSE",
    semester: 3,
    attendance: 91,
    readiness: 82,
    status: "On Track",
    email: "priya.roy@example.com",
    career: "Frontend Developer",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
    ],
    courses: 14,
    projects: 5,
    assessments: 10,
    photo: "https://i.pravatar.cc/100?img=47",
  },

  {
    id: "STU-2026-1050",
    name: "Rahul Das",
    department: "ECE",
    semester: 3,
    attendance: 69,
    readiness: 51,
    status: "Needs Attention",
    email: "rahul.das@example.com",
    career: "Embedded Engineer",
    skills: [
      "C",
      "C++",
      "Python",
    ],
    courses: 9,
    projects: 2,
    assessments: 5,
    photo: "https://i.pravatar.cc/100?img=68",
  },

  {
    id: "STU-2026-1051",
    name: "Ananya Dutta",
    department: "IT",
    semester: 2,
    attendance: 87,
    readiness: 71,
    status: "On Track",
    email: "ananya.dutta@example.com",
    career: "Backend Developer",
    skills: [
      "Python",
      "Node.js",
      "SQL",
      "Git",
    ],
    courses: 11,
    projects: 3,
    assessments: 7,
    photo: "https://i.pravatar.cc/100?img=44",
  },

  {
    id: "STU-2026-1052",
    name: "Amit Verma",
    department: "ME",
    semester: 4,
    attendance: 72,
    readiness: 58,
    status: "Monitor",
    email: "amit.verma@example.com",
    career: "Data Analyst",
    skills: [
      "Python",
      "SQL",
      "Excel",
    ],
    courses: 10,
    projects: 3,
    assessments: 6,
    photo: "https://i.pravatar.cc/100?img=11",
  },

  {
    id: "STU-2026-1053",
    name: "Sneha Pal",
    department: "CSE",
    semester: 2,
    attendance: 76,
    readiness: 62,
    status: "Monitor",
    email: "sneha.pal@example.com",
    career: "Software Engineer",
    skills: [
      "Java",
      "SQL",
      "Git",
    ],
    courses: 10,
    projects: 2,
    assessments: 6,
    photo: "https://i.pravatar.cc/100?img=32",
  },

  {
    id: "STU-2026-1054",
    name: "Reya Sharma",
    department: "ECE",
    semester: 3,
    attendance: 93,
    readiness: 78,
    status: "On Track",
    email: "reya.sharma@example.com",
    career: "IoT Engineer",
    skills: [
      "C++",
      "Python",
      "IoT",
      "Git",
    ],
    courses: 13,
    projects: 4,
    assessments: 9,
    photo: "https://i.pravatar.cc/100?img=5",
  },
];