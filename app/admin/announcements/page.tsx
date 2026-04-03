"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Lock, Loader2, Bell, LogOut } from "lucide-react";

const ADMIN_TOKEN = "SVSAdmin@2024";

export default function AnnouncementsAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (authed) {
      fetch("/api/announcements")
        .then((r) => r.json())
        .then((data: unknown) => { if (Array.isArray(data)) setAnnouncements(data as string[]); })
        .catch(() => showMsg("Failed to load announcements.", "error"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleLogin = () => {
    if (password === ADMIN_TOKEN) {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  };

  const handleAdd = async () => {
    if (!newText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: ADMIN_TOKEN, text: newText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements(data.announcements);
        setNewText("");
        showMsg("Announcement added successfully.");
      } else {
        showMsg(data.error || "Failed to add announcement.", "error");
      }
    } catch {
      showMsg("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: ADMIN_TOKEN, index }),
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements(data.announcements);
        showMsg("Announcement deleted.");
      } else {
        showMsg(data.error || "Failed to delete.", "error");
      }
    } catch {
      showMsg("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* â”€â”€ Login Screen â”€â”€ */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 p-4">
        <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 mb-4">
              <Bell className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Announcements Admin</h1>
            <p className="text-slate-400 text-sm mt-1">Enter admin password to continue</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Admin password"
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* â”€â”€ Admin Dashboard â”€â”€ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Announcements Admin</h1>
              <p className="text-slate-400 text-xs">Manage the website announcement ticker</p>
            </div>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Status Message */}
        {msg && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm border ${
              msg.type === "success"
                ? "bg-green-900/40 border-green-500/30 text-green-300"
                : "bg-red-900/40 border-red-500/30 text-red-300"
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* Add New Announcement */}
        <div className="bg-slate-800 rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" /> Add New Announcement
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Type announcement text..."
              maxLength={200}
              className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleAdd}
              disabled={loading || !newText.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 text-sm flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-2">{newText.length}/200 characters</p>
        </div>

        {/* Current Announcements List */}
        <div className="bg-slate-800 rounded-2xl border border-white/10 p-6">
          <h2 className="text-white font-semibold mb-4">
            Current Announcements{" "}
            <span className="text-slate-400 text-sm font-normal">({announcements.length})</span>
          </h2>

          {announcements.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">
              No announcements yet. Add one above.
            </p>
          ) : (
            <ul className="space-y-2">
              {announcements.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/30 group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600/80 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-slate-200 text-sm leading-relaxed">{text}</span>
                  <button
                    onClick={() => handleDelete(i)}
                    disabled={loading}
                    title="Delete announcement"
                    className="flex-shrink-0 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-slate-500 text-xs text-center mt-6">
          Changes are reflected on the website immediately after saving.
        </p>
      </div>
    </div>
  );
}
