import React, { useState } from "react";
import AcademicInformation from "./AcademicInformation.jsx";

const BasicInfo = ({ onNext }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState(null);

  // Handle file upload and preview
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (showAcademicForm) {
    return (
      <AcademicInformation
        onNext={(data) => {
          // You can handle the next step here, e.g., save both forms' data
          // onNext && onNext({ ...basicInfoData, ...data });
        }}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Let’s Get to Know You!
        </h2>
        <form className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Unique handle"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+1 234 567 890"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* Profile Image */}
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              className="w-full"
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full mx-auto"
              />
            )}
          </div>
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="do-not-disclose">Do not wish to disclose</option>
            </select>
          </div>
          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Short about section"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          {/* Next Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setBasicInfoData({
                username,
                phoneNumber,
                profileImage,
                dateOfBirth,
                gender,
                bio,
              });
              setShowAcademicForm(true);
            }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;