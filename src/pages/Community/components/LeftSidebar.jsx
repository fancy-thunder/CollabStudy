import { FaHome, FaSearch, FaCompass, FaPlay, FaPaperPlane, FaBell, FaPlusCircle, FaChartBar, FaBars } from "react-icons/fa";

function LeftSidebar(){
    return(
        <aside className="w-64 border-r border-neutral-800 p-4 fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CollabStudy</h1>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaHome className="w-6 h-6" />
            <span className="text-base">Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaSearch className="w-6 h-6" />
            <span className="text-base">Search</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaCompass className="w-6 h-6" />
            <span className="text-base">Explore</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaPlay className="w-6 h-6" />
            <span className="text-base">Reels</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors relative">
            <FaPaperPlane className="w-6 h-6" />
            <span className="text-base">Messages</span>
            <span className="absolute left-6 top-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBell className="w-6 h-6" />
            <span className="text-base">Notifications</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaPlusCircle className="w-6 h-6" />
            <span className="text-base">Create</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaChartBar className="w-6 h-6" />
            <span className="text-base">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
            <span className="text-base">Profile</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <FaBars className="w-6 h-6" />
            <span className="text-base">More</span>
          </a>
        </nav>
      </aside>
    )
}


export default LeftSidebar