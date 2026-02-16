import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import {
  FaUsers,
  FaPlus,
  FaSignOutAlt,
  FaComment,
  FaLock,
  FaUserFriends,
  FaPlusCircle,
} from "react-icons/fa";

// Mock data – replace with Firestore when backend is ready
const MOCK_MY_GROUPS = [
  {
    id: "1",
    name: "CS 101 Study Squad",
    bio: "Share notes, past papers and doubts for CS 101. Weekly live revision sessions.",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=cs101",
    memberCount: 24,
    isPrivate: false,
  },
  {
    id: "2",
    name: "Math Olympiad Prep",
    bio: "Practice problems and solutions for regional math olympiads. All levels welcome.",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=math",
    memberCount: 12,
    isPrivate: true,
  },
  {
    id: "3",
    name: "Late Night Coders",
    bio: "Debug together, share resources, and build side projects. Focus on web and mobile.",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=code",
    memberCount: 48,
    isPrivate: false,
  },
];

const MOCK_DISCOVER = [
  {
    id: "d1",
    name: "Physics JEE Prep",
    bio: "Concept discussions and problem-solving for JEE Physics.",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=physics",
    memberCount: 56,
    isPrivate: false,
  },
  {
    id: "d2",
    name: "Design Critique Circle",
    bio: "Share UI/UX work and get constructive feedback weekly.",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=design",
    memberCount: 18,
    isPrivate: true,
  },
];

function GroupCard({
  group,
  variant = "member", // "member" | "discover"
  onOpen,
  onLeave,
  onJoin,
}) {
  const { name, bio, imageUrl, memberCount, isPrivate } = group;
  const isMember = variant === "member";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
      <div className="p-4 flex gap-4">
        {/* Group avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-800 ring-2 ring-neutral-700">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">
                {name?.slice(0, 1) || "G"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white truncate">{name}</h3>
            {isPrivate && (
              <span className="text-neutral-500" title="Private group">
                <FaLock className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400 mt-0.5 line-clamp-2">{bio}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <FaUserFriends className="w-3.5 h-3.5" />
              {memberCount} members
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {isMember ? (
              <>
                <button
                  onClick={() => onOpen?.(group)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                >
                  <FaComment className="w-3.5 h-3.5" />
                  Open
                </button>
                <button
                  onClick={() => onLeave?.(group)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-600 text-neutral-400 hover:bg-neutral-800 hover:text-white text-sm transition-colors"
                >
                  <FaSignOutAlt className="w-3.5 h-3.5" />
                  Leave
                </button>
              </>
            ) : (
              <button
                onClick={() => onJoin?.(group)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
              >
                <FaPlus className="w-3.5 h-3.5" />
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  const [myGroups, setMyGroups] = useState(MOCK_MY_GROUPS);
  const [discoverGroups, setDiscoverGroups] = useState(MOCK_DISCOVER);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", bio: "", isPrivate: false });

  const handleCreateGroup = async (e) => {
    e?.preventDefault();
    const name = createForm.name.trim();
    if (!name) return;
    const idSeed = name.replace(/\s+/g, "").slice(0, 8) || `g-${Date.now()}`;
    const imageUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${idSeed}`;

    const groupData = {
      name,
      bio: createForm.bio.trim() || "No description yet.",
      imageUrl,
      memberCount: 1,
      isPrivate: !!createForm.isPrivate,
      createdAt: serverTimestamp(),
      createdBy: auth?.currentUser?.uid || null,
    };

    try {
      const docRef = await addDoc(collection(db, "groups"), groupData);
      const newGroup = {
        id: docRef.id,
        ...groupData,
        // Firestore serverTimestamp() is an object; keep a sensible default for UI
        createdAt: new Date().toISOString(),
      };
      setMyGroups((prev) => [newGroup, ...prev]);
      setCreateForm({ name: "", bio: "", isPrivate: false });
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create group:", err);
      alert("Unable to create group. Please try again later.");
    }
  };

  const handleLeave = (group) => {
    setMyGroups((prev) => prev.filter((g) => g.id !== group.id));
    setDiscoverGroups((prev) => [...prev, { ...group, id: `d-${group.id}` }]);
  };

  const handleJoin = (group) => {
    const toAdd = discoverGroups.find((g) => g.id === group.id) || group;
    setDiscoverGroups((prev) => prev.filter((g) => g.id !== group.id));
    setMyGroups((prev) => [...prev, { ...toAdd, memberCount: (toAdd.memberCount || 0) + 1 }]);
    setShowJoinModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header + CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Groups</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-600 text-white font-semibold hover:bg-neutral-800 transition-all"
          >
            <FaPlusCircle className="w-4 h-4" />
            Create group
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/20"
          >
            <FaPlus className="w-4 h-4" />
            Join a group
          </button>
        </div>
      </div>

      {/* Your groups */}
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FaUsers className="w-4 h-4" />
          Your groups
        </h3>
        {myGroups.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
              <FaUsers className="w-8 h-8 text-neutral-500" />
            </div>
            <p className="text-neutral-400 mb-2">You’re not in any groups yet</p>
            <p className="text-sm text-neutral-500 mb-4">Create your own or join one to study together.</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg border border-neutral-600 text-white hover:bg-neutral-800 text-sm font-medium"
              >
                Create group
              </button>
              <button
                onClick={() => setShowJoinModal(true)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
              >
                Find groups
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {myGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                variant="member"
                onOpen={(g) => console.log("Open group", g)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        )}
      </section>

      {/* Discover (more groups to join) */}
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
          Discover more
        </h3>
        <div className="space-y-4">
          {discoverGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              variant="discover"
              onJoin={() => handleJoin(group)}
            />
          ))}
        </div>
      </section>

      {/* Join modal – list of groups to join */}
      {showJoinModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowJoinModal(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <h3 className="font-semibold text-white">Join a group</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
              {discoverGroups.length === 0 ? (
                <p className="text-neutral-500 text-sm text-center py-6">No more groups to show.</p>
              ) : (
                discoverGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-700 flex-shrink-0">
                      {group.imageUrl ? (
                        <img src={group.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold">
                          {group.name?.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{group.name}</p>
                      <p className="text-xs text-neutral-500">{group.memberCount} members</p>
                    </div>
                    <button
                      onClick={() => handleJoin(group)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium"
                    >
                      Join
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create group modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <h3 className="font-semibold text-white">Create a group</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Group name *</label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. CS 101 Study Squad"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Description / bio</label>
                <textarea
                  value={createForm.bio}
                  onChange={(e) => setCreateForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="What’s this group about?"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createForm.isPrivate}
                  onChange={(e) => setCreateForm((f) => ({ ...f, isPrivate: e.target.checked }))}
                  className="rounded border-neutral-600 bg-neutral-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-neutral-400">Private group (invite-only)</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Group;
