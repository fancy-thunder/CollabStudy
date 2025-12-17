import React, { useState, useContext } from "react";
import { FaHeart, FaRegHeart, FaComment, FaBookmark, FaRegBookmark, FaHome, FaSearch, FaCompass, FaPlay, FaPaperPlane, FaBell, FaPlusCircle, FaChartBar, FaBars, FaImage, FaVideo } from "react-icons/fa";
import AuthContext from "../../context/Auth.jsx";
import uploadCloudinary from "../../services/cloudinaryUpload.js";
import { db } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

function Community() {
  // Sample posts data
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [graphic, setGraphic] = useState([])

  // Get context values with fallback
  const contextValue = useContext(AuthContext);
  console.log(contextValue)
  const userEmail = contextValue?.userEmail || null;
  const userDisplayName = contextValue?.userDisplayName || null;
  const isLoggedIn = contextValue?.isLoggedIn || false;
  const userId = contextValue?.userId || null;
  const posts = [
    {
      id: 1,
      username: "john_doe",
      userInitial: "J",
      time: "1h",
      caption: "Just finished an amazing study session! The AI assistant helped me understand calculus concepts.",
      likes: 124,
      comments: 23,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      username: "sarah_student",
      userInitial: "S",
      time: "3h",
      caption: "Looking for a study group for the upcoming physics exam. Anyone interested?",
      likes: 89,
      comments: 15,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: 3,
      username: "alex_learner",
      userInitial: "A",
      time: "5h",
      caption: "The community here is so supportive! Thanks everyone! 💙",
      likes: 256,
      comments: 42,
      isLiked: false,
      isBookmarked: true,
    },
  ];
  async function uploadGraphic(file, type) {
    console.log(file)
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CollabStudyPosts"); // replace with your actual preset
    data.append("cloud_name", "dx1ays0ph"); // optional, for clarity

    let response = await uploadCloudinary(data, type)

    setGraphic([...graphic, response.data])
    alert("Uploaded Successfully!");

  }
  console.log(graphic)



  async function UploadPost(){
    addDoc(collection(db, "posts"), {
      title,
      body,
      graphic,
      createdAt: Timestamp.now(),
      userId: userId,
    })
  }

  // Sample suggestions
  const suggestions = [
    { id: 1, username: "emma_smart", userInitial: "E", fullName: "Emma Smart", mutual: "Followed by 5 friends" },
    { id: 2, username: "lisa_learns", userInitial: "L", fullName: "Lisa Learns", mutual: "Followed by 3 friends" },
    { id: 3, username: "tom_tutor", userInitial: "T", fullName: "Tom Tutor", mutual: "Followed by 8 friends" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-4 fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CollabStudy</h1>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaHome className="w-6 h-6" />
            <span className="text-base">Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaSearch className="w-6 h-6" />
            <span className="text-base">Search</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaCompass className="w-6 h-6" />
            <span className="text-base">Explore</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaPlay className="w-6 h-6" />
            <span className="text-base">Reels</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors relative">
            <FaPaperPlane className="w-6 h-6" />
            <span className="text-base">Messages</span>
            <span className="absolute left-6 top-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBell className="w-6 h-6" />
            <span className="text-base">Notifications</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaPlusCircle className="w-6 h-6" />
            <span className="text-base">Create</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaChartBar className="w-6 h-6" />
            <span className="text-base">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
            <span className="text-base">Profile</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBars className="w-6 h-6" />
            <span className="text-base">More</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 mr-80 max-w-2xl mx-auto px-4 py-8">
        {/* Create Post Component */}
        <div className="mb-6 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <div className="flex gap-4">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>

            {/* Post Form */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Post Title"
                className="w-full bg-transparent border-0 outline-none text-white placeholder-neutral-500 text-lg font-semibold mb-2"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />



              <textarea
                placeholder="What's on your mind?"
                className="w-full bg-transparent border-0 outline-none text-white placeholder-neutral-500 resize-none mb-3 min-h-[100px]"
                rows="4"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value)
                }}
              />

              <div style={{ "width": "100px", display: "flex" }} >

                {graphic.map((data, idx) => (
                  <div
                    key={data.public_id || data.url || idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginRight: "10px"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        // remove graphic at idx
                        setGraphic(graphic.filter((_, i) => i !== idx));
                      }}
                      aria-label="Remove media"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        zIndex: 2,
                        background: "rgba(30, 30, 30, 0.80)",
                        border: "none",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: 0
                      }}
                    >
                      ×
                    </button>
                    {data.resource_type === "image" ? (
                      <img
                        src={data.url}
                        alt="uploaded media"
                        style={{
                          maxWidth: 70,
                          maxHeight: 70,
                          borderRadius: 6,
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    ) : (
                      <video
                        controls
                        style={{
                          maxWidth: 100,
                          maxHeight: 70,
                          borderRadius: 6,
                          display: "block"
                        }}
                      >
                        <source src={data.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        uploadGraphic(e.target.files[0], "image")
                      }}
                    />
                    <FaImage className="w-5 h-5" />
                    <span className="text-sm">Photo</span>
                  </label>
                  <label className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        uploadGraphic(e.target.files[0], "video")
                      }}
                    />
                    <FaVideo className="w-5 h-5" />
                    <span className="text-sm">Video</span>
                  </label>
                </div>

                <button onClick={UploadPost} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-sm">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-neutral-900 border border-neutral-800 rounded-lg">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {post.userInitial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{post.username}</div>
                  </div>
                </div>
                <button className="text-xl font-bold text-neutral-400">
                  <span>⋯</span>
                </button>
              </div>

              {/* Post Image Placeholder */}
              <div className="w-full h-96 bg-neutral-800 flex items-center justify-center">
                <div className="text-neutral-600 text-sm">Post Image</div>
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-2xl">
                      {post.isLiked ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <button className="text-2xl">
                      <FaComment />
                    </button>
                    <button className="text-2xl">
                      <FaPaperPlane />
                    </button>
                  </div>
                  <button className="text-2xl">
                    {post.isBookmarked ? (
                      <FaBookmark className="text-yellow-500" />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-sm mr-2">{post.likes} likes</span>
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-sm mr-2">{post.username}</span>
                  <span className="text-sm">{post.caption}</span>
                </div>

                <button className="text-sm text-neutral-400 mb-2">
                  View all {post.comments} comments
                </button>

                <div className="text-xs text-neutral-500 mt-2">{post.time} ago</div>

                {/* Comment Input */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-800">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent border-0 outline-none text-sm placeholder-neutral-500"
                  />
                  <button className="text-indigo-400 font-semibold text-sm">Post</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l border-neutral-800 p-6 fixed right-0 top-0 h-screen overflow-y-auto">
        {/* User Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-1">
                {userEmail || "your_username"}
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-neutral-400">{userDisplayName || "Your Name"}</div>
            </div>
          </div>
          <button className="text-indigo-400 text-sm font-semibold">Switch</button>
        </div>

        {/* Suggestions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-neutral-400">Suggested for you</span>
            <button className="text-xs font-semibold">See all</button>
          </div>
          <div className="space-y-3">
            {suggestions.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.userInitial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{user.username}</div>
                    <div className="text-xs text-neutral-400">{user.mutual}</div>
                  </div>
                </div>
                <button className="text-indigo-400 text-xs font-semibold">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-xs text-neutral-500 space-y-2">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">About</a>
            <span>·</span>
            <a href="#" className="hover:underline">Help</a>
            <span>·</span>
            <a href="#" className="hover:underline">Press</a>
            <span>·</span>
            <a href="#" className="hover:underline">API</a>
            <span>·</span>
            <a href="#" className="hover:underline">Jobs</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div className="text-neutral-600 mt-4">© 2025 COLLABSTUDY</div>
        </div>
      </aside>

      {/* Floating Messages Bar */}
      <div className="fixed bottom-4 right-4 bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-lg z-50">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-semibold text-sm">Messages</span>
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-semibold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="text-neutral-400 text-xl">...</span>
        </div>
      </div>
    </div>
  );
}

export default Community;