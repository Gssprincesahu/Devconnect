import React, { useState } from "react";
import { ArrowLeft, Heart, Bookmark, Share2, Clock, Calendar, MessageSquare, Send, Check } from "lucide-react";

export default function ArticleDetail({ article, onBack, currentUser }) {
  if (!article) return null;

  const [likes, setLikes] = useState(article.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [bookmarks, setBookmarks] = useState(article.bookmarks || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState(article.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [copiedShare, setCopiedShare] = useState(false);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks - 1);
      setIsBookmarked(false);
    } else {
      setBookmarks(bookmarks + 1);
      setIsBookmarked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: "c-" + Date.now(),
      user: currentUser?.user_name || "Guest Developer",
      avatar: currentUser?.user_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      text: newCommentText.trim(),
      date: "Just now"
    };

    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  // Helper renderer for markdown-like body sections
  const renderFormattedBody = (bodyText) => {
    if (!bodyText) return null;
    const lines = bodyText.split("\n");

    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-3">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("- ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-700 text-sm leading-relaxed mb-1.5">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote key={idx} className="my-4 p-4 border-l-4 border-indigo-600 bg-indigo-50/50 rounded-r-xl text-slate-700 text-sm italic">
            {line.replace("> ", "")}
          </blockquote>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-3" />;
      }
      return <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </button>

      {/* Main Article Container */}
      <article className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Cover Image */}
        {article.cover && (
          <div className="h-64 sm:h-96 w-full overflow-hidden relative">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category || "Technical"}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                  alt={article.author?.name || "Author"}
                  className="w-11 h-11 rounded-2xl object-cover border border-slate-100"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{article.author?.name || "DevConnect Author"}</div>
                  <div className="text-xs text-slate-500">{article.author?.role || "Software Engineer"}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date || "Recent"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime || "5 min read"}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Action Bar (Likes, Bookmarks, Share) */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLikeToggle}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer
                  ${isLiked 
                    ? "bg-rose-50 text-rose-600 border border-rose-200" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }
                `}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleBookmarkToggle}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer
                  ${isBookmarked 
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }
                `}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : "text-slate-400"}`} />
                <span>{bookmarks}</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-400" />}
              <span>{copiedShare ? "Link Copied!" : "Share"}</span>
            </button>
          </div>

          {/* Formatted Article Body */}
          <div className="prose max-w-none text-slate-800">
            {renderFormattedBody(article.body)}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Tags</div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Discussion Section */}
          <section className="pt-8 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span>Discussion ({comments.length})</span>
              </h3>
            </div>

            {/* Comment Box Input */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Share your feedback or questions on this article..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-2">
              {comments.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={c.avatar}
                        alt={c.user}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-xs font-bold text-slate-900">{c.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{c.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 pl-9 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
