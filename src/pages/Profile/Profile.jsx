import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../../components/Navbar"
import AuthContext from "../../context/Auth";
import { useContext } from "react";
const AVATAR_FALLBACK =
  "https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundType=gradientLinear";

function safeCount(v) {
  if (Array.isArray(v)) return v.length;
  if (typeof v === "number") return v;
  return 0;
}

function fmtDate(d) {
  try {
    if (!d) return null;
    const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
    const valid = new Date(date);
    if (isNaN(valid.getTime())) return null;
    return valid.toLocaleDateString();
  } catch {
    return null;
  }
}

// Resolve current user id: AuthContext (set on SignIn) or localStorage (persists after refresh)
function useCurrentUserId() {
  const { userId: contextUserId } = useContext(AuthContext);
  const [localUserId, setLocalUserId] = useState(null);
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user?.uid) setLocalUserId(user.uid);
      }
    } catch (_) {}
  }, []);
  return contextUserId || localUserId;
}

const Profile = () => {
  const { userId: profileUserId } = useParams();
  const { setUserDisplayName } = useContext(AuthContext);
  const currentUserId = useCurrentUserId();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("posts"); // posts | achievements | activity
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "user", profileUserId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfile(data);
          setUserDisplayName(data.firstName + " " + data.lastName);
          setFollowersCount(data.followersCount ?? safeCount(data.followers) ?? 0);
          // Only persist usermeta when viewing your own profile
          if (profileUserId === currentUserId) {
            try {
              localStorage.setItem("usermeta", JSON.stringify(data));
            } catch (e) {
              console.warn("Could not persist usermeta to localStorage", e);
            }
          }
        } else {
          setProfile(null);
        }
      } catch (e) {
        console.error("Error fetching user profile", e);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    if (profileUserId) fetchUserProfile();
  }, [profileUserId, currentUserId]);

  // Check if current user follows this profile (same pattern as PostCard likes)
  useEffect(() => {
    async function checkFollowStatus() {
      if (!currentUserId || !profileUserId || currentUserId === profileUserId) return;
      try {
        const followersRef = doc(db, "user", profileUserId, "followers", currentUserId);
        const snap = await getDoc(followersRef);
        setIsFollowing(snap.exists());
      } catch (e) {
        console.error("Error checking follow status", e);
      }
    }
    checkFollowStatus();
  }, [currentUserId, profileUserId]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50">
        <div className="animate-pulse text-neutral-500">Loading profile…</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50">
        <p className="text-neutral-500">No profile data found.</p>
      </div>
    );
  }

  const p = profile;
  const dark = !!p.darkMode; // respect your stored flag

  const bg = dark ? "bg-neutral-950" : "bg-neutral-50";
  const card = dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200";
  const textPri = dark ? "text-neutral-100" : "text-neutral-900";
  const textSec = dark ? "text-neutral-400" : "text-neutral-600";

  const fullName = `${p.firstName || "User"} ${p.lastName || ""}`.trim();
  const username = `${(p.firstName || "user").toLowerCase()}${(p.lastName || "").toLowerCase()}` || "user";
  const avatar = p.imageUrl || AVATAR_FALLBACK;

  const stats = [
    { label: "Posts", value: p.postsCount ?? 0 },
    { label: "Followers", value: followersCount },
    { label: "Following", value: p.followingCount ?? safeCount(p.following) ?? 0 },
  ];

  const education = [p.degreeOrClass, p.fieldOfStudy, p.institutionName]
    .filter(Boolean)
    .join(", ");

  const createdAt = fmtDate(p.createdAt);
  const updatedAt = fmtDate(p.updatedAt);
  const lastLogin = fmtDate(p.lastLogin);
  const lastRevisionDate = fmtDate(p.lastRevisionDate);

  // Follow/unfollow using subcollections + count (same pattern as PostCard likes)
  const handleFollow = async () => {
    if (!currentUserId || !profileUserId || currentUserId === profileUserId) return;

    const followersRef = doc(db, "user", profileUserId, "followers", currentUserId);
    const followingRef = doc(db, "user", currentUserId, "following", profileUserId);
    const profileUserRef = doc(db, "user", profileUserId);
    const currentUserRef = doc(db, "user", currentUserId);

    try {
      if (isFollowing) {
        await deleteDoc(followersRef);
        await deleteDoc(followingRef);
        await updateDoc(profileUserRef, { followersCount: increment(-1) });
        const curSnap = await getDoc(currentUserRef);
        if (curSnap.exists()) await updateDoc(currentUserRef, { followingCount: increment(-1) });
        setIsFollowing(false);
        setFollowersCount((prev) => Math.max(0, prev - 1));
      } else {
        await setDoc(followersRef, { userId: currentUserId, createdAt: new Date() });
        await setDoc(followingRef, { userId: profileUserId, createdAt: new Date() });
        await updateDoc(profileUserRef, { followersCount: increment(1) });
        const curSnap = await getDoc(currentUserRef);
        if (curSnap.exists()) {
          await updateDoc(currentUserRef, { followingCount: increment(1) });
        } else {
          await setDoc(currentUserRef, { followingCount: 1 }, { merge: true });
        }
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
        // Refresh current user meta in localStorage so other UI shows updated followingCount
        try {
          const updatedCurSnap = await getDoc(currentUserRef);
          if (updatedCurSnap.exists()) {
            const updatedCurData = updatedCurSnap.data();
            try {
              localStorage.setItem("usermeta", JSON.stringify(updatedCurData));
            } catch (e) {
              console.warn("Could not persist usermeta to localStorage", e);
            }
          }
        } catch (e) {
          console.warn("Failed to refresh current user meta after follow toggle", e);
        }
    } catch (e) {
      console.error("Error toggling follow", e);
    }
  };

  const isOwnProfile = currentUserId === profileUserId;
  return (
    <div className={`${bg} min-h-screen`}>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pb-24">
        {/* Top header: avatar + name + actions */}
        <header className={`sticky top-0 z-10 ${bg} py-3`}> {/* subtle sticky header */}
          <div className={`border ${card} rounded-xl p-4`}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img src={avatar} alt="avatar" className="h-24 w-24 rounded-full object-cover" />

              <div className="flex-1">
                {/* Line 1: name + verified + role + status */}
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className={`text-xl font-semibold ${textPri}`}>{fullName}</h1>
                  {p.isVerified ? (
                    <FaCheckCircle className="text-emerald-500" title="Verified" />
                  ) : null}
                  {p.role ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      {p.role}
                    </span>
                  ) : null}
                  {p.status ? (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "active" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                      }`}
                    >
                      {p.status}
                    </span>
                  ) : null}
                </div>

                {/* Line 2: username & plan */}
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={`text-sm ${textSec}`}>@{username}</span>
                  {p.subscriptionPlan ? (
                    <span className="text-xs px-2 py-0.5 rounded border border-neutral-300/50 dark:border-neutral-700/80">
                      {p.subscriptionPlan}
                    </span>
                  ) : null}
                </div>

                {/* Line 3: stats */}
                <div className="mt-3 flex items-center gap-8">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className={`text-base font-semibold ${textPri}`}>{s.value}</div>
                      <div className={`text-xs ${textSec}`}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Actions (Instagram‑like) */}
                <div className="mt-3 flex items-center gap-2">
                  {!isOwnProfile && (
                    <button
                      onClick={handleFollow}
                      className={`px-3 py-1.5 text-sm rounded-md border ${
                        isFollowing
                          ? "border-neutral-300/60 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-800"
                          : "border-neutral-300/60 dark:border-neutral-700/80 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-sm rounded-md border border-neutral-300/60 dark:border-neutral-700/80 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    Message
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-md border border-neutral-300/60 dark:border-neutral-700/80 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    More
                  </button>
                </div>
              </div>
            </div>

            {/* Bio & education */}
            <div className="mt-4">
              {p.bio ? <p className={`text-sm ${textPri}`}>{p.bio}</p> : null}
              {education ? <p className={`text-sm ${textSec} mt-1`}>{education}</p> : null}
              {p.academicYear ? (
                <p className={`text-xs ${textSec} mt-0.5`}>Academic Year: {p.academicYear}</p>
              ) : null}
            </div>

            {/* Quick chips: favorite topics & communities */}
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.isArray(p.favoriteTopics) && p.favoriteTopics.length > 0 && (
                p.favoriteTopics.slice(0, 8).map((t, i) => (
                  <span
                    key={`fav-${i}`}
                    className="text-xs px-2 py-1 rounded-full border border-neutral-300/60 dark:border-neutral-700/80"
                  >
                    #{t}
                  </span>
                ))
              )}
              {Array.isArray(p.joinedCommunities) && p.joinedCommunities.length > 0 && (
                p.joinedCommunities.slice(0, 6).map((c, i) => (
                  <span
                    key={`comm-${i}`}
                    className="text-xs px-2 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800/70"
                  >
                    {c}
                  </span>
                ))
              )}
            </div>
          </div>
        </header>

        {/* Tab bar */}
        <nav className="mt-4">
          <div className={`grid grid-cols-3 border ${card} rounded-xl overflow-hidden`}>
            {[
              { id: "posts", label: "Posts" },
              { id: "achievements", label: "Achievements" },
              { id: "activity", label: "Activity" },
            ].map((t) => (
              <button
                key={t.id}
                className={`py-2 text-sm ${tab === t.id ? "font-semibold" : "font-normal"} ${
                  dark ? (tab === t.id ? "text-neutral-100" : "text-neutral-400") : (tab === t.id ? "text-neutral-900" : "text-neutral-600")
                }`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <section className="mt-4">
          {/* Posts grid (placeholder if none) */}
          {tab === "posts" && (
            <div className={`border ${card} rounded-xl p-4`}>
              {p.postsCount > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {/* Replace placeholders with your post thumbnails when available */}
                  {Array.from({ length: Math.min(p.postsCount, 9) }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md bg-neutral-200/60 dark:bg-neutral-800"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className={`text-sm ${textSec}`}>No posts yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Achievements */}
          {tab === "achievements" && (
            <div className={`border ${card} rounded-xl p-4`}>
              {Array.isArray(p.badges) && p.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {p.badges.map((b, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              ) : null}

              {Array.isArray(p.achievements) && p.achievements.length > 0 ? (
                <ul className="mt-4 list-disc pl-5 space-y-1">
                  {p.achievements.map((ach, i) => (
                    <li key={i} className={`text-sm ${textSec}`}>
                      {ach}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10">
                  <p className={`text-sm ${textSec}`}>No achievements yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Activity */}
          {tab === "activity" && (
            <div className={`border ${card} rounded-xl p-4 space-y-4`}>
              {Array.isArray(p.recentActivity) && p.recentActivity.length > 0 ? (
                p.recentActivity.slice(0, 10).map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-neutral-200/60 dark:bg-neutral-800" />
                    <div>
                      <p className={`text-sm ${textPri}`}>{act}</p>
                      {/* Optional: add a timestamp field per activity if you store it */}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className={`text-sm ${textSec}`}>No recent activity.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Insights & About (collapsible sections) */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Learning & AI Insights */}
          <details className={`border ${card} rounded-xl p-4`} open>
            <summary className={`cursor-pointer text-sm font-semibold ${textPri}`}>Study & AI Insights</summary>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Info label="Total XP" value={p.totalXP} textPri={textPri} textSec={textSec} />
              <Info label="Level" value={p.level} textPri={textPri} textSec={textSec} />
              <Info label="Streak Days" value={p.streakDays} textPri={textPri} textSec={textSec} />
              <Info label="Quizzes Taken" value={p.quizzesTaken} textPri={textPri} textSec={textSec} />
              <Info label="Avg. Score" value={p.averageScore} suffix={typeof p.averageScore === 'number' ? '%' : ''} textPri={textPri} textSec={textSec} />
              <Info label="Weak Areas" value={Array.isArray(p.weakAreas) ? p.weakAreas.join(', ') : p.weakAreas} textPri={textPri} textSec={textSec} />
              <Info label="Last Revision" value={lastRevisionDate} textPri={textPri} textSec={textSec} />
              <Info label="Revision Interval" value={p.revisionInterval} suffix={p.revisionInterval ? ' days' : ''} textPri={textPri} textSec={textSec} />
              <Info label="Preferred Language" value={p.preferredLanguage} textPri={textPri} textSec={textSec} />
              <Info label="AI Persona" value={p.aiPersona} textPri={textPri} textSec={textSec} />
              <Info label="Saved AI Responses" value={safeCount(p.savedAIResponses)} textPri={textPri} textSec={textSec} />
              <Info label="AI Tests" value={safeCount(p.aiGeneratedTests)} textPri={textPri} textSec={textSec} />
              <Info label="Offline Notes" value={safeCount(p.offlineNotes)} textPri={textPri} textSec={textSec} />
              <Info label="Difficulty" value={p.difficultyPreference} textPri={textPri} textSec={textSec} />
              <Info label="Last AI Interaction" value={fmtDate(p.lastActiveAIInteraction)} textPri={textPri} textSec={textSec} />
            </div>
          </details>

          {/* About & System */}
          <details className={`border ${card} rounded-xl p-4`}>
            <summary className={`cursor-pointer text-sm font-semibold ${textPri}`}>About & System</summary>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Info label="First Name" value={p.firstName} textPri={textPri} textSec={textSec} />
              <Info label="Last Name" value={p.lastName} textPri={textPri} textSec={textSec} />
              <Info label="Phone" value={p.phoneNumber} textPri={textPri} textSec={textSec} />
              <Info label="DOB" value={fmtDate(p.dateOfBirth)} textPri={textPri} textSec={textSec} />
              <Info label="Gender" value={p.gender} textPri={textPri} textSec={textSec} />
              <Info label="Language" value={p.preferredLanguage} textPri={textPri} textSec={textSec} />
              <Info label="Created" value={createdAt} textPri={textPri} textSec={textSec} />
              <Info label="Updated" value={updatedAt} textPri={textPri} textSec={textSec} />
              <Info label="Last Login" value={lastLogin} textPri={textPri} textSec={textSec} />
              <Info label="Device" value={typeof p.deviceInfo === 'string' ? p.deviceInfo : (p.deviceInfo?.device || p.deviceInfo?.os || null)} textPri={textPri} textSec={textSec} />
              <Info label="Connected Accounts" value={safeCount(p.connectedAccounts)} textPri={textPri} textSec={textSec} />

              {/* Notification prefs */}
              {p.notificationPreferences && (
                <div className="col-span-2 mt-1">
                  <p className={`text-xs ${textSec} mb-1`}>Notifications</p>
                  <div className="grid grid-cols-3 gap-2">
                    <BadgeKV label="Study" value={p.notificationPreferences.studyReminders} />
                    <BadgeKV label="Mentions" value={p.notificationPreferences.communityMentions} />
                    <BadgeKV label="AI Updates" value={p.notificationPreferences.AIUpdates} />
                  </div>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

function Info({ label, value, suffix = "", textPri = "", textSec = "" }) {
  const display =
    value === 0 || value === false || (Array.isArray(value) && value.length === 0)
      ? String(value)
      : value || "—";
  return (
    <div>
      <div className={`text-xs ${textSec}`}>{label}</div>
      <div className={`text-sm ${textPri}`}>{display}{display !== "—" ? suffix : ""}</div>
    </div>
  );
}

function BadgeKV({ label, value }) {
  const on = value === true || value === "on" || value === 1;
  const off = value === false || value === "off" || value === 0;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs border ${
        on
          ? "bg-emerald-600 text-white border-emerald-600"
          : off
          ? "bg-neutral-200/70 text-neutral-700 border-neutral-300"
          : "bg-neutral-100 text-neutral-600 border-neutral-200"
      }`}
      title={String(value)}
    >
      {label}
    </span>
  );
}

export default Profile;
