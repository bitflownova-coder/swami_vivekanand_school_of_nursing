"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, CheckCircle, AlertCircle, Loader2, 
  Calendar, CreditCard, Upload, Users
} from "lucide-react";
import Link from "next/link";

interface Workshop {
  _id: string;
  title: string;
  description: string;
  date: string;
  dayOfWeek: string;
  venue: string;
  venueLink: string;
  fee: number;
  credits: number;
  paymentQRCode: string;
  upiId: string;
  remainingSpots: number;
}

function SpotRegisterContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [workshopId, setWorkshopId] = useState<string>("");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mncUID: "",
    mncRegistrationNumber: "",
    mobileNumber: "",
    paymentUTR: "",
    paymentScreenshot: null as File | null
  });

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const workshopIdParam = searchParams.get("workshopId");
    
    if (tokenParam && workshopIdParam) {
      setToken(tokenParam);
      setWorkshopId(workshopIdParam);
      verifyToken(tokenParam, workshopIdParam);
    } else {
      setTokenError("Invalid QR code. Missing parameters.");
      setLoading(false);
    }
  }, [searchParams]);

  const verifyToken = async (tokenValue: string, wId: string) => {
    try {
      const response = await fetch("/api/cne/desk/verify-spot-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenValue, workshopId: wId })
      });

      const data = await response.json();

      if (data.success) {
        setWorkshop(data.workshop);
      } else {
        setTokenError(data.error || "Invalid or expired token");
      }
    } catch (err) {
      setTokenError("Failed to verify token. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError("Only JPEG, JPG, or PNG files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFormData(prev => ({ ...prev, paymentScreenshot: file }));
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!/^[0-9]{10}$/.test(formData.mncUID)) return "MNC UID must be exactly 10 digits";
    if (!formData.mncRegistrationNumber.trim()) return "MNC Registration Number is required";
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) return "Mobile number must be 10 digits";
    if (!formData.paymentUTR.trim()) return "Payment UTR is required";
    if (!formData.paymentScreenshot) return "Payment screenshot is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!workshop) return;

    setSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("workshopId", workshop._id);
      data.append("token", token);
      data.append("fullName", formData.fullName);
      data.append("mncUID", formData.mncUID);
      data.append("mncRegistrationNumber", formData.mncRegistrationNumber);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("paymentUTR", formData.paymentUTR);
      data.append("registrationType", "spot");
      if (formData.paymentScreenshot) {
        data.append("paymentScreenshot", formData.paymentScreenshot);
      }

      const response = await fetch("/api/cne/desk/spot-register", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.data);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-700">Invalid Token</CardTitle>
            <CardDescription>{tokenError}</CardDescription>
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
            <CardTitle className="text-green-700">Spot Registration Successful!</CardTitle>
            <CardDescription>
              Your registration has been recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Form Number</p>
              <p className="text-2xl font-bold text-green-700">{success.formNumber}</p>
              <p className="text-sm text-gray-600 mt-4">Name: {success.fullName}</p>
              <p className="text-sm text-gray-600">MNC UID: {success.mncUID}</p>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please note your form number. 
                Use your MNC UID and mobile number to mark attendance.
              </p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <MapPin className="h-6 w-6" />
            </div>
            <CardTitle>Spot Registration</CardTitle>
            {workshop && (
              <CardDescription className="text-purple-100">
                {workshop.title}
              </CardDescription>
            )}
          </CardHeader>

          {workshop && (
            <div className="bg-purple-50 p-4 border-b">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(workshop.date)}
                </div>
                <div className="flex items-center text-gray-600">
                  <CreditCard className="h-4 w-4 mr-2" />
                  ₹{workshop.fee}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {workshop.remainingSpots} spots left
                </div>
              </div>
            </div>
          )}

          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mncUID">MNC UID (10 digit) *</Label>
                <Input
                  id="mncUID"
                  name="mncUID"
                  type="tel"
                  value={formData.mncUID}
                  onChange={(e) => setFormData(prev => ({ ...prev, mncUID: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter your 10-digit MNC UID"
                  maxLength={10}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mncRegistrationNumber">MNC Registration Number *</Label>
                <Input
                  id="mncRegistrationNumber"
                  name="mncRegistrationNumber"
                  value={formData.mncRegistrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your MNC Registration Number"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="mt-1"
                  required
                />
              </div>

              {/* Payment Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Fee:</strong> ₹{workshop?.fee}
                  </p>
                  {workshop?.upiId && (
                    <p className="text-sm text-gray-700">
                      <strong>UPI ID:</strong> {workshop.upiId}
                    </p>
                  )}
                  
                  {/* Payment QR Code */}
                  {workshop?.paymentQRCode && (
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-gray-700 mb-2">Scan to Pay:</p>
                      <div className="inline-block bg-white p-3 rounded-lg shadow-sm">
                        <img 
                          src={workshop.paymentQRCode} 
                          alt="Payment QR Code" 
                          className="max-w-[150px] max-h-[150px] mx-auto"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="paymentUTR">Payment UTR Number *</Label>
                  <Input
                    id="paymentUTR"
                    name="paymentUTR"
                    value={formData.paymentUTR}
                    onChange={handleInputChange}
                    placeholder="Enter UTR/Transaction ID"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="paymentScreenshot">Payment Screenshot *</Label>
                  <div className="mt-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.paymentScreenshot 
                            ? formData.paymentScreenshot.name 
                            : "Click to upload payment screenshot"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">JPEG, JPG, PNG (max 5MB)</p>
                      </div>
                      <input
                        id="paymentScreenshot"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 mt-6"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Complete Spot Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DeskRegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    }>
      <SpotRegisterContent />
    </Suspense>
  );
}
