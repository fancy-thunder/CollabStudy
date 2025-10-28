import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Community = () => {
  const [posts, setPosts] = useState(samplePosts);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Hot");
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", tags: "" });

  const filteredPosts = posts.filter((p) => {
    const matchesTab = activeTab === "Hot" || activeTab === "All";
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      author: "You",
      title: newPost.title,
      body: newPost.body,
      tags: newPost.tags.split(",").map((t) => t.trim()),
      likes: 142,
      comments: 28,
      createdAt: new Date().toISOString(),
      community: "r/ArtificialIntelligence",
    };
    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", body: "", tags: "" });
    setShowModal(false);
  };

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 60000;
    if (diff < 60) return `${Math.floor(diff)}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return `${Math.floor(diff / 1440)}d`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex">
          {/* Left Sidebar - Communities */}
          <aside className="w-64 bg-white border-r border-gray-200 p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">COMMUNITIES</h3>
            <div className="space-y-3 mb-6">
              {communities.map((comm) => (
                <div key={comm.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {comm.initial}
                  </div>
                  <span className="font-medium text-gray-700">{comm.name}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Community
            </button>
          </aside>

          {/* Main Content - Feed */}
          <div className="flex-1 p-6">
            {/* Create Post Section */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                  AS
                </div>
                <input
                  type="text"
                  placeholder="Create Post"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onClick={() => setShowModal(true)}
                />
                <button className="p-3 text-gray-400 hover:text-purple-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              {['Hot', 'New', 'Top', 'Rising'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition-colors relative ${
                    activeTab === tab
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Upvote/Downvote */}
                    <div className="flex flex-col items-center gap-2">
                      <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <span className="font-bold text-gray-900">{post.likes}</span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="font-semibold text-purple-600">{post.community || 'r/Engineering'}</span>
                        <span>•</span>
                        <span>u/{post.author}</span>
                        <span>•</span>
                        <span>{timeAgo(post.createdAt)} ago</span>
                        <div className="flex gap-1 ml-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-700 mb-4">{post.body}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.comments} Comments</span>
                        </button>
                        <button className="text-gray-600 hover:text-purple-600 transition-colors">Share</button>
                        <button className="text-gray-600 hover:text-purple-600 transition-colors">Save</button>
                        <button className="text-gray-600 hover:text-purple-600 transition-colors">•••</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-80 bg-white border-l border-gray-200 p-6 space-y-6">
            {/* Premium Ad */}
            <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl p-6 text-white border-2 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">CollabStudy Premium</h3>
                  <p className="text-sm text-white/90">Ad-free experience with exclusive features</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                Get Premium
              </button>
            </div>

            {/* Top Communities */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Top Communities</h3>
              <div className="space-y-4">
                {topCommunities.map((comm, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-400">#{idx + 1}</span>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {comm.initial}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{comm.name}</div>
                        <div className="text-xs text-gray-500">{comm.members}</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition-colors text-sm">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Be respectful and kind</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>No spam or self-promotion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Share helpful resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Give credit to sources</span>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Post</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Write your content here..."
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                rows="6"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 transition-all font-medium"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const communities = [
  { id: 1, name: "r/Engineering", initial: "E" },
  { id: 2, name: "r/ArtificialIntelligence", initial: "A" },
  { id: 3, name: "r/CBSE", initial: "C" },
  { id: 4, name: "r/JEENEETards", initial: "J" },
  { id: 5, name: "r/ComputerScience", initial: "C" },
  { id: 6, name: "r/learnmath", initial: "I" },
];

const topCommunities = [
  { name: "r/Engineering", members: "3.4k members", initial: "E" },
  { name: "r/ArtificialIntelligence", members: "2.8k members", initial: "A" },
  { name: "r/CBSE", members: "4.1k members", initial: "C" },
  { name: "r/JEENEETards", members: "5.6k members", initial: "J" },
  { name: "r/ComputerScience", members: "3.9k members", initial: "C" },
];

const samplePosts = [
  {
    id: 1,
    author: 'sarahchen',
    title: 'Best resources for learning Neural Networks?',
    body: 'I\'m starting my journey into deep learning and looking for the best resources. Any recommendations for beginners?',
    tags: ['questions', 'ai', 'machine-learning'],
    likes: 142,
    comments: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    community: 'r/ArtificialIntelligence',
  },
  {
    id: 2,
    author: 'johndoe',
    title: 'Study group for Data Structures prep',
    body: 'Forming a study group for DSA interview prep. We\'ll meet twice a week and solve problems together. DM if interested!',
    tags: ['events', 'dsa'],
    likes: 287,
    comments: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    community: 'r/ComputerScience',
  },
  {
    id: 3,
    author: 'alexsmith',
    title: 'Free Calculus practice problems collection',
    body: 'I\'ve compiled 100+ calculus problems with solutions. Let me know if you want the PDF!',
    tags: ['resources', 'math'],
    likes: 521,
    comments: 89,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    community: 'r/learnmath',
  },
];

export default Community;
