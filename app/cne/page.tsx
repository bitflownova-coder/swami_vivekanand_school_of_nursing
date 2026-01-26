"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, CreditCard, Users, CheckCircle, AlertCircle, Upload, Loader2 } from "lucide-react";
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
  maxSeats: number;
  currentRegistrations: number;
  status: string;
  paymentQRCode: string;
  upiId: string;
}

export default function CNEPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mncUID: "",
    mncRegistrationNumber: "",
    mobileNumber: "",
    paymentUTR: "",
    paymentScreenshot: null as File | null
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await fetch("/api/cne/workshop?status=active");
      const data = await response.json();
      
      if (data.success) {
        setWorkshops(data.workshops);
      }
    } catch (err) {
      console.error("Error fetching workshops:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setShowForm(true);
    setError("");
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
    if (!formData.mncUID.trim()) return "MNC UID is required";
    if (!formData.mncRegistrationNumber.trim()) return "MNC Registration Number is required";
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) return "Mobile number must be 10 digits";
    if (!formData.paymentUTR.trim()) return "Payment UTR is required";
    if (!formData.paymentScreenshot) return "Payment screenshot is required";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    if (!selectedWorkshop) return;
    
    setSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("workshopId", selectedWorkshop._id);
      data.append("fullName", formData.fullName);
      data.append("mncUID", formData.mncUID);
      data.append("mncRegistrationNumber", formData.mncRegistrationNumber);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("paymentUTR", formData.paymentUTR);
      if (formData.paymentScreenshot) {
        data.append("paymentScreenshot", formData.paymentScreenshot);
      }

      const response = await fetch("/api/cne/registration", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setSuccessData(result.data);
        setShowConfirmation(false);
        setShowForm(false);
      } else {
        setError(result.error || "Registration failed");
        setShowConfirmation(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setShowConfirmation(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-green-200 shadow-xl">
            <CardHeader className="text-center bg-green-50 border-b">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-700">Registration Successful!</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Your registration has been submitted successfully.</p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Your Form Number</p>
                  <p className="text-3xl font-bold text-blue-600">#{successData.formNumber}</p>
                </div>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Name:</span> {successData.fullName}</p>
                  <p><span className="font-medium">Workshop:</span> {successData.workshopTitle}</p>
                  <p><span className="font-medium">Date:</span> {formatDate(successData.workshopDate)}</p>
                  <p className="flex items-start">
                    <span className="font-medium mr-2">Venue:</span> 
                    <span className="flex-1">{successData.workshopVenue}</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Link href="/cne/view-registration" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View & Download Registration
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={() => {
                setSuccessData(null);
                setFormData({
                  fullName: "",
                  mncUID: "",
                  mncRegistrationNumber: "",
                  mobileNumber: "",
                  paymentUTR: "",
                  paymentScreenshot: null
                });
                setSelectedWorkshop(null);
              }}>
                Register for Another Workshop
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            CNE Workshop Registration
          </h1>
          <p className="text-gray-600">
            Continuing Nursing Education Programs
          </p>
          <div className="mt-4">
            <Link href="/cne/view-registration">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View Your Registration
              </Button>
            </Link>
          </div>
        </div>

        {/* Workshop Selection / Form */}
        {!showForm ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Workshops</h2>
            {workshops.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No workshops are currently accepting registrations.</p>
                  <p className="text-gray-500 text-sm mt-2">Please check back later.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((workshop) => (
                  <Card key={workshop._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          workshop.status === 'active' ? 'bg-green-100 text-green-700' :
                          workshop.status === 'full' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {workshop.status === 'active' ? 'Open' : 
                           workshop.status === 'full' ? 'Full' : 'Upcoming'}
                        </span>
                      </div>
                      <CardDescription className="line-clamp-2">{workshop.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        {formatDate(workshop.date)} ({workshop.dayOfWeek})
                      </div>
                      {workshop.venueLink ? (
                        <a 
                          href={workshop.venueLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{workshop.venue}</span>
                        </a>
                      ) : (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{workshop.venue}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2 flex-shrink-0" />
                        ₹{workshop.fee} | {workshop.credits} Credits
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                        {workshop.maxSeats - workshop.currentRegistrations} seats remaining
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleSelectWorkshop(workshop)}
                        disabled={workshop.status === 'full'}
                      >
                        {workshop.status === 'full' ? 'Registration Closed' : 'Register Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => { setShowForm(false); setError(""); }}
            >
              ← Back to Workshops
            </Button>

            <Card className="shadow-xl">
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle>Registration Form</CardTitle>
                <CardDescription className="space-y-1">
                  <div className="font-semibold text-gray-700">{selectedWorkshop?.title}</div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                    {selectedWorkshop && formatDate(selectedWorkshop.date)} ({selectedWorkshop?.dayOfWeek})
                  </div>
                  {selectedWorkshop?.venueLink ? (
                    <a 
                      href={selectedWorkshop.venueLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      {selectedWorkshop.venue}
                    </a>
                  ) : (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      {selectedWorkshop?.venue}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="mncUID">MNC UID *</Label>
                    <Input
                      id="mncUID"
                      name="mncUID"
                      value={formData.mncUID}
                      onChange={handleInputChange}
                      placeholder="Enter your MNC UID"
                      className="mt-1"
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="mt-1"
                    />
                  </div>

                  {/* Payment Section */}
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Fee:</strong> ₹{selectedWorkshop?.fee}
                      </p>
                      {selectedWorkshop?.upiId && (
                        <p className="text-sm text-gray-700">
                          <strong>UPI ID:</strong> {selectedWorkshop.upiId}
                        </p>
                      )}
                      
                      {/* Payment QR Code */}
                      {selectedWorkshop?.paymentQRCode && (
                        <div className="mt-4 text-center">
                          <p className="text-sm font-medium text-gray-700 mb-2">Scan to Pay:</p>
                          <div className="inline-block bg-white p-3 rounded-lg shadow-sm">
                            <img 
                              src={selectedWorkshop.paymentQRCode} 
                              alt="Payment QR Code" 
                              className="max-w-[200px] max-h-[200px] mx-auto"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Scan this QR code with any UPI app to make payment
                          </p>
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

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Confirm Registration</CardTitle>
                <CardDescription>Please review your details before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Workshop:</strong> {selectedWorkshop?.title}</p>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>MNC UID:</strong> {formData.mncUID}</p>
                <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
                <p><strong>UTR:</strong> {formData.paymentUTR}</p>
                <div className="bg-yellow-50 p-3 rounded-lg text-sm text-gray-700 mt-4">
                  <p className="font-medium mb-2">Disclaimer:</p>
                  <p>I confirm that all the information provided is accurate. I understand that providing false information may result in cancellation of my registration.</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowConfirmation(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={confirmSubmission}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm & Submit"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
