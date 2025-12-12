import React from "react";
import { useState, useContext } from "react";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
import { sendOTP, setupRecaptcha } from "../../firebase";
import AuthContext from "../../context/Auth.jsx";
import {toast} from 'react-toastify';


const SignIn = () => {
  const { setUserEmail, setIsLoggedIn } = useContext(AuthContext);
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
      if(credentials){
        setIsLoggedIn(true)
        setUserEmail(credentials.user.email);
        toast.success("Logged in successfully")
        localStorage.setItem("user", JSON.stringify(credentials.user));
        navigate(`/profile/${credentials.user.uid}`);
        console.log("Logged in")
      } else {
        setIsLoggedIn(false)
        setUserEmail(null)
        console.log("Check your credentials again")
      }
    } catch (error) {
      console.error("Login error:", error.message);
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm">
          {/* Heading */}
          <div className="text-center mb-2">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Welcome back
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Sign in to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1.5"
              >
                Email
              </label>
              <input
                onChange={(e) => handleEmail(e)}
                type="text"
                id="email"
                name="email"
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1.5"
              >
                Password
              </label>
              <input
                onChange={(e) => handlePassword(e)}
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-neutral-300 dark:border-neutral-600 rounded focus:ring-indigo-500"
                />
                <span className="text-neutral-600 dark:text-neutral-400">Remember me</span>
              </label>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-neutral-200 dark:bg-neutral-800"></div>
            <span className="px-3 text-sm text-neutral-500">or</span>
            <div className="flex-grow h-px bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm text-neutral-800 dark:text-neutral-200">Continue with Google</span>
            </button>
            <button
              onClick={handleGithubSignIn}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <img
                src="https://www.svgrepo.com/show/349375/github.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
              <span className="text-sm text-neutral-800 dark:text-neutral-200">Continue with GitHub</span>
            </button>
          </div>

          {/* Sign up */}
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Tiny meta */}
        <p className="mt-4 text-center text-[11px] text-neutral-500 dark:text-neutral-500">
          By continuing, you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
