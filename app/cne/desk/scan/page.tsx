"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, CheckCircle, AlertCircle, Loader2, User, Phone } from "lucide-react";
import Link from "next/link";

function AttendanceScanContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [workshopId, setWorkshopId] = useState<string>("");
  const [formData, setFormData] = useState({
    mncUID: "",
    mobileNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const workshopIdParam = searchParams.get("workshopId");
    
    if (tokenParam) setToken(tokenParam);
    if (workshopIdParam) setWorkshopId(workshopIdParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!token || !workshopId) {
      setError("Invalid QR code. Please scan again from the registration desk.");
      setLoading(false);
      return;
    }

    if (!formData.mncUID.trim()) {
      setError("MNC UID is required");
      setLoading(false);
      return;
    }

    if (!formData.mobileNumber.trim()) {
      setError("Mobile number is required");
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      setError("Mobile number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/cne/desk/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          workshopId,
          mncUID: formData.mncUID.toUpperCase().trim(),
          mobileNumber: formData.mobileNumber.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.data);
      } else {
        setError(data.error || "Failed to mark attendance");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !workshopId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-700">Invalid QR Code</CardTitle>
            <CardDescription>
              Please scan a valid attendance QR code from the registration desk.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/cne" className="w-full">
              <Button variant="outline" className="w-full">
                Go to CNE Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-4">
        <Card className="max-w-md w-full border-green-200">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-700">Attendance Marked!</CardTitle>
            <CardDescription>
              Your attendance has been recorded successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Welcome,</p>
              <p className="text-xl font-bold text-green-700">{success.studentName}</p>
              <p className="text-sm text-gray-600 mt-2">Form #: {success.formNumber}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/cne" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Done
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <QrCode className="h-8 w-8 text-white" />
          </div>
          <CardTitle>Mark Your Attendance</CardTitle>
          <CardDescription>
            Enter your details to mark your attendance for the workshop
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="mncUID">MNC UID *</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="mncUID"
                  value={formData.mncUID}
                  onChange={(e) => setFormData(prev => ({ ...prev, mncUID: e.target.value.toUpperCase() }))}
                  placeholder="Enter your MNC UID"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the mobile number used during registration
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Marking Attendance...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Attendance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DeskScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    }>
      <AttendanceScanContent />
    </Suspense>
  );
}
