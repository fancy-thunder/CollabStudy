import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStatus("loading");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User:", userCredential.user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: userCredential.user.uid,
          })
        );
        setStatus("success");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate(`/form/${userCredential.user.uid}`);
      })
      .catch(() => {
        setStatus("error");
      });
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm">
          {/* Title */}
          <div className="text-center mb-2">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Create your account
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Join and start learning today
            </p>
          </div>

          {/* Status */}
          {status === "success" && (
            <div className="mb-4 text-sm rounded-lg px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900">
              Account created
            </div>
          )}
          {status === "error" && (
            <div className="mb-4 text-sm rounded-lg px-3 py-2 bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-900">
              Something went wrong
            </div>
          )}
          {status === "loading" && (
            <div className="mb-4 text-sm rounded-lg px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-900">
              Loading…
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1.5"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1.5"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                autoComplete="new-password"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              // purely visual; still submits; we are not changing your logic
              disabled={status === "loading"}
            >
              {status === "loading" ? "Creating..." : "Sign up"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign in
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

export default SignUp;
