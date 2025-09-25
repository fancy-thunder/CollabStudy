import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
const SignUp = () => {
  let [fullName, setFullName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [status, setStatus] = useState("idle");

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
        fullName: fullName,
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date(),
      }).then(() => {
        setStatus("success")
        setFullName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
        setUsername("")
        
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
          <a
            href="#"
            className="text-[#6C5DD3] hover:text-[#5a4bcf] font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
