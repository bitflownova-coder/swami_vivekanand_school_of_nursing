"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Loader2, Search, RefreshCw, Download,
  GraduationCap, MessageSquare, Users, ClipboardList,
  CheckCircle, XCircle, Clock, ChevronDown,
} from "lucide-react";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Enquiry = {
  id: string; name: string; phone: string; email: string;
  course: string; message: string; source: string; createdAt: string;
};

type Admission = {
  id: string; fullName: string; phone: string; email: string; dateOfBirth: string;
  gender: string; address: string; tenthBoard: string; tenthPercent: string;
  twelthBoard: string; twelthPercent: string; twelthStream: string;
  category: string; hasDisability: boolean | number; isAnmRegistered: boolean | number;
  status: string; notes: string; createdAt: string;
};

type AdmissionStats = { total: number; pending: number; shortlisted: number; admitted: number; rejected: number; };

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function fmtDate(dt: string) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function statusColor(s: string) {
  if (s === "admitted") return "bg-green-100 text-green-700";
  if (s === "shortlisted") return "bg-blue-100 text-blue-700";
  if (s === "rejected") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700"; // pending
}

const STATUSES = ["pending", "shortlisted", "admitted", "rejected"];

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function CollegeAdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"enquiries" | "admissions">("enquiries");
  const [authChecked, setAuthChecked] = useState(false);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enqSearch, setEnqSearch] = useState("");
  const [enqSort, setEnqSort] = useState("newest");
  const [enqLoading, setEnqLoading] = useState(false);

  // Admissions state
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [admStats, setAdmStats] = useState<AdmissionStats>({ total: 0, pending: 0, shortlisted: 0, admitted: 0, rejected: 0 });
  const [admSearch, setAdmSearch] = useState("");
  const [admSort, setAdmSort] = useState("newest");
  const [admStatus, setAdmStatus] = useState("");
  const [admLoading, setAdmLoading] = useState(false);

  // Auth check
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/college/admin/check-session");
        const data = await res.json();
        if (!data.authenticated) { router.push("/college-admin"); return; }
      } catch { router.push("/college-admin"); return; }
      setAuthChecked(true);
    })();
  }, [router]);

  // Fetch enquiries
  const fetchEnquiries = useCallback(async () => {
    setEnqLoading(true);
    try {
      const params = new URLSearchParams();
      if (enqSearch) params.set("search", enqSearch);
      if (enqSort) params.set("sort", enqSort);
      const res = await fetch(`/api/college/admin/enquiries?${params}`);
      const data = await res.json();
      if (data.success) setEnquiries(data.enquiries);
    } catch { /* noop */ }
    finally { setEnqLoading(false); }
  }, [enqSearch, enqSort]);

  // Fetch admissions
  const fetchAdmissions = useCallback(async () => {
    setAdmLoading(true);
    try {
      const params = new URLSearchParams();
      if (admSearch) params.set("search", admSearch);
      if (admSort) params.set("sort", admSort);
      if (admStatus) params.set("status", admStatus);
      const res = await fetch(`/api/college/admin/admissions?${params}`);
      const data = await res.json();
      if (data.success) { setAdmissions(data.admissions); setAdmStats(data.stats); }
    } catch { /* noop */ }
    finally { setAdmLoading(false); }
  }, [admSearch, admSort, admStatus]);

  useEffect(() => { if (authChecked) fetchEnquiries(); }, [authChecked, fetchEnquiries]);
  useEffect(() => { if (authChecked && tab === "admissions") fetchAdmissions(); }, [authChecked, tab, fetchAdmissions]);

  const updateAdmissionStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/college/admin/admissions?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      setAdmStats(prev => {
        const old = admissions.find(a => a.id === id)?.status || "pending";
        return {
          ...prev,
          [old]: Math.max(0, prev[old as keyof AdmissionStats] as number - 1),
          [status]: (prev[status as keyof AdmissionStats] as number) + 1,
        };
      });
    } catch { /* noop */ }
  };

  const handleLogout = async () => {
    await fetch("/api/college/admin/logout", { method: "POST" });
    router.push("/college-admin");
  };

  const downloadCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const rows = [keys.join(","), ...data.map(r => keys.map(k => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm leading-none">College Admin</p>
              <p className="text-xs text-slate-400 leading-none mt-0.5">SVS Nursing</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 font-semibold transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {(["enquiries", "admissions"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors capitalize ${tab === t ? "bg-blue-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              {t === "enquiries" ? <MessageSquare className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
              {t}
            </button>
          ))}
        </div>

        {/* â”€â”€ Enquiries Tab â”€â”€ */}
        {tab === "enquiries" && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={enqSearch} onChange={e => setEnqSearch(e.target.value)}
                  placeholder="Search by name, phone, email, course…"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <select value={enqSort} onChange={e => setEnqSort(e.target.value)}
                className="border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:border-blue-500 bg-white">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <button onClick={fetchEnquiries} className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors">
                <RefreshCw className={`h-4 w-4 ${enqLoading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button onClick={() => downloadCSV(enquiries as unknown as Record<string, unknown>[], "enquiries.csv")}
                className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-5 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-700" />
              <span className="font-semibold text-slate-900">{enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} found</span>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">#</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Name</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Phone</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Email</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Course Interest</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Source</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enqLoading ? (
                      <tr><td colSpan={7} className="text-center py-12 text-slate-400"><Loader2 className="h-5 w-5 animate-spin inline" /></td></tr>
                    ) : enquiries.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-slate-400">No enquiries found</td></tr>
                    ) : enquiries.map((e, i) => (
                      <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 text-slate-400">{i + 1}</td>
                        <td className="px-5 py-4 font-semibold text-slate-900">{e.name}</td>
                        <td className="px-5 py-4 text-slate-600">{e.phone}</td>
                        <td className="px-5 py-4 text-slate-600">{e.email || "—"}</td>
                        <td className="px-5 py-4 text-slate-600">{e.course || "—"}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${e.source === "floating" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                            {e.source}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{fmtDate(e.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* â”€â”€ Admissions Tab â”€â”€ */}
        {tab === "admissions" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
              {[
                { label: "Total", val: admStats.total, cls: "bg-blue-50 text-blue-700" },
                { label: "Pending", val: admStats.pending, cls: "bg-amber-50 text-amber-700" },
                { label: "Shortlisted", val: admStats.shortlisted, cls: "bg-sky-50 text-sky-700" },
                { label: "Admitted", val: admStats.admitted, cls: "bg-green-50 text-green-700" },
                { label: "Rejected", val: admStats.rejected, cls: "bg-red-50 text-red-700" },
              ].map(({ label, val, cls }) => (
                <div key={label} className={`${cls} rounded-2xl p-4 text-center`}>
                  <p className="text-2xl font-bold">{val}</p>
                  <p className="text-xs font-semibold mt-0.5 uppercase tracking-wider opacity-75">{label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={admSearch} onChange={e => setAdmSearch(e.target.value)}
                  placeholder="Search by name, phone, email…"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <select value={admSort} onChange={e => setAdmSort(e.target.value)}
                className="border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:border-blue-500 bg-white">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <select value={admStatus} onChange={e => setAdmStatus(e.target.value)}
                className="border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:border-blue-500 bg-white">
                <option value="">All Statuses</option>
                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
              <button onClick={fetchAdmissions} className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors">
                <RefreshCw className={`h-4 w-4 ${admLoading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button onClick={() => downloadCSV(admissions as unknown as Record<string, unknown>[], "admissions.csv")}
                className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Name</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Phone</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">DOB</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">12th %</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Category</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider w-36">Status</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admLoading ? (
                      <tr><td colSpan={8} className="text-center py-12 text-slate-400"><Loader2 className="h-5 w-5 animate-spin inline" /></td></tr>
                    ) : admissions.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-12 text-slate-400">No applications found</td></tr>
                    ) : admissions.map((a, i) => (
                      <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-4 text-slate-400">{i + 1}</td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{a.fullName}</p>
                          <p className="text-xs text-slate-400">{a.gender} · {a.twelthStream}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{a.phone}</td>
                        <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{fmtDate(a.dateOfBirth)}</td>
                        <td className="px-4 py-4 font-semibold text-slate-900">{a.twelthPercent}%</td>
                        <td className="px-4 py-4 text-slate-600">{a.category}</td>
                        <td className="px-4 py-4">
                          <select
                            value={a.status}
                            onChange={e => updateAdmissionStatus(a.id, e.target.value)}
                            className={`${statusColor(a.status)} text-xs font-semibold rounded-lg px-2 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer`}
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-4 text-slate-500 whitespace-nowrap">{fmtDate(a.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
