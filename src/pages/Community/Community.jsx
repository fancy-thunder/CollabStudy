import React, { useState } from "react";

// Community Page (React + Tailwind)
export default function CommunityPage() {
  const [posts, setPosts] = useState(samplePosts);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", tags: "" });

  const filteredPosts = posts.filter((p) => {
    const matchesTab = activeTab === "All" || p.tags.includes(activeTab.toLowerCase());
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
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", body: "", tags: "" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Community</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Create Post
          </button>
        </div>

        {/* Search + Tabs */}
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'Questions', 'Resources', 'Events', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {filteredPosts.length === 0 && (
              <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                No posts found.
              </div>
            )}

            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-bold">
                    {post.author[0]}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-800">{post.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      by {post.author} · {timeAgo(post.createdAt)} ago
                    </p>
                    <p className="text-sm text-gray-700 mb-3">{post.body}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <button className="hover:text-indigo-600">👍 {post.likes}</button>
                      <button className="hover:text-indigo-600">💬 {post.comments}</button>
                      <button className="hover:text-indigo-600">↗ Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Contributors</h3>
              {sampleMembers.map((m) => (
                <div key={m.id} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-semibold">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Upcoming Events</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Hackathon • Nov 8</li>
                <li>Design Review • Nov 12</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Create Post</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <textarea
                placeholder="Write your content here..."
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                rows="5"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
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
}

// Helper function and mock data
const timeAgo = (date) => {
  const diff = (Date.now() - new Date(date)) / 60000;
  if (diff < 60) return `${Math.floor(diff)}m`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h`;
  return `${Math.floor(diff / 1440)}d`;
};

const samplePosts = [
  {
    id: 1,
    author: 'Aisha',
    title: 'Where to find React resources?',
    body: 'Looking for solid React Hooks guides. Any suggestions?',
    tags: ['questions', 'react'],
    likes: 10,
    comments: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 2,
    author: 'Ravi',
    title: 'Study group for DSA',
    body: 'Forming a weekend study group for DSA prep. DM if interested.',
    tags: ['events', 'dsa'],
    likes: 6,
    comments: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
];

const sampleMembers = [
  { id: 1, name: 'Aisha', contributions: 54 },
  { id: 2, name: 'Ravi', contributions: 38 },
  { id: 3, name: 'Mei', contributions: 25 },
];
