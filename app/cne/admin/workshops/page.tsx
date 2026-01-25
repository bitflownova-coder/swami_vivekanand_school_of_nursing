"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Pencil, Trash2, ArrowLeft, Calendar, MapPin, 
  Users, CreditCard, Loader2, X, AlertCircle, CheckCircle, Upload, Image
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
  maxSeats: number;
  currentRegistrations: number;
  status: string;
  spotRegistrationEnabled: boolean;
  spotRegistrationLimit: number;
  currentSpotRegistrations: number;
  paymentQRCode: string;
  upiId: string;
}

const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const STATUS_OPTIONS = ['draft', 'upcoming', 'active', 'full', 'completed', 'cancelled'];

export default function AdminWorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    dayOfWeek: "MONDAY",
    venue: "",
    venueLink: "",
    fee: "",
    credits: "",
    maxSeats: "500",
    status: "draft",
    spotRegistrationEnabled: false,
    spotRegistrationLimit: "50",
    paymentQRCode: "",
    upiId: ""
  });

  const [qrUploadMode, setQrUploadMode] = useState<'url' | 'upload'>('url');
  const [qrPreview, setQrPreview] = useState<string>("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/cne/admin/check-session");
      const data = await response.json();
      
      if (!data.success || !data.authenticated) {
        router.push("/cne/admin");
        return;
      }
      
      await loadWorkshops();
      setLoading(false);
    } catch (err) {
      router.push("/cne/admin");
    }
  };

  const loadWorkshops = async () => {
    try {
      const response = await fetch("/api/cne/workshop");
      const data = await response.json();
      
      if (data.success) {
        setWorkshops(data.workshops);
      }
    } catch (err) {
      console.error("Error loading workshops:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      dayOfWeek: "MONDAY",
      venue: "",
      venueLink: "",
      fee: "",
      credits: "",
      maxSeats: "500",
      status: "draft",
      spotRegistrationEnabled: false,
      spotRegistrationLimit: "50",
      paymentQRCode: "",
      upiId: ""
    });
    setEditingWorkshop(null);
    setQrUploadMode('url');
    setQrPreview("");
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
    setError("");
    setQrUploadMode('url');
    setQrPreview("");
  };

  const openEditModal = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      title: workshop.title,
      description: workshop.description,
      date: new Date(workshop.date).toISOString().split('T')[0],
      dayOfWeek: workshop.dayOfWeek,
      venue: workshop.venue,
      venueLink: workshop.venueLink || "",
      fee: workshop.fee.toString(),
      credits: workshop.credits.toString(),
      maxSeats: workshop.maxSeats.toString(),
      status: workshop.status,
      spotRegistrationEnabled: workshop.spotRegistrationEnabled,
      spotRegistrationLimit: workshop.spotRegistrationLimit.toString(),
      paymentQRCode: workshop.paymentQRCode || "",
      upiId: workshop.upiId || ""
    });
    
    // Set QR preview if exists
    if (workshop.paymentQRCode) {
      setQrPreview(workshop.paymentQRCode);
      setQrUploadMode(workshop.paymentQRCode.startsWith('data:') ? 'upload' : 'url');
    } else {
      setQrPreview("");
      setQrUploadMode('url');
    }
    
    setShowModal(true);
    setError("");
  };

  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData(prev => ({ ...prev, paymentQRCode: base64 }));
      setQrPreview(base64);
      setError("");
    };
    reader.onerror = () => {
      setError('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  };

  const removeQRImage = () => {
    setFormData(prev => ({ ...prev, paymentQRCode: "" }));
    setQrPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = editingWorkshop 
        ? `/api/cne/workshop/${editingWorkshop._id}`
        : "/api/cne/workshop";
      
      const method = editingWorkshop ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fee: Number(formData.fee),
          credits: Number(formData.credits),
          maxSeats: Number(formData.maxSeats),
          spotRegistrationLimit: Number(formData.spotRegistrationLimit)
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingWorkshop ? "Workshop updated successfully" : "Workshop created successfully");
        setShowModal(false);
        resetForm();
        await loadWorkshops();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to save workshop");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (workshopId: string) => {
    if (!confirm("Are you sure you want to delete this workshop? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/cne/workshop/${workshopId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Workshop deleted successfully");
        await loadWorkshops();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to delete workshop");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'full': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/cne/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">Workshop Management</h1>
          </div>
          <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Workshop
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Workshops Grid */}
        {workshops.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No workshops created yet.</p>
              <Button onClick={openCreateModal} className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Workshop
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <Card key={workshop._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{workshop.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(workshop.status)}`}>
                      {workshop.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">{workshop.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(workshop.date)} ({workshop.dayOfWeek})
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {workshop.venue}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 mr-2" />
                    ₹{workshop.fee} | {workshop.credits} Credits
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {workshop.currentRegistrations} / {workshop.maxSeats} registered
                  </div>

                  {workshop.spotRegistrationEnabled && (
                    <div className="text-sm text-purple-600 font-medium">
                      Spot: {workshop.currentSpotRegistrations} / {workshop.spotRegistrationLimit}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => openEditModal(workshop)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(workshop._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingWorkshop ? "Edit Workshop" : "Create Workshop"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setShowModal(false); resetForm(); }}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Workshop Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dayOfWeek">Day of Week *</Label>
                    <select
                      id="dayOfWeek"
                      value={formData.dayOfWeek}
                      onChange={(e) => setFormData(prev => ({ ...prev, dayOfWeek: e.target.value }))}
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                      required
                    >
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="venueLink">Venue Link (Google Maps)</Label>
                    <Input
                      id="venueLink"
                      value={formData.venueLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, venueLink: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fee">Fee (₹) *</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={formData.fee}
                      onChange={(e) => setFormData(prev => ({ ...prev, fee: e.target.value }))}
                      required
                      min="0"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="credits">Credits *</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={formData.credits}
                      onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                      required
                      min="0"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxSeats">Maximum Seats *</Label>
                    <Input
                      id="maxSeats"
                      type="number"
                      value={formData.maxSeats}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxSeats: e.target.value }))}
                      required
                      min="1"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                      required
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={formData.upiId}
                      onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
                      placeholder="example@upi"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Payment QR Code</Label>
                    
                    {/* Toggle between URL and Upload */}
                    <div className="flex gap-2 mt-2 mb-3">
                      <Button
                        type="button"
                        size="sm"
                        variant={qrUploadMode === 'url' ? 'default' : 'outline'}
                        onClick={() => setQrUploadMode('url')}
                        className={qrUploadMode === 'url' ? 'bg-blue-600' : ''}
                      >
                        <Image className="h-4 w-4 mr-1" />
                        Enter URL
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={qrUploadMode === 'upload' ? 'default' : 'outline'}
                        onClick={() => setQrUploadMode('upload')}
                        className={qrUploadMode === 'upload' ? 'bg-blue-600' : ''}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Image
                      </Button>
                    </div>

                    {qrUploadMode === 'url' ? (
                      <Input
                        id="paymentQRCode"
                        value={formData.paymentQRCode.startsWith('data:') ? '' : formData.paymentQRCode}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, paymentQRCode: e.target.value }));
                          setQrPreview(e.target.value);
                        }}
                        placeholder="https://example.com/qr-code.png"
                        className="mt-1"
                      />
                    ) : (
                      <div className="space-y-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQRUpload}
                            className="hidden"
                            id="qr-upload"
                          />
                          <label htmlFor="qr-upload" className="cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload QR code image</p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG (max 2MB)</p>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* QR Preview */}
                    {qrPreview && (
                      <div className="mt-3 relative inline-block">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="relative">
                          <img 
                            src={qrPreview} 
                            alt="Payment QR Code" 
                            className="max-w-[150px] max-h-[150px] border rounded-lg shadow-sm"
                            onError={() => setQrPreview("")}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={removeQRImage}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        id="spotRegistrationEnabled"
                        checked={formData.spotRegistrationEnabled}
                        onChange={(e) => setFormData(prev => ({ ...prev, spotRegistrationEnabled: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="spotRegistrationEnabled">Enable Spot Registration</Label>
                    </div>
                    
                    {formData.spotRegistrationEnabled && (
                      <div>
                        <Label htmlFor="spotRegistrationLimit">Spot Registration Limit</Label>
                        <Input
                          id="spotRegistrationLimit"
                          type="number"
                          value={formData.spotRegistrationLimit}
                          onChange={(e) => setFormData(prev => ({ ...prev, spotRegistrationLimit: e.target.value }))}
                          min="1"
                          className="mt-1 max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingWorkshop ? "Update Workshop" : "Create Workshop"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
