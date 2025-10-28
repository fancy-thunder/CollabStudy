import React from "react";
import { useState } from "react";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
import { sendOTP, setupRecaptcha } from "../../firebase";
import { useContext } from "react";
import AuthContext from "../../context/Auth.jsx";
import { useNavigate } from "react-router-dom";


const SignIn = () => {


  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);

  const navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault()
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      console.log(credentials)

      setUser(credentials.user);

      localStorage.setItem("user", JSON.stringify(credentials.user));

      // setCookie("token", credentials.user.accessToken);

      navigate("/dashboard");
      console.log("Logged in")
    } catch (error) {
      console.log("Check your credentials again")
    }
  }

  // 🔹 Send OTP
  const handleSendOTP = async () => {
    if (!phone.startsWith("+")) {
      alert("Please include country code (e.g. +1)");
      return;
    }

    setupRecaptcha("recaptcha-container");
    try {
      const confirmationResult = await sendOTP(phone);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert("OTP sent!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Phone number verified: " + user.phoneNumber);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      setCookie("token", user.accessToken);
      navigate("/dashboard");
      console.log("Google sign-in successful:", user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      setCookie("token", user.accessToken);
      navigate("/dashboard");

      
      console.log("GitHub sign-in successful:", user);
    } catch (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Marketing */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-purple-50 to-violet-50 items-center justify-center p-12">
        <div className="max-w-lg">
          {/* Placeholder for classroom image */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center">
              <svg className="w-24 h-24 text-purple-600 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Learn Smarter, Together.</h2>
          <p className="text-lg text-gray-600">AI-powered learning that adapts to your needs</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">CollabStudy</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Link to="/signup" className="flex-1 py-3 text-center text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors">
              Sign Up
            </Link>
            <Link to="/login" className="flex-1 py-3 text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl">
              Login
            </Link>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input 
                  onChange={(e) => handleEmail(e)}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input 
                  onChange={(e) => handlePassword(e)}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-violet-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;