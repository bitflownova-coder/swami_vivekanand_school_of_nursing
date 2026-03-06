"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, CheckCircle, AlertCircle, Loader2, 
  Calendar, CreditCard, Users, Upload, QrCode
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
  remainingSpots: number;
  paymentQRCode: string;
  upiId: string;
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
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentUTR, setPaymentUTR] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");

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

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!/^[0-9]{10}$/.test(formData.mncUID)) return "MNC UID must be exactly 10 digits";
    if (!formData.mncRegistrationNumber.trim()) return "MNC Registration Number is required";
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) return "Mobile number must be 10 digits";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setShowPayment(true);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitRegistration = async () => {
    if (!workshop || !paymentUTR.trim()) {
      setError("Please enter the UTR / Transaction ID");
      return;
    }

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
      data.append("paymentUTR", paymentUTR.trim());
      if (paymentScreenshot) {
        data.append("paymentScreenshot", paymentScreenshot);
      }

      const response = await fetch("/api/cne/desk/spot-register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.data);
      } else {
        setError(result.error || "Registration failed. Please try again.");
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

        {showPayment ? (
          /* Payment Step */
          <Card className="shadow-xl">
            <CardHeader className="bg-purple-50 border-b">
              <CardTitle>Complete Payment</CardTitle>
              <CardDescription>
                Pay ₹{workshop?.fee} via UPI and enter the transaction details below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* QR Code */}
              <div className="text-center">
                {workshop?.paymentQRCode ? (
                  <div className="inline-block p-3 bg-white border-2 border-purple-200 rounded-xl shadow-sm">
                    <img
                      src={workshop.paymentQRCode}
                      alt="Payment QR Code"
                      className="w-52 h-52 object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-52 h-52 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                {workshop?.upiId && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">UPI ID</p>
                    <p className="font-mono font-semibold text-purple-700 text-lg select-all">
                      {workshop.upiId}
                    </p>
                  </div>
                )}
                <div className="mt-3 inline-flex items-center justify-center bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-bold">
                  ₹{workshop?.fee}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Scan the QR code or use the UPI ID above to pay ₹{workshop?.fee}</li>
                  <li>After payment, note the UTR / Transaction ID from your UPI app</li>
                  <li>Enter the UTR below and (optionally) upload the screenshot</li>
                  <li>Click <strong>Submit Registration</strong></li>
                </ol>
              </div>

              {/* UTR Input */}
              <div>
                <Label htmlFor="paymentUTR">UTR / Transaction ID *</Label>
                <Input
                  id="paymentUTR"
                  value={paymentUTR}
                  onChange={(e) => setPaymentUTR(e.target.value)}
                  placeholder="Enter UTR or Transaction ID from your UPI app"
                  className="mt-1"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <Label htmlFor="paymentScreenshot">Payment Screenshot (optional)</Label>
                <label
                  htmlFor="paymentScreenshot"
                  className="mt-1 flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  {screenshotPreview ? (
                    <img
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      className="max-h-40 object-contain rounded"
                    />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload payment screenshot</p>
                      <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                    </>
                  )}
                  <input
                    id="paymentScreenshot"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleScreenshotChange}
                  />
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setShowPayment(false); setError(""); }}
                  disabled={submitting}
                >
                  ← Back
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={submitRegistration}
                  disabled={submitting || !paymentUTR.trim()}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
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

                {/* Fee Info */}
                <div className="border-t pt-4 mt-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Registration Fee</p>
                        <p className="text-2xl font-bold text-purple-600">₹{workshop?.fee}</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-purple-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Pay via UPI using the QR code on the next step.
                    </p>
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
                      Please wait...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
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
