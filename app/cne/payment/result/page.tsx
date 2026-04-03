"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Loader2, Calendar, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";

interface PaymentResult {
  payment: {
    merchantTxnNo: string;
    amount: number;
    status: string;
    responseCode: string;
    responseDesc: string;
    paymentId: string;
    paymentMode: string;
    paymentSubInstType: string;
    completedAt: string;
  };
  registration: {
    _id: string;
    formNumber: number;
    fullName: string;
    mncUID: string;
    mncRegistrationNumber: string;
    mobileNumber: string;
    paymentStatus: string;
    paymentUTR: string;
    registrationType: string;
    attendanceStatus: string;
    workshopId: {
      _id: string;
      title: string;
      date: string;
      venue: string;
      dayOfWeek: string;
      fee: number;
      credits: number;
    };
  };
}

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState("");

  const status = searchParams.get("status");
  const merchantTxnNo = searchParams.get("merchantTxnNo");
  const message = searchParams.get("message");

  const fetchPaymentResult = useCallback(async () => {
    try {
      // First attempt: force-refresh from gateway-backed reconciliation path.
      const freshResponse = await fetch(`/api/cne/payment/verify?merchantTxnNo=${merchantTxnNo}&forceRefresh=true`);
      const freshData = await freshResponse.json();

      if (freshData.success) {
        setResult(freshData);
      } else {
        // Fallback to local-only read so users still get the latest stored state.
        const response = await fetch(`/api/cne/payment/verify?merchantTxnNo=${merchantTxnNo}`);
        const data = await response.json();

        if (data.success) {
          setResult(data);
        } else {
          setError(data.error || "Could not fetch payment details");
        }
      }
    } catch (err) {
      setError("Failed to load payment details");
    } finally {
      setLoading(false);
    }
  }, [merchantTxnNo]);

  useEffect(() => {
    if (merchantTxnNo) {
      fetchPaymentResult();
    } else {
      setLoading(false);
    }
  }, [merchantTxnNo, fetchPaymentResult]);

  const handleRetryPayment = async () => {
    if (!result?.registration) return;
    setRetrying(true);
    setError("");

    try {
      const response = await fetch("/api/cne/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId: result.registration.workshopId?._id,
          fullName: result.registration.fullName,
          mncUID: result.registration.mncUID,
          mncRegistrationNumber: result.registration.mncRegistrationNumber,
          mobileNumber: result.registration.mobileNumber,
          registrationType: result.registration.registrationType,
        }),
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error || "Failed to retry payment. Please go back to the registration page.");
      }
    } catch (err) {
      setError("Failed to retry payment. Please try again.");
    } finally {
      setRetrying(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Error state (no merchantTxnNo or system error)
  if (status === "error" || (!merchantTxnNo && !result)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-red-200 shadow-xl">
            <CardHeader className="text-center bg-red-50 border-b">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-red-700">Payment Error</CardTitle>
              <CardDescription>
                {message ? decodeURIComponent(message) : "Something went wrong with your payment."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">
                Please try registering again. If the amount was debited, it will be refunded automatically.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Link href="/cne" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Registration Page
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Success state
  if (status === "success" && result?.registration?.paymentStatus === "success") {
    const reg = result.registration;
    const workshop = reg.workshopId;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-green-200 shadow-xl">
            <CardHeader className="text-center bg-green-50 border-b">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-700">Registration Successful!</CardTitle>
              <CardDescription>Your payment has been verified and registration is confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Your Form Number</p>
                  <p className="text-3xl font-bold text-blue-600">#{reg.formNumber}</p>
                </div>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Name:</span> {reg.fullName}</p>
                  <p><span className="font-medium">Workshop:</span> {workshop.title}</p>
                  <p><span className="font-medium">Date:</span> {formatDate(workshop.date)}</p>
                  <p className="flex items-start">
                    <span className="font-medium mr-2">Venue:</span>
                    <span className="flex-1">{workshop.venue}</span>
                  </p>
                  {result.payment?.paymentId && (
                    <p><span className="font-medium">Payment Ref:</span> {result.payment.paymentId}</p>
                  )}
                  {result.payment?.paymentMode && (
                    <p><span className="font-medium">Paid via:</span> {result.payment.paymentMode}{result.payment.paymentSubInstType ? ` (${result.payment.paymentSubInstType})` : ''}</p>
                  )}
                  <p><span className="font-medium">Amount:</span> ₹{result.payment?.amount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Link href="/cne/view-registration" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View & Download Registration
                </Button>
              </Link>
              <Link href="/cne" className="w-full">
                <Button variant="outline" className="w-full">
                  Register for Another Workshop
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Workshop full after payment
  if (status === "full") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-orange-200 shadow-xl">
            <CardHeader className="text-center bg-orange-50 border-b">
              <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-orange-700">Workshop Full</CardTitle>
              <CardDescription>
                The workshop filled up while your payment was being processed. Your payment will be refunded.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">
                Please contact the administration for assistance or check for other available workshops.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/cne" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Other Workshops
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Failed state — offer retry
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Card className="border-red-200 shadow-xl">
          <CardHeader className="text-center bg-red-50 border-b">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-red-700">Payment Failed</CardTitle>
            <CardDescription>
              {result?.payment?.responseDesc || "Your payment could not be completed. Please try again."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center space-y-4">
            {result?.registration && (
              <div className="text-left text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p><strong>Name:</strong> {result.registration.fullName}</p>
                <p><strong>MNC UID:</strong> {result.registration.mncUID}</p>
                {result.payment?.merchantTxnNo && (
                  <p><strong>Transaction Ref:</strong> {result.payment.merchantTxnNo}</p>
                )}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            <p className="text-gray-600 text-sm">
              If any amount was debited, it will be refunded automatically within 5-7 business days.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link href="/cne" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </Link>
            <Link href="/cne" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Workshops
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
