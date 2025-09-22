import React from "react";

const QuickActions = () => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
    <button className="w-full py-2 px-4 bg-[#6C5DD3] text-white font-semibold rounded-lg hover:bg-[#5a4bcf] transition">
      Ask AI Assistant
    </button>
    <button className="w-full py-2 px-4 bg-white border border-[#6C5DD3] text-[#6C5DD3] font-semibold rounded-lg hover:bg-[#F3F0FF] transition">
      Start a Quiz
    </button>
    <button className="w-full py-2 px-4 bg-white border border-[#6C5DD3] text-[#6C5DD3] font-semibold rounded-lg hover:bg-[#F3F0FF] transition">
      Access Notes
    </button>
  </div>
);

export default QuickActions;
