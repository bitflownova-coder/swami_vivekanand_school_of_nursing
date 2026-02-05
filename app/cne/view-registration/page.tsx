"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Download, AlertCircle, Calendar, MapPin, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

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
    date: string;
    venue: string;
    dayOfWeek: string;
    fee: number;
    credits: number;
  };
}

export default function ViewRegistrationPage() {
  const [searchData, setSearchData] = useState({
    mncUID: "",
    mobileNumber: ""
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch("/api/cne/registration/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchData)
      });

      const data = await response.json();

      if (data.success) {
        setRegistrations(data.registrations);
      } else {
        setError(data.error || "No registration found");
        setRegistrations([]);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (registration: Registration) => {
    if (registration.downloadCount >= 2) {
      setError("Maximum download limit (2) reached for this registration");
      return;
    }

    setDownloading(registration._id);

    try {
      // Increment download count
      const response = await fetch("/api/cne/registration/increment-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: registration._id })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Download failed");
        setDownloading(null);
        return;
      }

      // Generate PDF (client-side)
      await generatePDF(registration);

      // Update local state
      setRegistrations(prev => prev.map(r => 
        r._id === registration._id 
          ? { ...r, downloadCount: r.downloadCount + 1 }
          : r
      ));
    } catch (err) {
      setError("Failed to download. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const generatePDF = async (registration: Registration) => {
    // Dynamic import for jspdf
    const { jsPDF } = await import("jspdf");
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("CNE Registration Certificate", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Swami Vivekanand School of Nursing", pageWidth / 2, 30, { align: "center" });
    
    // Content
    doc.setTextColor(0, 0, 0);
    let y = 55;
    
    doc.setFontSize(16);
    doc.text(`Form Number: #${registration.formNumber}`, pageWidth / 2, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };

    const details = [
      ["Full Name", registration.fullName],
      ["MNC UID", registration.mncUID],
      ["MNC Registration No.", registration.mncRegistrationNumber],
      ["Mobile Number", registration.mobileNumber],
      ["Workshop", registration.workshopId.title],
      ["Workshop Date", formatDate(registration.workshopId.date)],
      ["Day", registration.workshopId.dayOfWeek],
      ["Venue", registration.workshopId.venue],
      ["Fee Paid", `₹${registration.workshopId.fee}`],
      ["Credits", registration.workshopId.credits.toString()],
      ["Payment UTR", registration.paymentUTR],
      ["Registration Type", registration.registrationType.toUpperCase()],
      ["Attendance Status", registration.attendanceStatus.toUpperCase()],
      ["Submitted On", formatDate(registration.submittedAt)]
    ];

    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, y);
      y += 8;
    });

    // Footer
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("This is a computer-generated document. No signature is required.", pageWidth / 2, y, { align: "center" });
    
    // Save
    doc.save(`CNE_Registration_${registration.formNumber}.pdf`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            View Your Registration
          </h1>
          <p className="text-gray-600 mb-4">
            Enter your MNC UID and Mobile Number to view and download your registration
          </p>
          <Link href="/cne">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              ← Back to Registration
            </Button>
          </Link>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mncUID">MNC UID (10 digit)</Label>
                  <Input
                    id="mncUID"
                    type="tel"
                    value={searchData.mncUID}
                    onChange={(e) => setSearchData(prev => ({ ...prev, mncUID: e.target.value.replace(/\D/g, '') }))}
                    placeholder="Enter your 10-digit MNC UID"
                    maxLength={10}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={searchData.mobileNumber}
                    onChange={(e) => setSearchData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Results */}
        {searched && !loading && registrations.length === 0 && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No registration found with the provided details.</p>
              <p className="text-gray-500 text-sm mt-2">Please check your MNC UID and Mobile Number.</p>
            </CardContent>
          </Card>
        )}

        {registrations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Found {registrations.length} Registration(s)
            </h2>
            
            {registrations.map((registration) => (
              <Card key={registration._id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-blue-50 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{registration.workshopId.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(registration.workshopId.date)}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {registration.workshopId.venue}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">#{registration.formNumber}</span>
                      <p className="text-xs text-gray-500">Form Number</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{registration.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">MNC UID</p>
                      <p className="font-medium">{registration.mncUID}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">MNC Registration No.</p>
                      <p className="font-medium">{registration.mncRegistrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="font-medium">{registration.mobileNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment UTR</p>
                      <p className="font-medium">{registration.paymentUTR}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Registration Type</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        registration.registrationType === 'spot' 
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {registration.registrationType.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attendance Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
                        registration.attendanceStatus === 'present' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {registration.attendanceStatus === 'present' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {registration.attendanceStatus.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted On</p>
                      <p className="font-medium">{formatDate(registration.submittedAt)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Downloads: {registration.downloadCount}/2 remaining: {2 - registration.downloadCount}
                  </p>
                  <Button
                    onClick={() => handleDownload(registration)}
                    disabled={registration.downloadCount >= 2 || downloading === registration._id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {downloading === registration._id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : registration.downloadCount >= 2 ? (
                      "Download Limit Reached"
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
