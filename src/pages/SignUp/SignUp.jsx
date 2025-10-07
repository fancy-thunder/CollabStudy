import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const SignUp = () => {
  let [fullName, setFullName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [status, setStatus] = useState("idle");

  // Additional fields
  let [profileImage, setProfileImage] = useState("");
  let [dateOfBirth, setDateOfBirth] = useState("");
  let [gender, setGender] = useState("");
  let [bio, setBio] = useState("");
  let [institutionName, setInstitutionName] = useState("");
  let [degreeOrClass, setDegreeOrClass] = useState("");
  let [fieldOfStudy, setFieldOfStudy] = useState("");
  let [academicYear, setAcademicYear] = useState("");
  let [subjects, setSubjects] = useState([]);
  let [preferredLanguage, setPreferredLanguage] = useState("English");
  let [darkMode, setDarkMode] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStatus("loading")
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
      setDoc(doc(db, "user", user.user.uid), {
        fullName:fullName,
        username:username,
        email:email,
        phone:phone,
        profileImage:profileImage,
        dateOfBirth:dateOfBirth,
        gender:gender,
        bio:bio,
        institutionName:institutionName,
        degreeOrClass:degreeOrClass,
        fieldOfStudy:fieldOfStudy,
        academicYear:academicYear,
        subjects:subjects,
        totalXP: 0,
        level: 1,
        streakDays: 0,
        completedTopics: 0,
        quizzesTaken: 0,
        averageScore: 0,
        weakAreas: [],
        lastRevisionDate: null,
        preferredLanguage:preferredLanguage,
        darkMode,
        notificationPreferences: {
          studyReminders: true,
          communityMentions: true,
          AIUpdates: true,
        },
        revisionInterval: 7,
        aiPersona: "friendly",
        learningGoals: [],
        savedAIResponses: [],
        favoriteTopics: [],
        difficultyPreference: "medium",
        lastActiveAIInteraction: null,
        followers: [],
        following: [],
        postsCount: 0,
        badges: [],
        achievements: [],
        joinedCommunities: [],
        recentActivity: [],
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null,
        deviceInfo: "",
        isVerified: false,
        status: "active",
        connectedAccounts: [],
        subscriptionPlan: "Free",
        studyTimeLogs: [],
        aiGeneratedTests: [],
        offlineNotes: false,
      }).then(() => {
        setStatus("success")
        setFullName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
        setUsername("")
        setProfileImage("")
        setDateOfBirth("")
        setGender("")
        setBio("")
        setInstitutionName("")
        setDegreeOrClass("")
        setFieldOfStudy("")
        setAcademicYear("")
        setSubjects([])
        setPreferredStudyStyle("")
        setPreferredLanguage("English")
        setDarkMode(false)
      }).catch((error) => {
        setStatus("error")
      });
    }).catch((error) => {
      setStatus("error")
      console.log(error);
    });

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F8FA]">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#23263A] mb-6">
          Create Your Account
        </h2>

        {
          status == "success" && <p>Account Created</p>
        }
        {
          status == "error" && <p>Something Went wrong</p>
        }
        {
          status == "loading" && <p>loading....</p>
        }


        {/* Sign Up Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="johndoe123"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 234 567 890"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#23263A] mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-[#23263A] mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profileImage"
              name="profileImage"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setProfileImage(e.target.value)}
              value={profileImage}
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#23263A] mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
          </div>
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-[#23263A] mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-[#23263A] mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          {/* Institution Name */}
          <div>
            <label htmlFor="institutionName" className="block text-sm font-medium text-[#23263A] mb-1">
              Institution Name
            </label>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              placeholder="Your School/College"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setInstitutionName(e.target.value)}
              value={institutionName}
            />
          </div>
          {/* Preferred Language */}
          <div>
            <label htmlFor="preferredLanguage" className="block text-sm font-medium text-[#23263A] mb-1">
              Preferred Language
            </label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-[#6C5DD3] bg-[#F7F8FA] text-[#23263A]"
              onChange={(e) => setPreferredLanguage(e.target.value)}
              value={preferredLanguage}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Dark Mode */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="h-4 w-4 text-[#6C5DD3] border-gray-300 rounded focus:ring-[#6C5DD3]"
            />
            <label htmlFor="darkMode" className="ml-2 text-sm font-medium text-[#23263A]">
              Enable Dark Mode
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#6C5DD3] text-white font-semibold rounded-lg shadow-md hover:bg-[#5a4bcf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C5DD3]"
          >
            Sign Up
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-[#23263A]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6C5DD3] hover:text-[#5a4bcf] font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
