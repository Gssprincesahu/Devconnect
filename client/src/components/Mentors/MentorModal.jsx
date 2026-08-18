import React from "react";
import { X, CheckCircle2, Star, MessageSquare, Briefcase, BookOpen, Globe, Code, ShieldCheck, ExternalLink } from "lucide-react";

export default function MentorModal({ mentor, onClose, onStartChat }) {
  if (!mentor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Modal Top Banner */}
        <div className="h-28 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-4 flex items-start justify-end relative">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Content Body */}
        <div className="p-6 pt-0 space-y-6 overflow-y-auto flex-1 -mt-12">
          {/* Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={mentor.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                />
                {mentor.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                  </div>
                )}
              </div>
              <div className="pb-1">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{mentor.name}</span>
                </h3>
                <p className="text-xs font-semibold text-slate-500">{mentor.role}</p>
                <span className="text-xs font-bold text-indigo-600">{mentor.company}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartChat(mentor.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{mentor.rating || 4.9}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{mentor.reviewsCount || 40}+ Reviews</div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>{mentor.articleCount || 5}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Articles</div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">DevConnect Mentor</div>
            </div>
          </div>

          {/* About Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Mentor</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {mentor.bio}
            </p>
          </div>

          {/* Expertise */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-1.5">
              {(mentor.expertise || ["System Design", "Backend", "React"]).map((exp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2 flex items-center gap-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Connect:</span>
            <div className="flex items-center gap-2">
              <a href="#" onClick={e => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors flex items-center gap-1">
                <Code className="w-4 h-4 text-slate-600" />
                <span className="text-[11px] font-medium">GitHub</span>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors flex items-center gap-1">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span className="text-[11px] font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
