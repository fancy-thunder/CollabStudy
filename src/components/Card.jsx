import React from "react";

const colorMap = {
  indigo: {
    text: "text-[#3F8CFF]",
    bar: "bg-[#3F8CFF]",
    bg: "bg-[#EAF1FF]",
  },
  green: {
    text: "text-[#3FCF8C]",
    bar: "bg-[#3FCF8C]",
    bg: "bg-[#EAFBF4]",
  },
  purple: {
    text: "text-[#6C5DD3]",
    bar: "bg-[#6C5DD3]",
    bg: "bg-[#F3F0FF]",
  },
};

const Card = ({ title, value, color = "indigo" }) => {
  const percent = parseInt(value);
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start min-w-[220px]">
      <span className="text-gray-700 text-base font-semibold mb-2">
        {title}
      </span>
      <span className={`text-3xl font-bold mb-2 ${colorMap[color].text}`}>
        {value}
      </span>
      <div className={`w-full h-2 rounded-full ${colorMap[color].bg}`}>
        <div
          className={`h-2 rounded-full ${colorMap[color].bar}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Card;
