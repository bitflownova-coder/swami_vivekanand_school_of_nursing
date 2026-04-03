"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2, AlertCircle, Loader2, UserCheck, Phone, IdCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MarkAttendanceForm() {
  const searchParams = useSearchParams();
  const workshopId = searchParams.get("workshopId") || "";
  const token = searchParams.get("token") || "";

  const [mncUID, setMncUID] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [workshopTitle, setWorkshopTitle] = useState("");
  const [markedAt, setMarkedAt] = useState("");

  // Redirect if required params are missing
  useEffect(() => {
    if (!workshopId || !token) {
      setStatus("error");
      setMessage("Invalid attendance link. Please scan the QR code again.");
    }
  }, [workshopId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const cleanMnc = mncUID.trim();
    const cleanMobile = mobileNumber.trim();

    if (!/^\d{10}$/.test(cleanMnc)) {
      setStatus("error");
      setMessage("MNC UID must be exactly 10 digits.");
      return;
    }

    if (!/^\d{10}$/.test(cleanMobile)) {
      setStatus("error");
      setMessage("Mobile number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/cne/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshopId, token, mncUID: cleanMnc, mobileNumber: cleanMobile }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "Attendance recorded successfully.");
        setWorkshopTitle(data.data?.workshopTitle || "");
        setMarkedAt(data.data?.markedAt || new Date().toISOString());
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to record attendance.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Success screen ---
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Attendance Marked!</h2>
            {workshopTitle && (
              <p className="text-gray-600">
                Your attendance for <span className="font-semibold">{workshopTitle}</span> has been recorded.
              </p>
            )}
            {markedAt && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-5 py-3 text-center">
                <p className="text-xs text-green-600 uppercase tracking-wide font-medium mb-0.5">Marked At</p>
                <p className="text-base font-semibold text-green-800">
                  {new Date(markedAt).toLocaleDateString("en-IN", {
                    weekday: "long", day: "2-digit", month: "long", year: "numeric"
                  })}
                </p>
                <p className="text-sm text-green-700">
                  {new Date(markedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
                  })}
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500">{message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mb-3">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl text-green-900">Mark Attendance</CardTitle>
          <CardDescription>
            Enter your details to record your attendance
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Invalid link error (no workshopId / token) */}
          {!workshopId || !token ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <AlertCircle className="h-10 w-10 text-red-400" />
              <p className="text-red-600 font-medium">Invalid attendance link.</p>
              <p className="text-sm text-gray-500">
                Please scan the official QR code at the venue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* MNC UID */}
              <div className="space-y-1.5">
                <Label htmlFor="mncUID" className="flex items-center gap-1.5 text-sm font-medium">
                  <IdCard className="h-4 w-4 text-green-600" />
                  MNC UID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mncUID"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  placeholder="Enter 10-digit MNC UID"
                  value={mncUID}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMncUID(val);
                    if (status === "error") setStatus("idle");
                  }}
                  required
                  className="text-base tracking-widest"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <Label htmlFor="mobileNumber" className="flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="h-4 w-4 text-green-600" />
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobileNumber(val);
                    if (status === "error") setStatus("idle");
                  }}
                  required
                  className="text-base tracking-widest"
                />
              </div>

              {/* Error message */}
              {status === "error" && message && (
                <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || mncUID.length !== 10 || mobileNumber.length !== 10}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Mark My Attendance"
                )}
              </Button>

              <p className="text-xs text-center text-gray-400">
                Both fields are mandatory &bull; 10 digits each
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AttendanceMarkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
          <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        </div>
      }
    >
      <MarkAttendanceForm />
    </Suspense>
  );
}
