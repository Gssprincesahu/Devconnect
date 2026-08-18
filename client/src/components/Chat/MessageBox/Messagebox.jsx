import React, { useState } from "react";
import { Send, Smile, Paperclip, Image as ImageIcon } from "lucide-react";

export default function MessageBox({ userData, sendMessage }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sampleEmojis = ["👍", "🔥", "🚀", "💡", "💻", "🎉", "👏", "❤️"];

  const handleSend = () => {
    if (!message.trim()) return;

    const messageData = {
      user_name: userData.user_name || "Developer",
      avatar: userData.user_avatar,
      message_text: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    sendMessage(messageData);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Emoji Quick Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-2 bg-white rounded-2xl p-3 border border-slate-200 shadow-xl flex items-center gap-2 z-20 animate-fade-in">
          {sampleEmojis.map((e, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addEmoji(e)}
              className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="w-full flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/15 transition-all"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          title="Add Emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => alert("Attachment upload UI feature triggered.")}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          rows={1}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-transparent py-2 px-2 text-xs sm:text-sm text-slate-900 focus:outline-none resize-none leading-normal font-normal"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            p-2.5 rounded-xl font-semibold text-white flex items-center justify-center transition-all cursor-pointer shadow-xs
            ${message.trim() 
              ? "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-600/20" 
              : "bg-slate-300 cursor-not-allowed"
            }
          `}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}