import { FaHome, FaSearch, FaCompass, FaPlay, FaPaperPlane, FaBell, FaPlusCircle, FaChartBar, FaBars } from "react-icons/fa";
import {Link} from "react-router-dom";

function LeftSidebar({tabSelected, setTabSelected}){
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return(
        <aside className="w-64 border-r border-neutral-800 p-4 fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CollabStudy</h1>
        </div>

        <nav className="space-y-1">
          <button onClick={() => setTabSelected("Home")} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            style={{
              backgroundColor: tabSelected === "Home" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Home" ? "white" : "gray",
            }}
          >
            <FaHome className="w-6 h-6" />
            <span className="text-base">Home</span>
          </button>
          <button onClick={() => setTabSelected("Search")}  style={{
              backgroundColor: tabSelected === "Search" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Search" ? "white" : "gray",
            }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaSearch className="w-6 h-6" />
            <span className="text-base">Search</span>
          </button>
          <button onClick={() => setTabSelected("Explore")}  style={{
              backgroundColor: tabSelected === "Explore" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Explore" ? "white" : "gray",
            }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaCompass className="w-6 h-6" />
            <span className="text-base">Explore</span>
          </button>
          <button onClick={() => setTabSelected("Reels")}  style={{
              backgroundColor: tabSelected === "Reels" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Reels" ? "white" : "gray",
            }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaPlay className="w-6 h-6" />
            <span className="text-base">Reels</span>
          </button> 
          <button onClick={() => setTabSelected("Messages")}  style={{
              backgroundColor: tabSelected === "Messages" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Messages" ? "white" : "gray",
            }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors relative">
            <FaPaperPlane className="w-6 h-6" />
            <span className="text-base">Messages</span>
            <span className="absolute left-6 top-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
          </button>
          <button onClick={() => setTabSelected("Notifications")} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBell className="w-6 h-6" />
            <span className="text-base">Notifications</span>
          </button>
          <button onClick={() => setTabSelected("Group")} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            style={{
              backgroundColor: tabSelected === "Group" ? "rgba(100, 100, 100, 0.9)" : "transparent",
              color: tabSelected === "Group" ? "white" : "gray",
            }}
          >
            <FaPlusCircle className="w-6 h-6" />
            <span className="text-base">Groups</span>
          </button>
          <button onClick={() => setTabSelected("Dashboard")} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaChartBar className="w-6 h-6" />
            <span className="text-base">Dashboard</span>
          </button>
          <Link to={`/profile/${user.uid || ""}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <span className="text-base">Profile</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBars className="w-6 h-6" />
            <span className="text-base">More</span>
          </a>
        </nav>
      </aside>
    )
}


export default LeftSidebar