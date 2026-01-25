"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, UserCheck, Clock, MapPin, LogOut, Search, 
  RefreshCw, FileSpreadsheet, Loader2, ChevronDown, Settings
} from "lucide-react";
import Link from "next/link";

interface Workshop {
  _id: string;
  title: string;
  date: string;
}

interface Registration {
  _id: string;
  formNumber: number;
  fullName: string;
  mncUID: string;
  mncRegistrationNumber: string;
  mobileNumber: string;
  paymentUTR: string;
  registrationType: string;
  attendanceStatus: string;
  downloadCount: number;
  submittedAt: string;
  workshopId: {
    _id: string;
    title: string;
  };
}

interface Stats {
  total: number;
  present: number;
  applied: number;
  spot: number;
  online: number;
  remaining: number;
  totalSeats: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("all");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadStats();
      loadRegistrations();
    }
  }, [selectedWorkshop, sortOrder, loading]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/cne/admin/check-session");
      const data = await response.json();
      
      if (!data.success || !data.authenticated) {
        router.push("/cne/admin");
        return;
      }
      
      await loadWorkshops();
      setLoading(false);
    } catch (err) {
      router.push("/cne/admin");
    }
  };

  const loadWorkshops = async () => {
    try {
      const response = await fetch("/api/cne/workshop");
      const data = await response.json();
      
      if (data.success) {
        setWorkshops(data.workshops);
      }
    } catch (err) {
      console.error("Error loading workshops:", err);
    }
  };

  const loadStats = async () => {
    try {
      const url = selectedWorkshop === "all" 
        ? "/api/cne/admin/stats"
        : `/api/cne/admin/stats?workshopId=${selectedWorkshop}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const loadRegistrations = async () => {
    try {
      let url = `/api/cne/admin/registrations?sort=${sortOrder}`;
      if (selectedWorkshop !== "all") {
        url += `&workshopId=${selectedWorkshop}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Error loading registrations:", err);
    }
  };

  const handleSearch = () => {
    loadRegistrations();
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // Dynamic import for xlsx
      const XLSX = await import("xlsx");
      
      const exportData = registrations.map((reg, index) => ({
        "S.No": index + 1,
        "Form No.": reg.formNumber,
        "Name": reg.fullName,
        "MNC UID": reg.mncUID,
        "MNC Reg. No.": reg.mncRegistrationNumber,
        "Mobile": reg.mobileNumber,
        "UTR": reg.paymentUTR,
        "Workshop": reg.workshopId?.title || "N/A",
        "Type": reg.registrationType.toUpperCase(),
        "Status": reg.attendanceStatus.toUpperCase(),
        "Downloads": reg.downloadCount,
        "Submitted": new Date(reg.submittedAt).toLocaleDateString("en-IN")
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registrations");
      
      const filename = `CNE_Registrations_${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error("Error exporting:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/cne/admin/logout", { method: "POST" });
      router.push("/cne/admin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-900">CNE Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/cne/admin/workshops">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Workshops
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative">
            <select
              value={selectedWorkshop}
              onChange={(e) => setSelectedWorkshop(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Workshops</option>
              {workshops.map((workshop) => (
                <option key={workshop._id} value={workshop._id}>
                  {workshop.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex-1 max-w-md flex gap-2">
            <Input
              placeholder="Search by name, MNC UID, mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="appearance-none bg-white border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <Button onClick={() => { loadStats(); loadRegistrations(); }} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Registrations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold text-orange-600">{stats.remaining}</p>
                <p className="text-xs text-gray-500">Remaining Seats</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                <p className="text-xs text-gray-500">Present</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <p className="text-2xl font-bold text-yellow-600">{stats.applied}</p>
                <p className="text-xs text-gray-500">Applied</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-600">{stats.spot}</p>
                <p className="text-xs text-gray-500">Spot</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-2xl font-bold text-gray-600">{stats.online}</p>
                <p className="text-xs text-gray-500">Online</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registrations Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Registrations ({registrations.length})</CardTitle>
            <Button onClick={handleExport} disabled={exporting} className="bg-green-600 hover:bg-green-700">
              {exporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Excel
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Form No.</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">MNC UID</th>
                    <th className="px-4 py-3 text-left">Mobile</th>
                    <th className="px-4 py-3 text-left">UTR</th>
                    <th className="px-4 py-3 text-left">Workshop</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, index) => (
                    <tr key={reg._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">#{reg.formNumber}</td>
                      <td className="px-4 py-3">{reg.fullName}</td>
                      <td className="px-4 py-3">{reg.mncUID}</td>
                      <td className="px-4 py-3">{reg.mobileNumber}</td>
                      <td className="px-4 py-3">{reg.paymentUTR}</td>
                      <td className="px-4 py-3">{reg.workshopId?.title || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          reg.attendanceStatus === 'present'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {reg.attendanceStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          reg.registrationType === 'spot'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {reg.registrationType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatDate(reg.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {registrations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No registrations found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
