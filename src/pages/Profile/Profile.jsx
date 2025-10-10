import {
  FaUserCheck, FaUserShield, FaCrown, FaSchool, FaBook, FaStar, FaBolt, FaBell,
  FaMoon, FaSun, FaGoogle, FaGithub, FaUserFriends, FaUserPlus, FaUserEdit, FaMedal, FaUsers, FaCommentDots, FaTrophy, FaInfoCircle
} from "react-icons/fa";

const mockProfile = {
  userId: "USR123456",
  fullName: "John Doe",
  username: "johnnydev",
  email: "john.doe@example.com",
  phoneNumber: "+1 (555) 123-4567",
  profileImage: "https://via.placeholder.com/120",
  dateOfBirth: "2001-05-15",
  gender: "Male",
  bio: "Passionate about learning modern web technologies and building creative projects.",
  institutionName: "Stanford University",
  degreeOrClass: "B.Tech",
  fieldOfStudy: "Computer Science",
  academicYear: "2nd Year / Semester 3",
  subjects: ["React", "Algorithms", "Databases"],
  preferredStudyStyle: "visual",
  totalXP: 3200,
  level: 7,
  streakDays: 12,
  completedTopics: 45,
  quizzesTaken: 18,
  averageScore: "87%",
  weakAreas: ["Databases"],
  lastRevisionDate: "2024-06-01",
  preferredLanguage: "English",
  darkMode: true,
  notificationPreferences: {
    studyReminders: true,
    communityMentions: false,
    AIUpdates: true,
  },
  revisionInterval: 3,
  aiPersona: "friendly",
  learningGoals: ["Master React", "Improve Algorithms", "Build a portfolio"],
  savedAIResponses: ["note1", "note2"],
  favoriteTopics: ["React", "Web Security"],
  difficultyPreference: "medium",
  lastActiveAIInteraction: "2024-06-03T14:22:00Z",
  followers: ["USR111", "USR222"],
  following: ["USR333", "USR444"],
  postsCount: 27,
  badges: ["badge1", "badge2"],
  achievements: [
    "🏅 Completed JavaScript Mastery Course",
    "💡 Built 5+ Web Apps",
    "🎯 Consistent Weekly Top Performer"
  ],
  joinedCommunities: ["comm1", "comm2"],
  recentActivity: [
    { action: "Completed Quiz", date: "2024-06-03" },
    { action: "Posted in Community", date: "2024-06-02" }
  ],
  role: "user",
  createdAt: "2023-08-10",
  updatedAt: "2024-06-03",
  lastLogin: "2024-06-03T14:20:00Z",
  deviceInfo: "Mac Mini",
  isVerified: true,
  status: "active",
  connectedAccounts: ["Google", "GitHub"],
  subscriptionPlan: "Premium",
  studyTimeLogs: [35, 42, 28], // minutes
  aiGeneratedTests: ["test1", "test2"],
  offlineNotes: true,
};

const mockAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/46.jpg",
  "https://randomuser.me/api/portraits/men/47.jpg",
  "https://randomuser.me/api/portraits/women/48.jpg",
];

const mockPosts = [
  {
    id: 1,
    title: "How to master React in 2024?",
    date: "2024-06-02",
    upvotes: 120,
    comments: 14,
    community: "ReactDev",
  },
  {
    id: 2,
    title: "Tips for Algorithms interviews",
    date: "2024-05-28",
    upvotes: 98,
    comments: 8,
    community: "AlgoHub",
  },
];

const mockCommunities = [
  { id: "comm1", name: "ReactDev", icon: <FaBook /> },
  { id: "comm2", name: "AlgoHub", icon: <FaBolt /> },
];

const Profile = () => {
  const p = mockProfile;
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
              <span className="bg-indigo-600 px-2 py-1 rounded text-sm font-mono text-white">@{p.username}</span>
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
                <span className="font-bold text-lg text-gray-800">{p.followers.length} Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserPlus className="text-pink-500" />
                <span className="font-bold text-lg text-gray-800">{p.following.length} Following</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Communities</h3>
              <div className="flex flex-wrap gap-2">
                {mockCommunities.map(comm => (
                  <span key={comm.id} className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                    {comm.icon} {comm.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <nav className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaInfoCircle /> Overview</button>
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaCommentDots /> Posts</button>
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaTrophy /> Achievements</button>
            <button className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 px-3 py-2 rounded transition"><FaUserEdit /> Edit Profile</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Overview Card */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaInfoCircle className="text-indigo-500" /> Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-700 mb-1">{p.bio}</div>
                <div className="text-sm text-gray-500 mb-2">{p.degreeOrClass}, {p.fieldOfStudy} at {p.institutionName}</div>
                <div className="text-xs text-gray-500">Academic Year: <span className="font-medium text-gray-700">{p.academicYear}</span></div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Subjects:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.subjects.map(sub => <span key={sub} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{sub}</span>)}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Weak Areas:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.weakAreas.map(sub => <span key={sub} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">{sub}</span>)}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Learning Goals:</span>
                  <ul className="list-disc ml-6 text-sm">
                    {p.learningGoals.map((goal, idx) => <li key={idx}>{goal}</li>)}
                  </ul>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Favorite Topics:</span>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {p.favoriteTopics.map(topic => <span key={topic} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{topic}</span>)}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">AI Persona:</span>
                  <span className="ml-2 font-medium capitalize">{p.aiPersona}</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Difficulty:</span>
                  <span className="ml-2 font-medium capitalize">{p.difficultyPreference}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Posts Card */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaCommentDots className="text-pink-500" /> Posts</h2>
            <div className="flex flex-col gap-4">
              {mockPosts.map(post => (
                <div key={post.id} className="border rounded-xl p-4 hover:shadow transition bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{post.community}</span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <div className="font-semibold text-gray-800">{post.title}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FaBolt className="text-yellow-500" /> {post.upvotes} upvotes</span>
                    <span className="flex items-center gap-1"><FaCommentDots className="text-pink-500" /> {post.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Card */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500">Achievements:</span>
                <ul className="list-disc ml-6 text-sm mt-1">
                  {p.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                </ul>
              </div>
              <div>
                <span className="text-xs text-gray-500">Badges:</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {p.badges.map(bid => (
                    <span key={bid} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs text-center">{bid}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Card */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaInfoCircle className="text-indigo-500" /> About</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-gray-700">
                <div><span className="text-xs text-gray-500">Email:</span> <span className="font-medium">{p.email}</span></div>
                <div><span className="text-xs text-gray-500">Phone:</span> <span className="font-medium">{p.phoneNumber}</span></div>
                <div><span className="text-xs text-gray-500">DOB:</span> <span className="font-medium">{p.dateOfBirth}</span></div>
                <div><span className="text-xs text-gray-500">Gender:</span> <span className="font-medium">{p.gender}</span></div>
                <div><span className="text-xs text-gray-500">Language:</span> <span className="font-medium">{p.preferredLanguage}</span></div>
                <div><span className="text-xs text-gray-500">Last Login:</span> <span className="font-medium">{new Date(p.lastLogin).toLocaleString()}</span></div>
                <div><span className="text-xs text-gray-500">Created:</span> <span className="font-medium">{p.createdAt}</span></div>
                <div><span className="text-xs text-gray-500">Updated:</span> <span className="font-medium">{p.updatedAt}</span></div>
                <div><span className="text-xs text-gray-500">Status:</span> <span className={`font-medium px-2 py-1 rounded ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.status}</span></div>
                <div><span className="text-xs text-gray-500">Role:</span> <span className="font-medium">{p.role}</span></div>
                <div><span className="text-xs text-gray-500">Verified:</span> <span className="font-medium">{p.isVerified ? "Yes" : "No"}</span></div>
                <div><span className="text-xs text-gray-500">Device:</span> <span className="font-medium">{p.deviceInfo}</span></div>
                <div><span className="text-xs text-gray-500">Connected:</span>
                  <span className="ml-2">{p.connectedAccounts.map(acc => (
                    <span key={acc} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-1">{acc}</span>
                  ))}</span>
                </div>
                <div><span className="text-xs text-gray-500">Subscription:</span> <span className="font-medium">{p.subscriptionPlan}</span></div>
              </div>
              <div className="space-y-2 text-gray-700">
                <div>
                  <span className="text-xs text-gray-500">Revision Interval:</span>
                  <span className="ml-2 font-medium">{p.revisionInterval} days</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Offline Notes:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${p.offlineNotes ? "bg-green-200 text-green-700" : "bg-gray-200 text-gray-700"}`}>{p.offlineNotes ? "Enabled" : "Disabled"}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Study Time Logs:</span>
                  <div className="flex gap-2 mt-1">
                    {p.studyTimeLogs.map((min, idx) => <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{min} min</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500">AI Generated Tests:</span>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {p.aiGeneratedTests.map(tid => <span key={tid} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{tid}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Last AI Interaction:</span>
                  <span className="ml-2 font-medium">{new Date(p.lastActiveAIInteraction).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;