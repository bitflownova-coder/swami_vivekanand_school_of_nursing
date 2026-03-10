"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, CheckCircle, AlertCircle, Loader2,
  Calendar, CreditCard, Users
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
}

function SpotRegisterContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [workshopId, setWorkshopId] = useState<string>("");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mncUID: "",
    mncRegistrationNumber: "",
    mobileNumber: "",
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

    if (!workshop) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/cne/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId: workshop._id,
          fullName: formData.fullName.trim(),
          mncUID: formData.mncUID,
          mncRegistrationNumber: formData.mncRegistrationNumber,
          mobileNumber: formData.mobileNumber,
          registrationType: "spot",
          spotToken: token,
        }),
      });

      const result = await response.json();

      if (result.success && result.redirectUrl) {
        // Redirect to ICICI payment page
        window.location.href = result.redirectUrl;
      } else {
        setError(result.error || "Failed to initiate payment. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
                    You will be redirected to secure payment gateway after submitting.
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
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
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
