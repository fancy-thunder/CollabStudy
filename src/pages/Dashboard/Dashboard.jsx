import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Card from "../../components/Card.jsx";
import ActivityList from "../../components/ActivityList.jsx";
import QuickActions from "../../components/QuickActions.jsx";

const cards = [
  { title: "Overall Progress", value: "75%", color: "indigo" },
  { title: "Current Subject", value: "60%", color: "green" },
  { title: "Weekly Goal", value: "90%", color: "purple" },
];

const activities = [
  { text: 'Completed "Algebra Basics" Quiz' },
  { text: 'Reviewed "Historical Events Notes"' },
  { text: "Asked AI Assistant about 'Photosythesss'" },
  { text: "Asked AI Assistant about 'Photosynem'" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-[#23263A] mb-2">
          Welcome, [Student Name]!
        </h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#23263A] mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </div>
        </section>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-[#23263A] mb-4">
              Recent Activity
            </h3>
            <ActivityList activities={activities} />
          </div>
          <div>
            <h3 className="text-md font-semibold text-[#23263A] mb-4">
              Quick Actions
            </h3>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default Dashboard;
