import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Auth.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white grid place-items-center text-sm font-semibold">
            AI
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            CollabStudy
          </span>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search topics or questions..."
          className="hidden sm:block w-72 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                {user.email}
              </span>
              <button className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
