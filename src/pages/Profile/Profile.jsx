import {
  FaUserCheck, FaUserShield, FaCrown, FaBook, FaStar, FaBolt, FaCommentDots,
  FaInfoCircle, FaUserFriends, FaUserPlus, FaTrophy
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notes");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.uid;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          const docRef = doc(db, "user", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  
  const p = profile || {
    fullName: "Alex Student",
    firstName: "Alex",
    lastName: "Student",
    profileImage: "",
    bio: "Passionate learner exploring new technologies",
    degreeOrClass: "Computer Science",
    fieldOfStudy: "Computer Science",
    institutionName: "MIT",
    totalXP: 2840,
    level: 14,
    streakDays: 12,
    averageScore: 87,
    postsCount: 24,
    achievements: ["First Quiz Completed", "10 Day Streak", "Top Contributor"]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          {/* Profile Banner */}
          <div className="relative w-full h-64 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-b-3xl">
            <div className="absolute left-8 bottom-0 flex items-end gap-6 pb-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-700 to-violet-700 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
                  {p.profileImage ? (
                    <img src={p.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    "AS"
                  )}
                </div>
                {p.isVerified && (
                  <FaUserCheck className="absolute bottom-2 right-2 text-green-400 text-2xl bg-white rounded-full p-1 shadow-lg" />
                )}
              </div>
              
              {/* User Info */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                  {p.fullName || "Alex Student"}
                  {p.role === "admin" && <FaUserShield className="text-yellow-300 text-3xl" />}
                  {p.role === "moderator" && <FaCrown className="text-purple-300 text-3xl" />}
                </h1>
                <div className="text-lg text-white/90 mb-1">@{p.firstName || "alex"}{p.lastName || "student"}</div>
                <div className="text-sm text-white/80">{p.degreeOrClass || "Computer Science"}, {p.institutionName || "MIT"}</div>
                <div className="text-sm text-white/80 mt-1">Joined Oct 2024</div>
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <div className="absolute top-8 right-8">
              <button className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="px-8 -mt-16 mb-8">
            <div className="grid grid-cols-4 gap-6">
              {/* Total XP */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{p.totalXP || 2840}</div>
                <div className="text-sm text-gray-600">Total XP</div>
                <div className="text-sm text-purple-600 font-semibold mt-1">Level {p.level || 14}</div>
              </div>

              {/* Streak */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{p.streakDays || 12}</div>
                <div className="text-sm text-gray-600">Streak</div>
                <div className="text-sm text-gray-500 mt-1">{p.streakDays || 12} Days - Best: 45 days</div>
              </div>

              {/* Avg Score */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{p.averageScore || 87}%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
                <div className="text-sm text-gray-500 mt-1">128 quizzes</div>
              </div>

              {/* Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{p.postsCount || 24}</div>
                <div className="text-sm text-gray-600">Posts</div>
                <div className="text-sm text-gray-500 mt-1">1.2k likes</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 mb-6">
            <div className="flex gap-1 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "notes"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                My Notes & Uploads
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "achievements"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Achievements
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "activity"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Activity
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-8 pb-8">
            {activeTab === "notes" && (
              <div className="grid grid-cols-4 gap-6">
                {/* Note Cards */}
                {[
                  { title: "Calculus - Derivatives", tag: "Math", views: 234, uploads: 1 },
                  { title: "Quantum Mechanics", tag: "Physics", views: 189, uploads: 2 },
                  { title: "Binary Search Trees", tag: "CS", views: 156, uploads: 1 },
                  { title: "Organic Chemistry", tag: "Chemistry", views: 203, uploads: 1 },
                ].map((note, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <FaBook className="text-purple-600 text-xl" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{note.title}</h3>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">{note.tag}</span>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span>{note.uploads} upload</span>
                      </div>
                      <div>{note.views} views</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {p.achievements?.map((ach, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaStar className="text-yellow-600" />
                      </div>
                      <span className="font-medium text-gray-800">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaBook className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Uploaded Calculus Notes</div>
                      <div className="text-sm text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FaTrophy className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Completed Quiz: Quantum Mechanics</div>
                      <div className="text-sm text-gray-500">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
