import React, { useState } from "react";

// Google icon
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
    <g>
      <circle fill="#fff" cx="24" cy="24" r="24" />
      <path
        fill="#4285F4"
        d="M35.5 24.1c0-1.1-.1-2.2-.3-3.2H24v6.1h6.5c-.3 1.7-1.4 3.1-2.9 4v3.3h4.7c2.7-2.5 4.2-6.2 4.2-10.2z"
      />
      <path
        fill="#34A853"
        d="M24 38c3.6 0 6.6-1.2 8.8-3.2l-4.7-3.3c-1.3.9-2.9 1.5-4.1 1.5-3.2 0-5.9-2.2-6.8-5.1h-4.8v3.2C10.9 34.8 17 38 24 38z"
      />
      <path
        fill="#FBBC05"
        d="M17.2 28.9c-.3-.9-.5-1.8-.5-2.9s.2-2 .5-2.9v-3.2h-4.8C10.5 22.8 10 23.9 10 25c0 1.1.5 2.2 1.4 3.2l4.8-3.3z"
      />
      <path
        fill="#EA4335"
        d="M24 17.9c1.8 0 3.4.6 4.7 1.7l3.5-3.5C30.6 14.2 27.6 13 24 13c-7 0-13.1 3.2-16.1 8.1l4.8 3.3c.9-2.9 3.6-5.1 6.8-5.1z"
      />
    </g>
  </svg>
);

// Phone icon
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
    <g>
      <circle fill="#fff" cx="12" cy="12" r="12" />
      <path
        fill="#059669"
        d="M17.7 15.1l-2.2-.5c-.3-.1-.7 0-.9.2l-1.1 1.1c-2-.9-3.6-2.5-4.5-4.5l1.1-1.1c.2-.2.3-.6.2-.9l-.5-2.2c-.1-.4-.5-.7-.9-.7H6.3c-.5 0-.9.4-.9.9 0 5.2 4.2 9.4 9.4 9.4.5 0 .9-.4.9-.9v-2.1c0-.4-.3-.8-.7-.9z"
      />
    </g>
  </svg>
);

const Login = () => {
  const [input, setInput] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic
  };

  const handleGoogleSignIn = () => {
    // TODO: Add Google sign-in logic
  };

  const handlePhoneSignIn = () => {
    // TODO: Add phone sign-in logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] max-w-sm w-full">
        <h2 className="text-center mb-6 text-gray-800 text-2xl font-semibold">
          CollabStudy
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Phone Number"
            value={input.identifier}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md font-bold cursor-pointer hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <div className="flex flex-col gap-3 mt-6">
          <button
            type="button"
            className="flex items-center justify-center bg-white text-blue-700 border border-blue-600 p-2 rounded-md font-semibold cursor-pointer hover:bg-blue-50 transition"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            Sign in with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center bg-white text-green-600 border border-green-600 p-2 rounded-md font-semibold cursor-pointer hover:bg-green-50 transition"
            onClick={handlePhoneSignIn}
          >
            <PhoneIcon />
            Sign in with Phone Number
          </button>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            onClick={() => {
              // TODO: Add forgot password logic
            }}
          >
            Forgot password?
          </button>
          <div className="text-sm text-gray-600">
            New user?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline focus:outline-none"
              onClick={() => {
                // TODO: Add create account logic
              }}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
