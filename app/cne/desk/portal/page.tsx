"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  QrCode, Users, UserCheck, Clock, RefreshCw, LogOut, 
  ChevronDown, Loader2, CheckCircle, MapPin, AlertTriangle,
  Clipboard, UserPlus
} from "lucide-react";
import Link from "next/link";

interface Workshop {
  _id: string;
  title: string;
  date: string;
  spotRegistrationEnabled: boolean;
  spotRegistrationLimit: number;
  currentSpotRegistrations: number;
}

interface AttendanceStats {
  total: number;
  present: number;
  applied: number;
  spot: number;
  percentage: number;
}

interface SpotStats {
  total: number;
  limit: number;
  remaining: number;
  isFull: boolean;
}

interface RecentAttendance {
  _id: string;
  studentName: string;
  mncUID: string;
  markedAt: string;
}

type TabType = 'attendance' | 'spot';

export default function DeskPortalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('attendance');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");
  const [attendanceQrToken, setAttendanceQrToken] = useState<string>("");
  const [spotQrToken, setSpotQrToken] = useState<string>("");
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [spotStats, setSpotStats] = useState<SpotStats | null>(null);
  const [recentAttendance, setRecentAttendance] = useState<RecentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (selectedWorkshop) {
      loadAllData();
      startAutoRefresh();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedWorkshop]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/cne/desk/check-session");
      const data = await response.json();
      
      if (!data.success || !data.authenticated) {
        router.push("/cne/desk");
        return;
      }
      
      await loadWorkshops();
      setLoading(false);
    } catch (err) {
      router.push("/cne/desk");
    }
  };

  const loadWorkshops = async () => {
    try {
      const response = await fetch("/api/cne/workshop?status=active");
      const data = await response.json();
      
      if (data.success) {
        setWorkshops(data.workshops);
        if (data.workshops.length > 0) {
          setSelectedWorkshop(data.workshops[0]._id);
        }
      }
    } catch (err) {
      console.error("Error loading workshops:", err);
    }
  };

  const loadAllData = async () => {
    await Promise.all([
      generateAttendanceQRToken(),
      generateSpotQRToken(),
      loadAttendanceStats(),
      loadSpotStats(),
      loadRecentAttendance()
    ]);
  };

  const generateAttendanceQRToken = async () => {
    if (!selectedWorkshop) return;

    try {
      const response = await fetch(`/api/cne/desk/attendance-qr/${selectedWorkshop}`);
      const data = await response.json();
      
      if (data.success) {
        setAttendanceQrToken(data.token);
      }
    } catch (err) {
      console.error("Error generating attendance QR token:", err);
    }
  };

  const generateSpotQRToken = async () => {
    if (!selectedWorkshop) return;

    try {
      const response = await fetch(`/api/cne/desk/spot-qr/${selectedWorkshop}`);
      const data = await response.json();
      
      if (data.success) {
        setSpotQrToken(data.token);
      }
    } catch (err) {
      console.error("Error generating spot QR token:", err);
    }
  };

  const startAutoRefresh = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Refresh stats and recent attendance every 30 seconds (but not QR codes)
    intervalRef.current = setInterval(() => {
      loadAttendanceStats();
      loadSpotStats();
      loadRecentAttendance();
    }, 30000);
  };

  const loadAttendanceStats = async () => {
    if (!selectedWorkshop) return;

    try {
      const response = await fetch(`/api/cne/desk/attendance-stats/${selectedWorkshop}`);
      const data = await response.json();
      
      if (data.success) {
        setAttendanceStats(data.stats);
      }
    } catch (err) {
      console.error("Error loading attendance stats:", err);
    }
  };

  const loadSpotStats = async () => {
    if (!selectedWorkshop) return;

    try {
      const response = await fetch(`/api/cne/desk/spot-stats/${selectedWorkshop}`);
      const data = await response.json();
      
      if (data.success) {
        setSpotStats(data.stats);
      }
    } catch (err) {
      console.error("Error loading spot stats:", err);
    }
  };

  const loadRecentAttendance = async () => {
    if (!selectedWorkshop) return;

    try {
      const response = await fetch(`/api/cne/desk/recent-attendance/${selectedWorkshop}`);
      const data = await response.json();
      
      if (data.success) {
        setRecentAttendance(data.attendance);
      }
    } catch (err) {
      console.error("Error loading recent attendance:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/cne/desk/logout", { method: "POST" });
      router.push("/cne/desk");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getAttendanceQRUrl = () => {
    if (!attendanceQrToken || typeof window === 'undefined') return '';
    const scanUrl = `${window.location.origin}/cne/desk/scan?token=${attendanceQrToken}&workshopId=${selectedWorkshop}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(scanUrl)}`;
  };

  const getSpotQRUrl = () => {
    if (!spotQrToken || typeof window === 'undefined') return '';
    const registerUrl = `${window.location.origin}/cne/desk/register?token=${spotQrToken}&workshopId=${selectedWorkshop}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(registerUrl)}`;
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const selectedWorkshopData = workshops.find(w => w._id === selectedWorkshop);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Registration Desk Portal</h1>
          <div className="flex items-center gap-4">
            {/* Workshop Selector */}
            <div className="relative">
              <select
                value={selectedWorkshop}
                onChange={(e) => setSelectedWorkshop(e.target.value)}
                className="appearance-none bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-48"
              >
                {workshops.map((workshop) => (
                  <option key={workshop._id} value={workshop._id} className="text-gray-800">
                    {workshop.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {workshops.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active workshops found.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setActiveTab('attendance')}
                variant={activeTab === 'attendance' ? 'default' : 'outline'}
                className={activeTab === 'attendance' 
                  ? 'bg-green-600 hover:bg-green-700 flex-1 sm:flex-none' 
                  : 'flex-1 sm:flex-none'}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Attendance QR
              </Button>
              <Button
                onClick={() => setActiveTab('spot')}
                variant={activeTab === 'spot' ? 'default' : 'outline'}
                className={activeTab === 'spot' 
                  ? 'bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none' 
                  : 'flex-1 sm:flex-none'}
                disabled={!selectedWorkshopData?.spotRegistrationEnabled}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Spot Registration
              </Button>
            </div>

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Attendance QR Code */}
                <Card className="border-green-200">
                  <CardHeader className="text-center bg-green-50 border-b">
                    <CardTitle className="flex items-center justify-center gap-2 text-green-800">
                      <QrCode className="h-5 w-5" />
                      Attendance QR Code
                    </CardTitle>
                    {selectedWorkshopData && (
                      <p className="text-sm text-gray-600">
                        {selectedWorkshopData.title} • {formatDate(selectedWorkshopData.date)}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    {attendanceQrToken ? (
                      <>
                        <div className="bg-white p-4 rounded-xl shadow-lg">
                          <img
                            src={getAttendanceQRUrl()}
                            alt="Attendance QR Code"
                            className="w-64 h-64"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          One QR per Workshop - Never Expires
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                          Students scan this QR with their phone camera to mark attendance
                        </p>
                      </>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        Generating QR...
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Attendance Stats & Recent */}
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                      <CardContent className="p-4 text-center">
                        <UserCheck className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{attendanceStats?.present || 0}</p>
                        <p className="text-sm opacity-80">Present</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{attendanceStats?.total || 0}</p>
                        <p className="text-sm opacity-80">Total Registered</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                      <CardContent className="p-4 text-center">
                        <Clipboard className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{attendanceStats?.applied || 0}</p>
                        <p className="text-sm opacity-80">Applied</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      <CardContent className="p-4 text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{attendanceStats?.spot || 0}</p>
                        <p className="text-sm opacity-80">Spot</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Attendance Percentage */}
                  {attendanceStats && attendanceStats.total > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Attendance Rate</span>
                          <span className="font-bold text-green-600">{attendanceStats.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${attendanceStats.percentage}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recent Attendance */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {recentAttendance.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No attendance marked yet</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {recentAttendance.map((att) => (
                            <div key={att._id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <div>
                                  <p className="font-medium text-sm">{att.studentName}</p>
                                  <p className="text-xs text-gray-500">{att.mncUID}</p>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{formatTime(att.markedAt)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Spot Registration Tab */}
            {activeTab === 'spot' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Spot QR Code */}
                <Card className={spotStats?.isFull ? 'border-red-300' : 'border-purple-200'}>
                  <CardHeader className="text-center bg-purple-50 border-b">
                    <CardTitle className="flex items-center justify-center gap-2 text-purple-800">
                      <QrCode className="h-5 w-5" />
                      Spot Registration QR
                    </CardTitle>
                    {selectedWorkshopData && (
                      <p className="text-sm text-gray-600">
                        {selectedWorkshopData.title} • {formatDate(selectedWorkshopData.date)}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    {spotStats?.isFull ? (
                      <div className="text-center py-8">
                        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <p className="text-xl font-bold text-red-600">REGISTRATION FULL</p>
                        <p className="text-gray-500 mt-2">Spot registration limit reached</p>
                      </div>
                    ) : spotQrToken ? (
                      <>
                        <div className="bg-white p-4 rounded-xl shadow-lg">
                          <img
                            src={getSpotQRUrl()}
                            alt="Spot Registration QR Code"
                            className="w-64 h-64"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-purple-600">
                          <CheckCircle className="h-4 w-4" />
                          One QR per Workshop - Never Expires
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          Candidates scan this QR with their phone camera to register on spot
                        </p>
                      </>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        Generating QR...
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Spot Stats */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      <CardContent className="p-4 text-center">
                        <UserPlus className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{spotStats?.total || 0}</p>
                        <p className="text-sm opacity-80">Spot Registered</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <p className="text-3xl font-bold">{spotStats?.remaining || 0}</p>
                        <p className="text-sm opacity-80">Spots Remaining</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spot Limit Progress */}
                  {spotStats && spotStats.limit > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Spots Used</span>
                          <span className="font-bold text-purple-600">
                            {spotStats.total} / {spotStats.limit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              spotStats.isFull ? 'bg-red-500' : 'bg-purple-600'
                            }`}
                            style={{ width: `${(spotStats.total / spotStats.limit) * 100}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Instructions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600 space-y-2">
                      <p>1. Show the QR code to candidates for spot registration</p>
                      <p>2. They scan with their phone camera</p>
                      <p>3. They fill the registration form</p>
                      <p>4. Payment is collected on spot</p>
                      <p>5. Once registered, they can mark attendance using the Attendance QR</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
