import React, { useMemo, useState } from "react";
import axios from "axios";
import { Bot, BookOpen, Compass, Lightbulb, Send, Sparkles, UserRound } from "lucide-react";
import { initialArticles, initialMentors } from "../../data/mockData";

const starters = [
  { label: "Explain a concept", prompt: "Explain closures in JavaScript with a simple example.", icon: Lightbulb },
  { label: "Build a roadmap", prompt: "Create a 4-week DSA learning roadmap for a beginner.", icon: Compass },
  { label: "Find a mentor", prompt: "Which mentor should I ask about backend and system design?", icon: UserRound },
  { label: "Summarize an article", prompt: "Summarize the article: Understanding System Design as a Student", icon: BookOpen },
];

export default function Assistant({ userData }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: `Hi ${userData?.user_name || "there"}! I can explain concepts, create learning paths, recommend mentors and articles, improve your profile, or help draft a message to a mentor.` }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useMemo(() => ({
    mentors: initialMentors.map(({ name, role, company, expertise, bio }) => ({ name, role, company, expertise, bio })),
    articles: [...initialArticles, ...JSON.parse(localStorage.getItem("articles") || "[]")].map(({ title, subtitle, category, tags, author, body }) => ({ title, subtitle, category, tags, author: author?.name, body: body?.slice(0, 2500) })),
    profile: { name: userData?.user_name, role: userData?.role }
  }), [userData]);

  const ask = async (question) => {
    const text = question.trim();
    if (!text || loading) return;
    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/assistant", { message: text, context, history: messages.slice(-6) });
      setMessages((current) => [...current, { role: "assistant", content: response.data?.reply || "I couldn't create a response just now. Please try again." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "The AI service is unavailable. Start the DevConnect server and Ollama for generated answers; the rest of the platform remains available." }]);
    } finally { setLoading(false); }
  };

  return <div className="max-w-6xl mx-auto h-[calc(100vh-9rem)] min-h-[620px] grid grid-cols-1 lg:grid-cols-[280px_1fr] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
    <aside className="hidden lg:flex flex-col border-r border-slate-200 bg-slate-50/80 p-5"><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white"><Bot className="w-5 h-5" /></div><div><p className="font-extrabold text-slate-900">DevGuide AI</p><p className="text-[11px] font-medium text-indigo-600">Your learning companion</p></div></div><p className="mt-6 text-xs leading-relaxed text-slate-500">Guidance grounded in DevConnect mentors and articles. It does not access private direct messages.</p><p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">Try asking</p><div className="mt-3 space-y-2">{starters.map(({ label, prompt, icon: Icon }) => <button key={label} onClick={() => ask(prompt)} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-white hover:text-indigo-700"><Icon className="w-4 h-4 text-indigo-500" />{label}</button>)}</div><div className="mt-auto rounded-2xl border border-indigo-100 bg-indigo-50 p-3 text-[11px] leading-relaxed text-indigo-800">AI guidance can make mistakes. Verify important technical and career decisions.</div></aside>
    <section className="flex min-h-0 flex-col"><header className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white lg:hidden"><Bot className="w-5 h-5" /></div><div><h1 className="text-base font-extrabold text-slate-900">DevGuide AI</h1><p className="text-[11px] text-emerald-600">Local, student-friendly assistant</p></div></div><Sparkles className="w-5 h-5 text-violet-500" /></header>
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6"><div className="mx-auto max-w-3xl space-y-4">{messages.map((message, index) => <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "border border-slate-200 bg-white text-slate-700 rounded-bl-sm"}`}>{message.content}</div></div>)}{loading && <div className="w-fit rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-500">DevGuide is thinking…</div>}</div></div>
      <form onSubmit={(event) => { event.preventDefault(); ask(input); }} className="border-t border-slate-200 bg-white p-4"><div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-500"><textarea rows={1} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); ask(input); } }} placeholder="Ask about DSA, React, mentors, articles, or your profile…" className="min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none" /><button disabled={!input.trim() || loading} className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white disabled:bg-slate-300"><Send className="w-4 h-4" /></button></div></form>
    </section>
  </div>;
}
