import React, { useState, useRef } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { ShieldCheck, ArrowLeft, User, Upload, Sparkles } from "lucide-react";

export default function MentorLogin({ setUserData, setRole }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [username, setUsername] = useState("");
  const imageInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }

    setLoading(true);

    try {
      // Save user to backend MongoDB with avatar preview if available
      const response = await axios.post("http://localhost:5000/api/user", {
        user_name: username.trim(),
        user_avatar: imagePreview
      });

      if (response?.data?.success) {
        setUserData({
          user_id: response.data.data.user_id,
          user_name: response.data.data.user_name,
          user_avatar: response.data.data.user_avatar || imagePreview,
          role: "mentor"
        });
      } else {
        alert("Failed to register mentor.");
      }
    } catch (error) {
      console.warn("MongoDB registration notice:", error?.message);
      // Dev mode fallback login if backend is not running locally right now
      setUserData({
        user_id: "m-" + Date.now(),
        user_name: username.trim(),
        user_avatar: imagePreview || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        role: "mentor"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
        <Loader type="threeBounce" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Back Arrow */}
        <button
          onClick={() => setRole(null)}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Mentor Portal
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enter your mentor handle & avatar to start guiding developers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Mentor Username / Display Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Profile Avatar
            </label>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 border-dashed rounded-xl text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>{imagePreview ? "Change Avatar Image" : "Upload Custom Avatar"}</span>
            </button>

            {imagePreview && (
              <div className="mt-3 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                />
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter DevConnect Platform</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}