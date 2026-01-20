import { useState } from "react";
import { FaSearch, FaTimes, FaHashtag, FaUser, FaHistory } from "react-icons/fa";
import { useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, or } from "firebase/firestore";
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("top");


  useEffect(() => {
    async function fetchUsers() {
      if (!searchQuery.trim()) return; // Skip if empty search

      const userRef = collection(db, "user");
      const q = query(userRef, or(
        where("firstName", "==", searchQuery),
        where("lastName", "==", searchQuery)
      ));
      const querySnapshot = await getDocs(q);

      // Extract only userId and name from the results
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID from Firestore
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        imageUrl: doc.data().imageUrl,
      }));

      console.log(users);
    }

    const timeoutId = setTimeout(fetchUsers, 400);

    // Cleanup: cancel pending timeout when searchQuery changes
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  // Sample data for UI display
  const recentSearches = [
    { id: 1, type: "user", name: "Alex Johnson", username: "alex_codes", avatar: null },
    { id: 2, type: "tag", name: "#studygroup", username: "2.4K posts" },
    { id: 3, type: "user", name: "Sarah Miller", username: "sarah_learns", avatar: null },
  ];

  const trendingTopics = [
    { id: 1, tag: "studygroup", posts: "12.4K posts", icon: "🎓" },
    { id: 2, tag: "examprep", posts: "8.2K posts", icon: "📚" },
    { id: 3, tag: "coding", posts: "45.1K posts", icon: "💻" },
    { id: 4, tag: "mathematics", posts: "6.8K posts", icon: "📐" },
    { id: 5, tag: "physics", posts: "5.3K posts", icon: "⚛️" },
  ];

  const suggestedAccounts = [
    { id: 1, username: "study_master", name: "Study Master", isVerified: true, followers: "24.5K", bio: "Helping students ace their exams 📖" },
    { id: 2, username: "code_ninja", name: "Code Ninja", isVerified: true, followers: "156K", bio: "Full-stack developer & educator" },
    { id: 3, username: "math_wizard", name: "Math Wizard", isVerified: false, followers: "89.2K", bio: "Making math fun and easy ✨" },
    { id: 4, username: "science_hub", name: "Science Hub", isVerified: true, followers: "312K", bio: "Your daily dose of science" },
  ];

  const gradients = [
    "from-rose-500 to-orange-400",
    "from-violet-600 to-indigo-500",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-pink-500",
    "from-cyan-500 to-blue-500",
  ];

  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Search Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10 pb-4">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Search
        </h1>

        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
          <div className="relative flex items-center bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
            <FaSearch className="w-4 h-4 text-neutral-400 ml-4" />
            <input
              type="text"
              placeholder="Search users, topics, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-white placeholder-neutral-500 px-3 py-4 text-base"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-2 mr-2 text-neutral-400 hover:text-white transition-colors">
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-neutral-800">
          {["top", "accounts", "tags"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold capitalize transition-all relative ${activeTab === tab ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-6">
        {/* Recent Searches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <FaHistory className="w-4 h-4 text-neutral-400" />
              Recent
            </h3>
            <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">
              Clear all
            </button>
          </div>
          {recentSearches.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-900 transition-all group cursor-pointer">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center text-white font-semibold text-sm`}>
                {item.type === "tag" ? <FaHashtag className="w-4 h-4" /> : getInitials(item.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{item.username || item.name}</p>
                <p className="text-sm text-neutral-500 truncate">{item.name}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 text-neutral-400 hover:text-white transition-all">
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Trending Topics */}
        {activeTab !== "accounts" && (
          <div className="space-y-2">
            <h3 className="text-white font-semibold px-1 flex items-center gap-2">
              <span className="text-lg">🔥</span>
              Trending Topics
            </h3>
            {trendingTopics.map((topic, idx) => (
              <div key={topic.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-900 transition-all cursor-pointer group">
                <div className="w-11 h-11 rounded-xl bg-neutral-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">#{topic.tag}</p>
                  <p className="text-sm text-neutral-500">{topic.posts}</p>
                </div>
                <div className="text-neutral-600 text-sm font-medium">#{idx + 1}</div>
              </div>
            ))}
          </div>
        )}

        {/* Suggested Accounts */}
        {activeTab !== "tags" && (
          <div className="space-y-2">
            <h3 className="text-white font-semibold px-1 flex items-center gap-2">
              <FaUser className="w-4 h-4 text-neutral-400" />
              Suggested for you
            </h3>
            {suggestedAccounts.map((account, idx) => (
              <div key={account.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-900 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {getInitials(account.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{account.username}</span>
                    {account.isVerified && (
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 truncate">{account.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{account.bio}</p>
                </div>
                <button className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/25">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
