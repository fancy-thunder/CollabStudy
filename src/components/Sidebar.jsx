import React from "react";

const links = [
  {
    label: "Home",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7 4h4v10h-4V11z" />
      </svg>
    ),
  },
  {
    label: "Community",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: "My Subjects",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 19h16M4 15h16M4 11h16M4 7h16" />
      </svg>
    ),
  },
  {
    label: "AI Assistant",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: "Personal Notes",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
      </svg>
    ),
  },
  {
    label: "Tests & Quizzes",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    label: "Achievements",
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
];

const activeIndex = 0; // Home

const Sidebar = () => (
  <aside className="w-64 bg-[#23263A] flex flex-col py-8 px-6 min-h-screen">
    <div className="flex items-center mb-10">
      <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-2">
        <span className="tracking-tight">AI</span>
      </div>
      <span className="font-semibold text-lg text-white">CollabStudy</span>
    </div>
    <nav className="flex flex-col gap-2">
      {links.map((link, idx) => (
        <a
          key={link.label}
          href="#"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium
            ${
              idx === activeIndex
                ? "bg-[#6C5DD3] text-white"
                : "text-white hover:bg-[#2A2D43]"
            }
          `}
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
