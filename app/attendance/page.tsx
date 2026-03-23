"use client";

import { useEffect, useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { RefreshCw, QrCode, Calendar, MapPin, Loader2, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://svsnursing.org";

interface Workshop {
  id: string;
  title: string;
  date: string;
  dayOfWeek: string;
  venue: string;
  attendanceQRToken: string;
  status: string;
}

export default function AttendanceSpotPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkshops = useCallback(async () => {
    try {
      setError("");
      const res = await fetch("/api/cne/attendance/workshops", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setWorkshops(data.workshops);
      } else {
        setError("Failed to load workshops.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkshops();
    // No auto-refresh — QR codes are permanent per workshop
  }, [fetchWorkshops]);

  const getQRValue = (workshop: Workshop) =>
    `${BASE_URL}/attendance/mark?workshopId=${workshop.id}&token=${workshop.attendanceQRToken}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">Attendance Spot</h1>
              <p className="text-sm text-green-700">
                Scan QR code to mark your attendance
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setLoading(true); fetchWorkshops(); }}
            className="gap-2 border-green-300 text-green-700 hover:bg-green-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-green-600" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center py-24 gap-4 text-center">
            <WifiOff className="h-12 w-12 text-red-400" />
            <p className="text-red-600 font-medium">{error}</p>
            <Button variant="outline" onClick={() => { setLoading(true); fetchWorkshops(); }}>
              Try Again
            </Button>
          </div>
        )}

        {/* No active workshops */}
        {!loading && !error && workshops.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-4 text-center">
            <QrCode className="h-16 w-16 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-500">No Active Workshops</h2>
            <p className="text-gray-400 max-w-sm">
              There are no active workshops at the moment. Please check back later.
            </p>
          </div>
        )}

        {/* Workshop QR Cards */}
        {!loading && !error && workshops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="shadow-lg border-green-100 overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white pb-4">
                  <CardTitle className="text-lg leading-tight">
                    {workshop.title}
                  </CardTitle>
                  <CardDescription className="text-green-100 mt-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        {workshop.dayOfWeek},{" "}
                        {format(new Date(workshop.date), "dd MMM yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{workshop.venue}</span>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center pt-6 pb-6 gap-4">
                  {workshop.attendanceQRToken ? (
                    <>
                      <div className="p-3 bg-white rounded-xl shadow-inner border border-green-100">
                        <QRCodeSVG
                          value={getQRValue(workshop)}
                          size={180}
                          bgColor="#ffffff"
                          fgColor="#065f46"
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Scan with your phone to mark attendance
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                      <QrCode className="h-8 w-8" />
                      <p className="text-sm">QR token not configured</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          Swami Vivekanand School of Nursing
        </p>
      </div>
    </div>
  );
}
