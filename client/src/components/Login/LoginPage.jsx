import React, { useState } from "react";
import MentorLogin from "./MentorLogin";
import StudentLogin from "./StudentLogin";
import RoleModal from "./RoleModal";

export default function LoginPage({ setUserData }) {
  const [role, setRole] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {role === null && (
        <RoleModal setRole={setRole} />
      )}

      {role === "mentor" && (
        <MentorLogin setUserData={setUserData} setRole={setRole} />
      )}

      {role === "student" && (
        <StudentLogin setUserData={setUserData} setRole={setRole} />
      )}
    </div>
  );
}