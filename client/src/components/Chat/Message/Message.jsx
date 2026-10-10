import React, { useEffect, useRef } from "react";
import { Check, CheckCheck, MessageSquare } from "lucide-react";

export default function Message({ messages, currentUser, activeConversation }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 my-auto">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-slate-900">No messages yet</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Start the conversation with {activeConversation || "this mentor"}. Ask questions about code, architecture, or career roadmaps.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-4">
      {messages.map((m, index) => {
        const isMe = currentUser && (m.sender === currentUser || m.user_name === currentUser);
        return (
          <div
            key={index}
            className={`flex items-end gap-2.5 ${isMe ? "justify-end" : "justify-start"}`}
          >
            {/* Recipient Avatar */}
            {!isMe && (
              <div className="shrink-0 mb-1">
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    alt={m.sender || m.user_name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {(m.sender || m.user_name)?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            )}

            {/* Bubble Container */}
            <div
              className={`
                max-w-[80%] sm:max-w-[70%] p-3.5 space-y-1 shadow-soft transition-all
                ${isMe
                  ? "bg-indigo-600 text-white rounded-2xl rounded-br-xs"
                  : "bg-white text-slate-900 border border-slate-200/80 rounded-2xl rounded-bl-xs"
                }
              `}
            >
              {/* User Name (if recipient) */}
              {!isMe && (
                <div className="text-[11px] font-bold text-slate-500">
                  {m.sender || m.user_name}
                </div>
              )}

              {/* Text content */}
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words font-normal">
                {m.message_text}
              </div>

              {/* Timestamp & Status */}
              <div className={`flex items-center justify-end gap-1 text-[10px] ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                <span>{m.timestamp || "Just now"}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-indigo-200" />}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
