import React, { useMemo, useState } from "react";
import { Award, BookOpen, Code2, Edit3, ExternalLink, MapPin, Plus, Sparkles, Trophy } from "lucide-react";

const defaultSkills = ["React", "JavaScript", "Node.js", "Problem Solving", "Git & GitHub"];

export default function Profile({ userData, setView }) {
  const [skills, setSkills] = useState(() => JSON.parse(localStorage.getItem("devconnect-profile-skills") || "null") || defaultSkills);
  const [skillInput, setSkillInput] = useState("");
  const [editing, setEditing] = useState(false);
  const articles = useMemo(() => JSON.parse(localStorage.getItem("articles") || "[]").filter((article) => article.author?.name === userData?.user_name), [userData]);
  const addSkill = (event) => {
    event.preventDefault();
    const next = skillInput.trim();
    if (!next || skills.some((skill) => skill.toLowerCase() === next.toLowerCase())) return;
    const updated = [...skills, next];
    setSkills(updated);
    localStorage.setItem("devconnect-profile-skills", JSON.stringify(updated));
    setSkillInput("");
  };

  const name = userData?.user_name || "Developer";
  const avatar = userData?.user_avatar;
  const isMentor = userData?.role === "mentor";

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-700 via-violet-700 to-slate-900 relative">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        </div>
        <div className="px-6 sm:px-9 pb-7">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
            {avatar ? <img src={avatar} alt={name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-lg" /> : <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-indigo-600 border-4 border-white shadow-lg text-white text-3xl font-bold grid place-items-center">{name.charAt(0).toUpperCase()}</div>}
            <div className="sm:pb-1 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-extrabold text-slate-900">{name}</h1>{isMentor && <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[11px] font-bold text-indigo-700">Verified mentor</span>}</div>
              <p className="mt-1 text-sm font-medium text-slate-500">{isMentor ? "Mentor · helping developers grow" : "Developer · building and learning in public"}</p>
            </div>
            <button onClick={() => setEditing(!editing)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"><Edit3 className="w-4 h-4" />{editing ? "Done" : "Edit profile"}</button>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">Building useful products, sharpening fundamentals, and connecting with developers who enjoy sharing what they learn.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500"><span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-500" />DevConnect community</span><span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-indigo-500" />@{name.toLowerCase().replace(/\s+/g, "")}</span></div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><div><h2 className="text-base font-extrabold text-slate-900">Technical toolkit</h2><p className="mt-1 text-xs text-slate-500">Skills and technologies you want people to know you for.</p></div><Code2 className="w-5 h-5 text-indigo-600" /></div><div className="mt-5 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{skill}</span>)}</div>{editing && <form onSubmit={addSkill} className="mt-5 flex gap-2"><input value={skillInput} onChange={(event) => setSkillInput(event.target.value)} placeholder="Add a skill" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-indigo-500" /><button className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white"><Plus className="w-3.5 h-3.5" />Add</button></form>}</section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><div><h2 className="text-base font-extrabold text-slate-900">Published knowledge</h2><p className="mt-1 text-xs text-slate-500">Articles and learning notes shared with the community.</p></div><button onClick={() => setView(isMentor ? "create-article" : "articles")} className="text-xs font-bold text-indigo-600 hover:underline">{isMentor ? "Write article" : "Explore articles"}</button></div>{articles.length ? <div className="mt-4 space-y-3">{articles.map((article) => <div key={article.id} className="flex gap-3 rounded-2xl border border-slate-100 p-3"><BookOpen className="mt-0.5 w-4 h-4 shrink-0 text-indigo-600" /><div><p className="text-sm font-bold text-slate-800">{article.title}</p><p className="mt-1 text-xs text-slate-500">{article.readTime} · {article.category}</p></div></div>)}</div> : <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center text-xs text-slate-500">Your published articles will appear here.</div>}</section>
        </div>
        <div className="space-y-6"><section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"><h2 className="text-sm font-extrabold text-slate-900">Developer snapshot</h2><div className="mt-4 grid grid-cols-2 gap-3"><Metric icon={Trophy} value="24" label="Problems solved" /><Metric icon={BookOpen} value={String(articles.length)} label="Articles" /><Metric icon={Award} value={isMentor ? "8" : "3"} label="Achievements" /><Metric icon={Sparkles} value="12" label="Mentors followed" /></div></section><section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-5"><h2 className="text-sm font-extrabold text-indigo-950">Coding profiles</h2><p className="mt-1 text-xs leading-relaxed text-indigo-700">Connect your developer identity as the platform grows.</p><div className="mt-4 space-y-2"><ProfileLink icon={Code2} name="GitHub" /><ProfileLink icon={Code2} name="LinkedIn" /></div></section></div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, value, label }) { return <div className="rounded-2xl bg-slate-50 p-3"><Icon className="w-4 h-4 text-indigo-600" /><p className="mt-2 text-lg font-extrabold text-slate-900">{value}</p><p className="text-[10px] font-medium text-slate-500">{label}</p></div>; }
function ProfileLink({ icon: Icon, name }) { return <button className="flex w-full items-center justify-between rounded-xl bg-white/70 px-3 py-2.5 text-xs font-bold text-slate-700"><span className="flex items-center gap-2"><Icon className="w-4 h-4" />{name}</span><ExternalLink className="w-3.5 h-3.5 text-indigo-500" /></button>; }
