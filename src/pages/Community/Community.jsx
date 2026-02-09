import React, { useState, useContext, useEffect } from "react";
import { FaHeart, FaRegHeart, FaComment, FaBookmark, FaRegBookmark, FaHome, FaSearch, FaCompass, FaPlay, FaPaperPlane, FaBell, FaPlusCircle, FaChartBar, FaBars, FaImage, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth.jsx";
import uploadCloudinary from "../../services/cloudinaryUpload.js";
import { db } from "../../firebase.js";
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import LeftSidebar from "./components/LeftSidebar.jsx";
import PostCard from "./components/PostCard.jsx";
import Search from "./components/Search.jsx";
import Explore from "./components/Explore.jsx";
import Reels from "./components/Reels.jsx";
import Messages from "./components/Message.jsx";
import Notifications from "./components/Notification.jsx";
import Create from "./components/Create.jsx";
import Dashboard from "./components/Dashboard.jsx";
function Community() {
  // Sample posts data
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [graphic, setGraphic] = useState([])
  const [posts, setPosts] = useState([])
  const [userMeta, setUserMeta] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [newPostAdded, setNewPostAdded] = useState(false)

  const [tabSelected, setTabSelected] = useState("Home")
  // Get context values with fallback

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"))
    const userInfo = JSON.parse(localStorage.getItem("usermeta"))
    setCurrentUser(userData)
    setUserMeta(userInfo)

    console.log("Community user data", userData)
  }, [])


  useEffect(() => {
    async function fetchPosts() {
      const postsRef = collection(db, "posts")
      const q = query(postsRef, orderBy("createdAt", "desc"))
      const postsSnapshot = await getDocs(q)
      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,  // Include document ID for subcollection references
        ...doc.data()
      }))
      console.log(posts)
      setPosts(posts)
    }
    fetchPosts()
  }, [newPostAdded])

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



  async function UploadPost() {
    const postRef = await addDoc(collection(db, "posts"), {
      title,
      body,
      graphic,
      createdAt: Timestamp.now(),
      userId: currentUser.uid,
      likesCount: 0,
      commentsCount: 0
    })
    // Subcollections (likes, comments) will be created automatically 
    // when the first like/comment document is added
    console.log("Post created with ID:", postRef.id)

    setNewPostAdded(!newPostAdded)
    // Clear form after upload
    setTitle("")
    setBody("")
    setGraphic([])
  }

  // Sample suggestions

  console.log("User Meta", userMeta)
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <LeftSidebar tabSelected={tabSelected} setTabSelected={setTabSelected} />

      {/* Main Content */}
      {/* Main Content */}
      {/* post Feed */}
      <div className="flex-1 ml-64 mr-80 max-w-2xl mx-auto px-4 py-8" >
        {
          tabSelected == "Home" && <main >
            {/* Create Post Component */}
            <div className="mb-6 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{
                      backgroundImage: userMeta?.imageUrl ? `url(${userMeta.imageUrl})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: !userMeta?.imageUrl ? "#6366F1" : undefined
                    }}
                  >
                    {!userMeta?.imageUrl && (
                      <span>
                        {userMeta?.firstName?.[0] || "U"}
                      </span>
                    )}
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
                <PostCard
                  post={post}
                  key={post.id}
                  currentUserId={currentUser?.uid}
                  currentUserName={
                    (userMeta?.firstName || "") +
                    " " +
                    (userMeta?.lastName || "")
                  }
                />
              ))}
            </div>
          </main>
        }

        {
          tabSelected == "Search" && <Search />
        }
        {
          tabSelected == "Explore" && <Explore />
        }
        {
          tabSelected == "Reels" && <Reels />
        }
        {
          tabSelected == "Messages" && <Messages />
        }
        {
          tabSelected == "Notifications" && <Notifications />
        }
        {
          tabSelected == "Create" && <Create />
        }
        {
          tabSelected == "Dashboard" && <Dashboard />
        }
      </div>


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
                {currentUser?.email || "your_username"}
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-neutral-400">{(userMeta?.firstName || "") + " " + (userMeta?.lastName || "") || "Your Name"}</div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-neutral-400">Suggested for you</span>
            <button className="text-xs font-semibold">See all</button>
          </div>
          <div className="space-y-3">

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

    </div>
  );
}

export default Community;