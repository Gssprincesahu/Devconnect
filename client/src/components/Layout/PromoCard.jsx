import React from "react";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export default function PromoCard() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl p-4 shadow-lg shadow-indigo-900/10 relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-200 border border-white/15 shrink-0">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-xs text-white">
            <span>DevConnect AI</span>
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
          </div>
          <p className="text-[11px] text-indigo-200/90 mt-0.5 leading-snug">
            Get instant assistance on code & architecture questions.
          </p>
        </div>
      </div>

      <button 
        onClick={() => alert("DevConnect AI Assistant is coming soon!")}
        className="mt-3.5 w-full py-2 px-3 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs"
      >
        <span>Ask AI Assistant</span>
        <ArrowRight className="w-3.5 h-3.5 text-indigo-200" />
      </button>
    </div>
  );
}
