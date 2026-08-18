import React from "react";
import { Code2, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function RoleModal({ setRole }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo Branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/25">
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome to DevConnect
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Select your entry portal to access the developer network
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="space-y-3 pt-2">
          {/* Student Option */}
          <button
            onClick={() => setRole("student")}
            className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30 transition-all duration-200 flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Student / Learner Login
                </div>
                <div className="text-[11px] text-slate-500">Explore articles & connect with mentors</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Mentor Option */}
          <button
            onClick={() => setRole("mentor")}
            className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/30 transition-all duration-200 flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Mentor Login & Register
                </div>
                <div className="text-[11px] text-slate-500">Guide developers & publish articles</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Quick Demo Credentials Footer */}
        <div className="pt-2 text-center border-t border-slate-100 text-[11px] text-slate-400">
          Student demo login: <span className="font-semibold text-slate-600">student</span> / <span className="font-semibold text-slate-600">123456</span>
        </div>
      </div>
    </div>
  );
}