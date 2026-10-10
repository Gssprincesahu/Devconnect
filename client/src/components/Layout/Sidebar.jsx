import React from "react";
import { Home, Users, BookOpen, MessageSquare, LogOut, Code2, Sparkles, ShieldCheck, UserRound, Bot } from "lucide-react";
import PromoCard from "./PromoCard";

export default function Sidebar({ currentView, setView, userData, onLogout, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "mentors", label: "Mentors", icon: Users },
    { id: "articles", label: "Articles", icon: BookOpen },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "profile", label: "My Profile", icon: UserRound }
    ,{ id: "assistant", label: "DevGuide AI", icon: Bot }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200/80 
        flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Top: Logo & Navigation */}
        <div className="p-5 flex flex-col gap-6 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-slate-900">
                <span>Dev</span>
                <span className="text-indigo-600">Connect</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Developer Network</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 text-left
                    ${isActive 
                      ? "bg-indigo-50 text-indigo-600 font-semibold shadow-xs border border-indigo-100" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* DevConnect AI Banner */}
          <div className="pt-2">
            <PromoCard />
          </div>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {userData?.user_avatar ? (
                <img 
                  src={userData.user_avatar} 
                  alt={userData.user_name} 
                  className="w-9 h-9 rounded-full object-cover border border-indigo-200 shadow-xs"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {userData?.user_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {userData?.user_name || "Developer"}
                  </span>
                  {userData?.role === "mentor" && (
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 capitalize inline-block">
                  {userData?.role || "Member"}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
