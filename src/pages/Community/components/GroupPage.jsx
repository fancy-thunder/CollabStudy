import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, getDocs, Timestamp , setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { FaArrowLeft, FaCog, FaUserFriends } from "react-icons/fa";
import PostCard from "./PostCard";

export default function GroupPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showManageMembers, setShowManageMembers] = useState(false);
  const [showEditRules, setShowEditRules] = useState(false);
  const [showEditGroupDetails, setShowEditGroupDetails] = useState(false);
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "groups", groupId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setGroup({ id: snap.id, ...snap.data() });
        } else {
          setGroup(null);
        }
      } catch (err) {
        console.error("Failed to load group:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [groupId]);

  // check if current user is a member of this group
  useEffect(() => {
    const checkMembership = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.uid) return;
        const memRef = doc(db, "groups", groupId, "members", user.uid);
        const memSnap = await getDoc(memRef);
        setSubscribed(!!memSnap.exists());
      } catch (err) {
        console.error("Failed to check membership:", err);
      }
    };

    checkMembership();
  }, [groupId]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!group) return;
      try {
        const q = query(collection(db, "posts"), where("groupId", "==", group.id));
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPosts(list);
      } catch (err) {
        console.error("Failed to load group posts:", err);
      }
    };

    fetchPosts();
  }, [group]);

  const handleCreatePost = async () => {
    if (!newPost.trim() || !group) return;
    try {
      await addDoc(collection(db, "posts"), {
        title: "",
        body: newPost.trim(),
        createdAt: Timestamp.now(),
        groupId: group.id,
        likesCount: 0,
        commentsCount: 0,
      });
      setNewPost("");
      // re-fetch posts
      const q = query(collection(db, "posts"), where("groupId", "==", group.id));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(list);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const handleManageMembers = () => setShowManageMembers(true);
  const handleEditRules = () => setShowEditRules(true);
  const handleEditGroupDetails = () => setShowEditGroupDetails(true);
  const closeModal = () => {
    setShowManageMembers(false);
    setShowEditRules(false);
    setShowEditGroupDetails(false);
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-900 text-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-neutral-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchMembers = async () => {
      if (!groupId) return;
      try {
        const membersRef = collection(db, "groups", groupId, "members");
        const membersSnap = await getDocs(membersRef);
        const members = membersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMembersList(members);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };

    if (showManageMembers) {
      fetchMembers();
    }
  }, [groupId, showManageMembers]);

  useEffect(() => {
    const fetchMemberCount = async () => {
      if (!groupId) return;
      try {
        const membersRef = collection(db, "groups", groupId, "members");
        const membersSnap = await getDocs(membersRef);
        setGroup((prev) => ({ ...prev, memberCount: membersSnap.size }));
      } catch (err) {
        console.error("Failed to fetch member count:", err);
      }
    };

    fetchMemberCount();
  }, [groupId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!group) return <div className="p-6">Group not found</div>;

  const members = group.memberCount || 0;
  const online = Math.min(members, Math.max(1, Math.floor(members * 0.15)));

  async function handleGroupSubscribe() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.uid) return;

    const memberRef = collection(db, "groups", groupId, "members");
    try {
      if (subscribed) {
        // unsubscribe: remove member doc
        await deleteDoc(doc(memberRef, user.uid));
        setSubscribed(false);
        setGroup((prev) => (prev ? { ...prev, memberCount: Math.max(0, (prev.memberCount || 1) - 1) } : prev));
      } else {
        // subscribe: create member doc
        await setDoc(doc(memberRef, user.uid), {
          userId: user.uid,
          userName: JSON.parse(localStorage.getItem("usermeta")).firstName,
          isAdmin: false,
          createdAt: new Date(),
        });
        setSubscribed(true);
        setGroup((prev) => (prev ? { ...prev, memberCount: (prev.memberCount || 0) + 1 } : prev));
      }
    } catch (err) {
      console.error("Failed to toggle subscription:", err);
    }
  }

  const handleEditGroupDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupRef = doc(db, "groups", groupId);
      await setDoc(groupRef, {
        name: group.name,
        bio: group.bio,
      }, { merge: true });
      alert("Group details updated successfully.");
      setShowEditGroupDetails(false);
    } catch (err) {
      console.error("Failed to update group details:", err);
      alert("Failed to update group details. Please try again.");
    }
  };

  const handleEditRulesSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupRef = doc(db, "groups", groupId);
      await setDoc(groupRef, {
        rules: group.rules,
      }, { merge: true });
      alert("Rules updated successfully.");
      setShowEditRules(false);
    } catch (err) {
      console.error("Failed to update rules:", err);
      alert("Failed to update rules. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Banner */}
        <div className="rounded-md overflow-hidden mb-6">
          <div className="h-36 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-end p-4">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-neutral-800 rounded-lg -mb-6 ring-4 ring-neutral-900 overflow-hidden">
                  {group.imageUrl ? (
                    <img src={group.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">{group.name?.slice(0, 1)}</div>
                  )}
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{group.name}</h1>
                  <p className="text-sm opacity-90">{group.bio}</p>
                  <div className="mt-2 flex items-center gap-3 text-sm opacity-90">
                    <span>{members} members</span>
                    <span>•</span>
                    <span>{online} online</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={handleGroupSubscribe}
                className={`px-4 py-2 rounded-lg font-semibold ${subscribed ? "bg-neutral-800 text-white" : "bg-white text-black"}`}>
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={`Create a post in r/${group.name}`}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button onClick={handleCreatePost} className="px-4 py-2 bg-indigo-600 rounded-lg text-white">Post</button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-neutral-500 text-sm">No posts yet.</div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    post={post}
                    key={post.id}
                    currentUserId={JSON.parse(localStorage.getItem("user"))?.uid}
                    currentUserName={JSON.parse(localStorage.getItem("usermeta"))?.firstName}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">About r/{group.name}</h3>
              <p className="text-sm text-neutral-400 mb-3">{group.bio}</p>
              <div className="flex gap-3">
                <div className="text-sm text-neutral-400">Members</div>
                <div className="font-semibold">{members}</div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="text-sm text-neutral-400">Online</div>
                <div className="font-semibold">{online}</div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Group settings</h4>
              <button
                className="w-full px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-left"
                onClick={handleManageMembers}
              >
                Manage members
              </button>
              <button
                className="w-full mt-2 px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-left"
                onClick={handleEditGroupDetails}
              >
                Edit group details
              </button>
              <button
                className="w-full mt-2 px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-left"
                onClick={handleEditRules}
              >
                Edit rules
              </button>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Rules</h4>
              <ol className="text-sm text-neutral-400 list-decimal pl-4 space-y-1">
                <li>Be respectful</li>
                <li>No spam</li>
                <li>Stay on topic</li>
              </ol>
            </div>
          </aside>
        </div>

        {/* Modals */}
        {showManageMembers && (
          <Modal onClose={closeModal}>
            <h3 className="text-lg font-semibold mb-4">Manage Members</h3>
            {membersList.length === 0 ? (
              <p>No members found.</p>
            ) : (
              <ul className="space-y-2">
                {membersList.map((member) => (
                  <li key={member.id} className="flex items-center justify-between bg-neutral-800 p-2 rounded-lg">
                    <span>{member.userName || "Unknown User"}</span>
                    <span className="text-sm text-neutral-500">{member.isAdmin ? "Admin" : "Member"}</span>
                  </li>
                ))}
              </ul>
            )}
          </Modal>
        )}

        {showEditGroupDetails && (
          <Modal onClose={closeModal}>
            <h3 className="text-lg font-semibold mb-4">Edit Group Details</h3>
            <form onSubmit={handleEditGroupDetailsSubmit}>
              <label className="block mb-2">
                Group Name:
                <input
                  type="text"
                  value={group.name || ""}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  placeholder="Enter group name"
                  className="w-full mt-1 p-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                />
              </label>
              <label className="block mb-4">
                Description:
                <textarea
                  value={group.bio || ""}
                  onChange={(e) => setGroup({ ...group, bio: e.target.value })}
                  placeholder="Enter group description"
                  className="w-full mt-1 p-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                ></textarea>
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </form>
          </Modal>
        )}

        {showEditRules && (
          <Modal onClose={closeModal}>
            <h3 className="text-lg font-semibold mb-4">Edit Rules</h3>
            <form onSubmit={handleEditRulesSubmit}>
              <textarea
                value={group.rules?.join("\n") || ""}
                onChange={(e) => setGroup({ ...group, rules: e.target.value.split("\n") })}
                placeholder="Enter rules, one per line"
                className="w-full mt-1 p-2 bg-neutral-800 border border-neutral-700 rounded-lg mb-4"
                rows={6}
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
