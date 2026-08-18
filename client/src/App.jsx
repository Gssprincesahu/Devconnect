import React, { useState } from "react";
import Sidebar from "./components/Layout/Sidebar.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Mentors from "./components/Mentors/Mentors.jsx";
import Article from "./components/Article/Article.jsx";
import CreateArticle from "./components/Article/CreateArticle.jsx";
import Chat from "./components/Chat/Chat.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";

export default function App() {
  const [userData, setUserData] = useState("");
  const [view, setView] = useState("home"); // "home", "mentors", "articles", "create-article", "messages"
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [selectedChatRecipient, setSelectedChatRecipient] = useState(null);

  // If user is not logged in yet, render login workflow
  if (!userData) {
    return <LoginPage setUserData={setUserData} />;
  }

  // Handle direct navigation to messaging with a specific mentor
  const handleStartChatWithUser = (mentorName) => {
    setSelectedChatRecipient(mentorName);
    setView("messages");
  };

  // Handle direct navigation to reading an article
  const handleSelectArticle = (articleObj) => {
    setActiveArticle(articleObj);
    setView("articles");
  };

  // Handle mentor modal trigger
  const handleSelectMentor = (mentorObj) => {
    setView("mentors");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={view}
        setView={(v) => {
          setView(v);
          if (v !== "articles") setActiveArticle(null);
        }}
        userData={userData}
        onLogout={() => {
          setUserData("");
          setView("home");
          setActiveArticle(null);
          setSelectedChatRecipient(null);
        }}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar
          currentView={view}
          setIsMobileOpen={setIsMobileOpen}
          userData={userData}
        />

        {/* View Router Main Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Write Article tab trigger for mentors when in Articles view */}
          {view === "articles" && userData?.role === "mentor" && !activeArticle && (
            <div className="max-w-7xl mx-auto mb-4 flex justify-end">
              <button
                onClick={() => setView("create-article")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                + Publish New Article
              </button>
            </div>
          )}

          {/* HOME VIEW */}
          {view === "home" && (
            <Home
              userData={userData}
              setView={setView}
              onSelectMentor={handleSelectMentor}
              onSelectArticle={handleSelectArticle}
              onStartChatWithUser={handleStartChatWithUser}
            />
          )}

          {/* MENTORS VIEW */}
          {view === "mentors" && (
            <Mentors
              onStartChatWithUser={handleStartChatWithUser}
            />
          )}

          {/* ARTICLES VIEW */}
          {view === "articles" && (
            <Article
              currentUser={userData}
              onSelectArticle={setActiveArticle}
              activeArticle={activeArticle}
              setActiveArticle={setActiveArticle}
            />
          )}

          {/* CREATE ARTICLE VIEW (For Mentors) */}
          {view === "create-article" && (
            <CreateArticle
              currentUser={userData}
              onPublish={() => setView("articles")}
            />
          )}

          {/* MESSAGES VIEW */}
          {view === "messages" && (
            <Chat
              CurrentuserData={userData}
              selectedChatRecipient={selectedChatRecipient}
              setSelectedChatRecipient={setSelectedChatRecipient}
            />
          )}
        </main>
      </div>
    </div>
  );
}
