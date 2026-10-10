import React, { useState } from "react";
import { Upload, Sparkles, Check, RotateCcw, FileText, Image as ImageIcon, Tag } from "lucide-react";

export default function CreateArticle({ onPublish, currentUser }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [draftSaved, setDraftSaved] = useState(false);

  const categories = [
    "DSA",
    "Web Development",
    "AI/ML",
    "System Design",
    "Career",
    "Interview Experience"
  ];

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return setCover(null);
    const reader = new FileReader();
    reader.onload = () => setCover(reader.result);
    reader.readAsDataURL(f);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setBody("");
    setCategory("Web Development");
    setTags("");
    setCover(null);
    setIsPublished(false);
    setDraftSaved(false);
  };

  const articlePayload = (status) => ({
    id: "art-user-" + Date.now(), title: title.trim() || "Untitled draft", subtitle: subtitle.trim(), body: body.trim(),
    category: category || "Web Development", tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    cover: cover || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    author: { name: currentUser?.user_name || "Mentor", avatar: currentUser?.user_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", role: "DevConnect Mentor" },
    readTime: Math.max(3, Math.ceil((body.trim().split(/\s+/).filter(Boolean).length || 1) / 150)) + " min read", visibility, status,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), likes: 0, bookmarks: 0, comments: []
  });

  const saveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("article-drafts") || "[]");
    localStorage.setItem("article-drafts", JSON.stringify([articlePayload("draft"), ...drafts]));
    setDraftSaved(true);
  };

  const publish = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please provide both an article title and body content.");
      return;
    }

    const article = articlePayload("published");

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("articles") || "[]");
    existing.unshift(article);
    localStorage.setItem("articles", JSON.stringify(existing));

    if (onPublish) onPublish(article);

    setIsPublished(true);
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mentor Publishing Studio</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create New Article
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Share practical tutorials, interview experiences, and architectural insights with the community.
          </p>
        </div>
      </div>

      {isPublished && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Article published successfully and saved to your community feed!</span>
        </div>
      )}
      {draftSaved && !isPublished && <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm font-semibold">Draft saved locally. You can continue writing or publish when ready.</div>}

      {/* Main Form */}
      <form onSubmit={publish} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-soft space-y-6">
        {/* Title & Subtitle */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Master Low-Level Design in 30 Days"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Short Subtitle / Summary
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              placeholder="A brief overview describing what readers will learn..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Category & Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Visibility</label>
            <select value={visibility} onChange={e => setVisibility(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
              <option>Public</option><option>Followers only</option><option>Unlisted</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="react, system-design, backend"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Cover Image Upload Area */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Cover Header Image
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 transition-colors bg-slate-50/50">
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
            <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-indigo-600">Click to upload cover image</span>
              <span className="text-[11px] text-slate-400">PNG, JPG, or WEBP formats</span>
            </label>

            {cover && (
              <div className="mt-4 relative max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-200">
                <img src={cover} alt="Cover preview" className="max-h-48 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rich Body Content Area */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Article Content (Markdown supported) *
          </label>
          <textarea
            required
            rows={12}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your article here... You can use Markdown format like ### Headings, - bullet points, or > blockquotes."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Form</span>
          </button>

          <button type="button" onClick={saveDraft} className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer">Save Draft</button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>
      </form>
    </div>
  );
}
