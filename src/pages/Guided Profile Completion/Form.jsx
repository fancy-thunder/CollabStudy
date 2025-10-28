import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import axios from "axios"
const GuidedProfileForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  // const [step, setStep] = useState(1);

  // Form 1: Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  // Form 2: Academic Info
  const [institutionName, setInstitutionName] = useState("");
  const [degreeOrClass, setDegreeOrClass] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [imageUrl, setImageUrl] = useState("")

  const handleProfileImageUpload = async (file) => {
    console.log(file)
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CollabStudy_Profile-Pictures"); // replace with your actual preset
    data.append("cloud_name", "dx1ays0ph"); // optional, for clarity


    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dx1ays0ph/image/upload",
      data
    );
    console.log(res.data.secure_url);

    alert("Uploaded Successfully!");
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const handleFinalSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User UID:", user.uid);
    if (user && user.uid) {
      await setDoc(doc(db, "user", user.uid), {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        gender,
        bio,
        institutionName,
        degreeOrClass,
        fieldOfStudy,
        academicYear,
        profileImage,
        totalXP: null,
        level: null,
        streakDays: null,
        completedTopics: null,
        quizzesTaken: null,
        averageScore: null,
        weakAreas: null,
        lastRevisionDate: null,
        preferredLanguage: null,
        darkMode: null,
        notificationPreferences: {
          studyReminders: null,
          communityMentions: null,
          AIUpdates: null,
        },
        revisionInterval: null,
        aiPersona: null,
        learningGoals: null,
        savedAIResponses: null,
        favoriteTopics: null,
        difficultyPreference: null,
        lastActiveAIInteraction: null,
        followers: null,
        following: null,
        postsCount: null,
        badges: null,
        achievements: null,
        joinedCommunities: null,
        recentActivity: null,
        role: null,
        createdAt: null,
        updatedAt: null,
        lastLogin: null,
        deviceInfo: null,
        isVerified: null,
        status: null,
        connectedAccounts: null,
        subscriptionPlan: null,
        studyTimeLogs: null,
        aiGeneratedTests: null,
        offlineNotes: null,
      }, { merge: true });

      navigate("/profile");
    }
    if (onSubmit) {
      onSubmit({
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        gender,
        bio,
        institutionName,
        degreeOrClass,
        fieldOfStudy,
        academicYear,
        profileImage,
        totalXP: null,
        level: null,
        streakDays: null,
        completedTopics: null,
        quizzesTaken: null,
        averageScore: null,
        weakAreas: null,
        lastRevisionDate: null,
        preferredLanguage: null,
        darkMode: null,
        notificationPreferences: {
          studyReminders: null,
          communityMentions: null,
          AIUpdates: null,
        },
        revisionInterval: null,
        aiPersona: null,
        learningGoals: null,
        savedAIResponses: null,
        favoriteTopics: null,
        difficultyPreference: null,
        lastActiveAIInteraction: null,
        followers: null,
        following: null,
        postsCount: null,
        badges: null,
        achievements: null,
        joinedCommunities: null,
        recentActivity: null,
        role: null,
        createdAt: null,
        updatedAt: null,
        lastLogin: null,
        deviceInfo: null,
        isVerified: null,
        status: null,
        connectedAccounts: null,
        subscriptionPlan: null,
        studyTimeLogs: null,
        aiGeneratedTests: null,
        offlineNotes: null,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-2 text-gray-500">
            <span className={step === 1 ? "font-semibold text-indigo-600" : ""}>Personal Info</span>
            <span className={step === 2 ? "font-semibold text-indigo-600" : ""}>Academic Info</span>
            <span className={step === 3 ? "font-semibold text-indigo-600" : ""}>Profile Picture</span>
          </div>
        </div>
        {/* Form 1: Personal Info */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Complete your profile
            </h2>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+1 234 567 890"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="do-not-disclose">Do not wish to disclose</option>
                </select>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Short about section"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </form>
          </>
        )}
        {/* Form 2: Academic Info */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Academic Information
            </h2>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); setStep(3); }}>
              <div>
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  placeholder="Your School/College"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={institutionName}
                  onChange={e => setInstitutionName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="degreeOrClass" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree or Class
                </label>
                <input
                  type="text"
                  id="degreeOrClass"
                  name="degreeOrClass"
                  placeholder="B.Tech, 12th Grade, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={degreeOrClass}
                  onChange={e => setDegreeOrClass(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  placeholder="Computer Science, Biology, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={fieldOfStudy}
                  onChange={e => setFieldOfStudy(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  placeholder="2nd Year / Semester 3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-1/2 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        )}
        {/* Form 3: Profile Picture */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Add your best picture
            </h2>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); handleFinalSubmit(); }}>
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleProfileImageUpload(e.target.files[0])
                  }}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {
                  imageUrl && <img src={imageUrl} alt="" width={20} height={20} />
                }

              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-1/2 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default GuidedProfileForm;