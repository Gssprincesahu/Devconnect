import React, { useEffect, useState } from "react";
import { initialArticles } from "../../data/mockData";
import ArticleDetail from "./ArticleDetail";
import { Search, Filter, BookOpen, Clock, Calendar, Heart, Bookmark, ArrowRight, Sparkles, User } from "lucide-react";

export default function Article({ currentUser, onSelectArticle, activeArticle, setActiveArticle }) {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "DSA",
    "Web Development",
    "AI/ML",
    "System Design",
    "Career",
    "Interview Experience"
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles([...initialArticles, ...stored]);
  }, []);

  // Filter articles based on search & category
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.subtitle && art.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (art.author?.name && art.author.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Featured article (first item in array)
  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  if (activeArticle) {
    return (
      <ArticleDetail
        article={activeArticle}
        onBack={() => setActiveArticle(null)}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Developer Knowledge Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learn From Experience
          </h2>
          <p className="text-sm text-slate-500 font-normal leading-relaxed">
            Practical knowledge, interview experiences, and lessons from developers in the industry.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or author..."
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

      {/* Featured Article Card */}
      {featuredArticle && searchQuery === "" && selectedCategory === "All" && (
        <section className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Featured Article
          </span>
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 h-64 sm:h-80 overflow-hidden relative">
              <img
                src={featuredArticle.cover}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {featuredArticle.category}
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author?.avatar}
                    alt={featuredArticle.author?.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-100"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{featuredArticle.author?.name}</div>
                    <div className="text-[11px] text-slate-500">{featuredArticle.author?.role}</div>
                  </div>
                </div>

                <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Post</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            All Articles ({filteredArticles.length})
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No articles found</h3>
            <p className="text-xs text-slate-500">Try searching for another topic or resetting category filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchQuery !== "" || selectedCategory !== "All" ? filteredArticles : regularArticles).map((art) => (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Cover */}
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={art.cover || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {art.category || "General"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.subtitle || art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={art.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt={art.author?.name || "Author"}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="truncate font-semibold text-slate-700">{art.author?.name || "DevConnect Member"}</span>
                    </div>
                    <span className="flex items-center gap-1 shrink-0 text-[11px] font-medium text-slate-400">
                      <Clock className="w-3 h-3" />
                      {art.readTime || "4 min read"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                      {art.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      {art.bookmarks || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
