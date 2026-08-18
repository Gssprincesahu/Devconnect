import React, { useState, useEffect } from "react";
import axios from "axios";
import { initialMentors } from "../../data/mockData";
import MentorModal from "./MentorModal";
import { Search, CheckCircle2, Star, MessageSquare, Filter, BookOpen, UserCheck, Sparkles } from "lucide-react";

export default function Mentors({ onStartChatWithUser }) {
  const [mentors, setMentors] = useState(initialMentors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalMentor, setActiveModalMentor] = useState(null);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "AI/ML",
    "Data Science",
    "DevOps",
    "System Design"
  ];

  // Fetch users from existing backend API if available
  useEffect(() => {
    const fetchBackendUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        if (response.data?.success && Array.isArray(response.data.data)) {
          const apiUsers = response.data.data.map(u => ({
            id: u.user_id || u._id,
            name: u.user_name,
            role: "DevConnect Mentor",
            company: "Tech Community",
            avatar: u.user_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
            verified: true,
            rating: 5.0,
            reviewsCount: 12,
            bio: "Registered DevConnect mentor available for guidance and technical discussions.",
            expertise: ["Web Development", "Backend", "Full Stack"],
            category: "Backend",
            articleCount: 3
          }));

          // Merge without duplicate names
          const existingNames = new Set(initialMentors.map(m => m.name.toLowerCase()));
          const uniqueApiUsers = apiUsers.filter(u => !existingNames.has(u.name.toLowerCase()));
          setMentors([...initialMentors, ...uniqueApiUsers]);
        }
      } catch (err) {
        // Fallback gracefully to mock data
        console.log("Using initial mentor dataset.");
      }
    };
    fetchBackendUsers();
  }, []);

  // Filter mentors based on search & category
  const filteredMentors = mentors.filter(m => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory || m.expertise.includes(selectedCategory);
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>1-on-1 Mentorship Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Your Mentor
          </h2>
          <p className="text-sm text-slate-500 font-normal leading-relaxed">
            Learn from developers who have already walked the path you're starting. Get system design advice, code reviews, and career guidance.
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by mentor name, role, company (e.g. Microsoft, React, AWS)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 pr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-xs shadow-indigo-600/30"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Mentor Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing {filteredMentors.length} Mentors
          </span>
        </div>

        {filteredMentors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No mentors found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or selecting a different category filter.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map(m => (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Header: Avatar & Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs"
                      />
                      {m.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {m.name}
                        </h3>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 truncate">{m.role}</p>
                      <span className="text-xs font-bold text-indigo-600">{m.company}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {m.bio}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {m.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-3 pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalMentor(m)}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onStartChatWithUser(m.name)}
                    className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shadow-indigo-600/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mentor Profile Detail Modal */}
      {activeModalMentor && (
        <MentorModal
          mentor={activeModalMentor}
          onClose={() => setActiveModalMentor(null)}
          onStartChat={onStartChatWithUser}
        />
      )}
    </div>
  );
}
