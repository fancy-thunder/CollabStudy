import {
  FaUserCheck, FaUserShield, FaCrown, FaBook, FaStar, FaBolt, FaCommentDots,
  FaInfoCircle, FaUserFriends, FaUserPlus, FaTrophy
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid
  console.log(userId)
  console.log(db)
  // const userId = "USR123456"; // Replace with auth.currentUser.uid if using Firebase Auth

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "user", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setProfile(docSnap.data());
        } else {
          console.warn("No user found in Firestore, using mock data.");
          // setProfile(mockProfile);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // setProfile(mockProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  if (!profile) return <div className="text-center mt-10 text-gray-600">No profile data found.</div>;

  const p = profile;

  return (
    <div className={`${p.darkMode ? "bg-gray-950" : "bg-gray-100"} min-h-screen`}>
      {/* Banner */}
      <div className={`relative w-full h-52 ${p.darkMode ? "bg-gray-900" : "bg-gray-200"} rounded-b-2xl shadow-md flex items-end border-b border-gray-800`}>
        <div className="absolute left-8 bottom-0 flex items-end gap-6">
          <div className="relative">
            <img
              src={p.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
            />
            {p.isVerified && (
              <FaUserCheck className="absolute bottom-2 right-2 text-green-400 text-2xl bg-white rounded-full p-1" title="Verified" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              {p.fullName}
              {p.role === "admin" && <FaUserShield className="text-yellow-400" title="Admin" />}
              {p.role === "moderator" && <FaCrown className="text-purple-400" title="Moderator" />}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-indigo-600 px-2 py-1 rounded text-sm font-mono text-white">@{p.firstName + p.lastName}</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs text-white">ID: {p.userId}</span>
              <span className="bg-green-600 px-2 py-1 rounded text-xs text-white">{p.subscriptionPlan}</span>
              <span className={`px-2 py-1 rounded text-xs ${p.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}>{p.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layout: Sidebar + Main */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4 mt-8">
        {/* Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaBolt className="text-yellow-500" />
                <span className="font-bold text-lg text-gray-800">{p.totalXP} Karma</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-pink-500" />
                <span className="font-bold text-lg text-gray-800">{p.postsCount} Posts</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserFriends className="text-indigo-500" />
                {/* <span className="font-bold text-lg text-gray-800">{p.followers.length} Followers</span> */}
              </div>
              <div className="flex items-center gap-2">
                <FaUserPlus className="text-pink-500" />
                {/* <span className="font-bold text-lg text-gray-800">{p.following.length} Following</span> */}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Communities</h3>
              <div className="flex flex-wrap gap-2">
                {/* {mockCommunities.map(comm => (
                  <span key={comm.id} className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                    {comm.icon} {comm.name}
                  </span>
                ))} */}
              </div>
            </div>
          </div>

          <nav className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaInfoCircle /> Overview</button>
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaCommentDots /> Posts</button>
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaTrophy /> Achievements</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Overview */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaInfoCircle className="text-indigo-500" /> Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-700 mb-1">{p.bio}</div>
                <div className="text-sm text-gray-500 mb-2">{p.degreeOrClass}, {p.fieldOfStudy} at {p.institutionName}</div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Learning Goals:</span>
                <ul className="list-disc ml-6 text-sm">
                  {p.learningGoals?.map((goal, i) => <li key={i}>{goal}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* Posts */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaCommentDots className="text-pink-500" /> Posts</h2>
            <div className="flex flex-col gap-4">
              {/* {mockPosts.map(post => (
                <div key={post.id} className="border rounded-xl p-4 hover:shadow transition bg-gray-50">
                  <div className="font-semibold text-gray-800">{post.title}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FaBolt className="text-yellow-500" /> {post.upvotes}</span>
                    <span className="flex items-center gap-1"><FaCommentDots className="text-pink-500" /> {post.comments}</span>
                  </div>
                </div>
              ))} */}
            </div>
          </section>

          {/* Achievements */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Achievements</h2>
            <ul className="list-disc ml-6 text-sm mt-1">
              {p.achievements?.map((ach, i) => <li key={i}>{ach}</li>)}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;