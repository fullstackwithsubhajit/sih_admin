"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BriefcaseBusiness, CalendarDays, ChevronDown, GraduationCap, LayoutDashboard, LineChart, Menu, Search, Settings, Users, X, BedDouble, ClipboardCheck } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/learning", label: "Learning Analytics", icon: LineChart },
  { href: "/careers", label: "Career & Jobs", icon: BriefcaseBusiness },
  { href: "/timetable", label: "Timetable", icon: CalendarDays },
  { href: "/hostel", label: "Hostel", icon: BedDouble },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="shell">
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={19}/></div><div><strong>CampusX</strong><span>Admin</span></div><button className="mobile-close" onClick={()=>setOpen(false)}><X size={18}/></button></div>
      <nav>{nav.map(({href,label,icon:Icon}) => { const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href)); return <Link key={href} href={href} className={active ? "active" : ""} onClick={()=>setOpen(false)}><Icon size={17}/><span>{label}</span></Link> })}</nav>
      <div className="sidebar-footer"><div className="mini-avatar">A</div><div><b>Admin</b><span>Administrator</span></div><ChevronDown size={14}/></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(true)}><Menu size={20}/></button><div className="search"><Search size={16}/><input placeholder="Search students, courses, jobs..."/></div><div className="top-actions"><button><Bell size={18}/><i/></button><button className="top-avatar">A</button></div></header>
      <div className="content">{children}</div>
    </main>
  </div>;
}
