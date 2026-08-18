import React from "react";
import { Menu, Search, Code2, Bell } from "lucide-react";

export default function Navbar({ currentView, setIsMobileOpen, userData }) {
  const getPageTitle = () => {
    switch (currentView) {
      case "home":
        return "Dashboard";
      case "mentors":
        return "Mentors Directory";
      case "articles":
        return "Technical Articles";
      case "messages":
        return "Direct Messages";
      default:
        return "DevConnect";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            <Code2 className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Quick actions */}
      <div className="flex items-center gap-3">
        {/* Search Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-500 w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search mentors, topics...</span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-slate-50 border border-slate-200/80">
          {userData?.user_avatar ? (
            <img 
              src={userData.user_avatar} 
              alt={userData.user_name} 
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {userData?.user_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-700 pr-2 hidden xs:inline-block">
            {userData?.user_name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
