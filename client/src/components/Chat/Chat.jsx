import React, { useMemo, useState, useEffect } from "react";
import Message from "./Message/Message";
import MessageBox from "./MessageBox/Messagebox";
import usechat from "./usechat";
import { initialConversations } from "../../data/mockData";
import { Search, ArrowLeft, ShieldCheck, Circle, Phone, Video, Info, UserPlus, Sparkles } from "lucide-react";

export default function Chat({ CurrentuserData, selectedChatRecipient, setSelectedChatRecipient }) {
  const { messages, sendMessage, isConnected } = usechat(CurrentuserData?.user_name);
  const [searchFilter, setSearchFilter] = useState("");
  const [activeUser, setActiveUser] = useState(selectedChatRecipient || "Rahul Sharma");
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Sync selected recipient when passed from external triggers (e.g. Mentor card Message button)
  useEffect(() => {
    if (selectedChatRecipient) {
      setActiveUser(selectedChatRecipient);
      setShowMobileChat(true);
    }
  }, [selectedChatRecipient]);

  // Derive conversation list by merging initialConversations, user messages, and active user
  const conversationList = useMemo(() => {
    const map = new Map();

    // Add default initial mock conversations
    initialConversations.forEach(c => {
      map.set(c.user_name, {
        user_name: c.user_name,
        avatar: c.avatar,
        role: c.role || "DevConnect Member",
        online: c.online ?? true,
        lastMessage: c.lastMessage,
        timestamp: c.timestamp,
        unreadCount: c.unreadCount || 0
      });
    });

    // Process socket/history messages
    messages.forEach(m => {
      const otherPerson = m.sender === CurrentuserData?.user_name ? m.recipient : m.sender || m.user_name;
      if (otherPerson && otherPerson !== CurrentuserData?.user_name) {
        const existing = map.get(otherPerson) || {};
        map.set(otherPerson, {
          ...existing,
          user_name: otherPerson,
          avatar: m.avatar || existing.avatar,
          role: existing.role || "DevConnect Member",
          online: true,
          lastMessage: m.message_text,
          timestamp: m.timestamp || "Just now"
        });
      }
    });

    // Ensure currently selected recipient exists in conversation list
    if (activeUser && !map.has(activeUser) && activeUser !== CurrentuserData?.user_name) {
      map.set(activeUser, {
        user_name: activeUser,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        role: "DevConnect Mentor",
        online: true,
        lastMessage: "Say hello to start the conversation!",
        timestamp: "Just now",
        unreadCount: 0
      });
    }

    return Array.from(map.values());
  }, [messages, CurrentuserData, activeUser]);

  // Filter conversations
  const filteredConversations = conversationList.filter(c =>
    c.user_name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Active chat details
  const activeConversationObj = conversationList.find(c => c.user_name === activeUser) || {
    user_name: activeUser || "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    role: "Software Engineer @ Microsoft",
    online: true
  };

  // Filter messages for active chat session
  const activeMessages = useMemo(() => {
    return messages.filter(
      m => (m.sender === CurrentuserData?.user_name && m.recipient === activeUser) ||
        (m.sender === activeUser && m.recipient === CurrentuserData?.user_name) ||
        (!m.sender && (m.user_name === activeUser || m.user_name === CurrentuserData?.user_name))
    );
  }, [messages, activeUser, CurrentuserData]);

  const selectConversation = (name) => {
    setActiveUser(name);
    if (setSelectedChatRecipient) setSelectedChatRecipient(name);
    setShowMobileChat(true);
  };

  if (!CurrentuserData) return null;

  return (
    <div className="h-[calc(100vh-5rem)] bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: Conversations List */}
      <aside className={`
        w-full md:w-80 lg:w-96 bg-slate-50/60 border-r border-slate-200/80 flex flex-col shrink-0
        ${showMobileChat ? "hidden md:flex" : "flex"}
      `}>
        {/* Header & Search */}
        <div className="p-4 space-y-3 border-b border-slate-200/80 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Messages</h2>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isConnected ? "Connected" : "Live"}</span>
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No conversations found.
            </div>
          ) : (
            filteredConversations.map((c) => {
              const isSelected = activeUser === c.user_name;
              return (
                <button
                  key={c.user_name}
                  onClick={() => selectConversation(c.user_name)}
                  className={`
                    w-full flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 text-left cursor-pointer
                    ${isSelected
                      ? "bg-white text-slate-900 shadow-soft border border-slate-200/80 font-semibold"
                      : "hover:bg-slate-200/50 text-slate-700"
                    }
                  `}
                >
                  <div className="relative shrink-0">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        alt={c.user_name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                        {c.user_name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    {c.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">{c.user_name}</span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                      {c.lastMessage || "Click to open chat"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT COLUMN: Active Chat Panel */}
      <main className={`
        flex-1 flex flex-col bg-white
        ${!showMobileChat ? "hidden md:flex" : "flex"}
      `}>
        {/* Chat Header */}
        <header className="h-16 px-6 border-b border-slate-200/80 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Back Button */}
            <button
              onClick={() => setShowMobileChat(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              {activeConversationObj.avatar ? (
                <img
                  src={activeConversationObj.avatar}
                  alt={activeConversationObj.user_name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                  {activeConversationObj.user_name?.charAt(0)?.toUpperCase()}
                </div>
              )}
              {activeConversationObj.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">{activeConversationObj.user_name}</h3>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{activeConversationObj.role || "DevConnect Member"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Audio call feature available in upcoming release")}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert("Video call feature available in upcoming release")}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages Stream */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">
          <Message
            messages={activeMessages}
            currentUser={CurrentuserData?.user_name}
            activeConversation={activeUser}
          />
        </section>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200/80 shrink-0">
          <MessageBox
            userData={CurrentuserData}
            recipient={activeUser}
            sendMessage={(msg) => sendMessage(msg)}
          />
        </div>
      </main>
    </div>
  );
}
