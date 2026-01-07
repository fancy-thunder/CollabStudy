import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaComment, FaPaperPlane, FaBookmark, FaRegBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment, collection } from "firebase/firestore";
import { db } from "../../../firebase";

function PostCard({ post }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch user data and check if current user liked this post
  useEffect(() => {
    async function fetchData() {
      if (!post.userId) {
        setLoading(false);
        return;
      }
      try {
        // Fetch post author data
        const userRef = doc(db, "user", post.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Check if current user has liked this post (from likes subcollection)
        if (currentUser?.uid && post.id) {
          const likeRef = doc(db, "posts", post.id, "likes", currentUser.uid);
          const likeSnap = await getDoc(likeRef);
          setIsLiked(likeSnap.exists());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [post.userId, post.id]);

  // Carousel navigation
  const graphics = post.graphic || [];
  const hasMultipleSlides = graphics.length > 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % graphics.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + graphics.length) % graphics.length);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  // User display info
  const userFullName = userData
    ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
    : "Anonymous";
  const userInitial = userData?.firstName?.[0]?.toUpperCase() || "?";
  const userAvatar = userData?.imageUrl;
  const username = userData
    ? `${(userData.firstName || "").toLowerCase()}${(userData.lastName || "").toLowerCase()}`
    : "anonymous";

  // Handle like/unlike using subcollection
  const handleLike = async () => {
    if (!currentUser?.uid || !post.id) return;

    const likeRef = doc(db, "posts", post.id, "likes", currentUser.uid);
    const postRef = doc(db, "posts", post.id);

    try {
      if (isLiked) {
        // Unlike: remove from subcollection and decrement count
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likesCount: increment(-1) });
        setIsLiked(false);
        setLikesCount((prev) => Math.max(0, prev - 1));
      } else {
        // Like: add to subcollection and increment count
        await setDoc(likeRef, {
          userId: currentUser.uid,
          createdAt: new Date()
        });
        await updateDoc(postRef, { likesCount: increment(1) });
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* User Avatar with gradient ring */}
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
            <div className="p-[2px] rounded-full bg-neutral-900">
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-neutral-800 animate-pulse" />
              ) : userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userFullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-white">{username}</span>
              {userData?.isVerified && (
                <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {userData?.institutionName && (
              <span className="text-xs text-neutral-500">{userData.institutionName}</span>
            )}
          </div>
        </div>
        <button className="text-neutral-400 hover:text-white transition-colors p-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>

      {/* Post Title (if exists) */}
      {post.title && (
        <div className="px-4 pb-3">
          <h3 className="font-semibold text-base text-white">{post.title}</h3>
        </div>
      )}

      {/* Media Carousel */}
      {graphics.length > 0 ? (
        <div className="relative w-full aspect-square bg-neutral-800">
          {/* Current Slide */}
          <div className="w-full h-full">
            {graphics[currentSlide]?.resource_type === "video" ? (
              <video
                src={graphics[currentSlide]?.url}
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            ) : (
              <img
                src={graphics[currentSlide]?.url}
                alt={`Post media ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Navigation Arrows */}
          {hasMultipleSlides && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-900 flex items-center justify-center text-white shadow-lg transition-all opacity-80 hover:opacity-100"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-900 flex items-center justify-center text-white shadow-lg transition-all opacity-80 hover:opacity-100"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {hasMultipleSlides && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {graphics.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-white w-2"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter Badge */}
          {hasMultipleSlides && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-neutral-900/80 rounded-full text-xs font-medium text-white">
              {currentSlide + 1}/{graphics.length}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-neutral-800/50 flex items-center justify-center">
          <div className="text-neutral-600 text-sm">No media</div>
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button className="text-2xl hover:scale-110 transition-transform" onClick={handleLike}>
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="hover:text-neutral-400" />
              )}
            </button>
            <button className="text-2xl hover:scale-110 transition-transform hover:text-neutral-400">
              <FaComment />
            </button>
            <button className="text-2xl hover:scale-110 transition-transform hover:text-neutral-400">
              <FaPaperPlane />
            </button>
          </div>
          <button className="text-2xl hover:scale-110 transition-transform">
            {post.isBookmarked ? (
              <FaBookmark className="text-white" />
            ) : (
              <FaRegBookmark className="hover:text-neutral-400" />
            )}
          </button>
        </div>

        {/* Likes */}
        {likesCount > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-sm">{likesCount.toLocaleString()} likes</span>
          </div>
        )}

        {/* Caption/Body */}
        {post.body && (
          <div className="mb-2">
            <span className="font-semibold text-sm mr-2">{username}</span>
            <span className="text-sm text-neutral-300">{post.body}</span>
          </div>
        )}

        {/* View Comments */}
        {post.commentsCount > 0 && (
          <button className="text-sm text-neutral-500 hover:text-neutral-400 mb-2 transition-colors">
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Timestamp */}
        <div className="text-[11px] text-neutral-500 uppercase tracking-wide mt-2">
          {formatTime(post.createdAt)}
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-800">
          <button className="text-xl">😊</button>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder-neutral-500 text-white"
          />
          <button className="text-indigo-400 font-semibold text-sm opacity-50 cursor-not-allowed">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
