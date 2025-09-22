import React from "react";

const iconMap = [
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="#6C5DD3"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 9h8M8 13h6" />
  </svg>,
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="#6C5DD3"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
  </svg>,
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="#6C5DD3"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>,
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="#6C5DD3"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>,
];

const ActivityList = ({ activities }) => (
  <div className="bg-white rounded-xl shadow p-0">
    {activities.map((activity, idx) => (
      <div
        key={idx}
        className="flex items-center gap-3 px-6 py-4 border-b last:border-b-0 text-[#6C5DD3]"
      >
        {iconMap[idx]}
        <span className="text-gray-800">{activity.text}</span>
        <a href="#" className="ml-auto text-gray-400 hover:text-[#6C5DD3]">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M14 3l7 7-7 7M21 10H3" />
          </svg>
        </a>
      </div>
    ))}
  </div>
);

export default ActivityList;
