import React from "react";
import { initialMentors, initialArticles, initialConversations } from "../../data/mockData";
import { CheckCircle2, ArrowRight, BookOpen, Users, MessageSquare, Star, Sparkles, Clock, Eye } from "lucide-react";

export default function Home({ userData, setView, onSelectMentor, onSelectArticle, onStartChatWithUser }) {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = userData?.user_name || "Developer";
  const mentors = initialMentors.slice(0, 3);
  const articles = initialArticles.slice(0, 3);
  const conversations = initialConversations.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Welcome to DevConnect Platform</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {getTimeGreeting()}, {displayName} 👋
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Discover mentors, learn from experienced developers, and connect with people building their future in tech.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setView("mentors")}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Find a Mentor</span>
            </button>

            <button
              onClick={() => setView("articles")}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Articles</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">120+</div>
            <div className="text-xs text-slate-400 font-medium">Verified Mentors</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">450+</div>
            <div className="text-xs text-slate-400 font-medium">Technical Articles</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">3.2k</div>
            <div className="text-xs text-slate-400 font-medium">Community Members</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">99.4%</div>
            <div className="text-xs text-slate-400 font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Mentors & Articles Left, Conversations Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recommended Mentors */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Recommended Mentors
                </h3>
                <p className="text-xs text-slate-500">Connect with industry experts for guidance & code reviews</p>
              </div>
              <button
                onClick={() => setView("mentors")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mentors.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header: Avatar & Info */}
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        />
                        {m.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate flex items-center gap-1">
                          {m.name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate font-medium">{m.role}</p>
                        <p className="text-[11px] font-bold text-indigo-600 truncate">{m.company}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {m.bio}
                    </p>

                    {/* Expertise Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.expertise.slice(0, 3).map((exp, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-4 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => onSelectMentor(m)}
                      className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer"
                    >
                      View Mentor
                    </button>
                    <button
                      onClick={() => onStartChatWithUser(m.name)}
                      className="py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Latest Articles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Latest Articles
                </h3>
                <p className="text-xs text-slate-500">Practical knowledge & experiences from top developers</p>
              </div>
              <button
                onClick={() => setView("articles")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover image */}
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={art.cover}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {art.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {art.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="truncate font-medium text-slate-600">{art.author.name}</span>
                    </div>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Recent Conversations Sidebar */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Recent Chats</span>
              </h3>
              <button
                onClick={() => setView("messages")}
                className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Open Messages
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {conversations.map((c, i) => (
                <div
                  key={i}
                  onClick={() => onStartChatWithUser(c.user_name)}
                  className="py-3 first:pt-0 last:pb-0 flex items-center gap-3 hover:bg-slate-50/80 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.avatar}
                      alt={c.user_name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                    />
                    {c.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">{c.user_name}</span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setView("messages")}
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
            >
              Start New Message
            </button>
          </section>

          {/* Quick Platform Quick Links / Info Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900">
              DevConnect Network
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect with top software engineers across Microsoft, Amazon, Google, Adobe & Stripe. Ask for resume feedback or system design guidance.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setView("mentors")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Browse verified mentors</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
