import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-3">
        {/* Logo with graduation cap icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <span className="font-bold text-xl text-gray-900">CollabStudy</span>
      </div>
      
      {/* Search bar in center */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notes, topics, or ask AI..."
            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>
      
      {/* Right side: Notifications and Profile */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Notification bell */}
            <div className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
            </div>
            
            {/* Profile section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                AS
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">Alex Student</div>
                <div className="text-xs text-gray-500">Level 14</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors">Login</Link>
            <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
