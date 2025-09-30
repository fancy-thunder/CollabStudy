import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth.jsx";
const Navbar = () => {
  const { user } = useContext(AuthContext);


  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          AI
        </span>
        <span className="font-semibold text-lg text-[#23263A]">CollabStudy</span>
      </div>
      <input
        type="text"
        placeholder="Search topics or questions..."
        className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] bg-white"
      />
      <div className="flex items-center gap-4">
        {
          user ? (
            <>
              <span className="text-[#23263A] font-medium">{user.email}</span>
              <button>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )
        }
      </div>
    </nav>
  );
};

  export default Navbar;
