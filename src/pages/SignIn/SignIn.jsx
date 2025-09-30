  import React from "react";
  import { useState } from "react";
  import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../../firebase";

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const SignIn = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function handleLogin(e){
        e.preventDefault()
        try {
          const credentials = await signInWithEmailAndPassword(auth,email,password)
          console.log("Logged in")
        }catch (error) {
          console.log("Check your credentials again")
      }
    }

    const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("GitHub sign-in successful:", user);
    } catch (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };

    const handleEmail = (e) =>{
      setEmail(e.target.value)
    }

    const handlePassword = (e) =>{
      setPassword(e.target.value)
    }

    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            {/* Logo / Heading */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Welcome Back
            </h2>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email/Phone Number
                </label>
                <input onChange={(e)=> handleEmail(e)}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com/+1 234 567 890"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input onChange={(e)=> handlePassword(e)}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </button>
              <button onClick={handleGithubSignIn} className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                <img
                  src="https://www.svgrepo.com/show/349375/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                <span>Continue with GitHub</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                {/* Simple phone icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>Continue with Phone Number</span>
              </button>
            </div>

            {/* Sign up */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </>
    );
  };

  export default SignIn;