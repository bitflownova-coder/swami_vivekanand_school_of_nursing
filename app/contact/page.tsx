"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Users,
  ChevronDown,
  Facebook,
  Instagram,
  Send,
  User,
  GraduationCap,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "", phone: "", email: "", course: "", message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError("");
    try {
      const res = await fetch("/api/college/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          phone: contactForm.phone,
          email: contactForm.email,
          course: contactForm.course,
          message: contactForm.message,
          source: "contact",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactSubmitted(true);
        setContactForm({ name: "", phone: "", email: "", course: "", message: "" });
      } else {
        setContactError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setContactError("Network error. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer:
        "Candidates must have completed 12th standard with a minimum of 40% marks for the GNM program. Visit our Admissions page for detailed requirements and eligibility criteria.",
    },
    {
      question: "When does the academic session start?",
      answer:
        "The academic session typically begins in August. Application deadlines are usually in June. Check our Downloads section for the latest academic calendar.",
    },
    {
      question: "Do you provide hostel facilities?",
      answer:
        "Yes, we have separate hostel facilities for boys and girls with all necessary amenities including mess, laundry, and 24/7 security.",
    },
    {
      question: "What is the duration of the GNM program?",
      answer:
        "The GNM program is 3 years including practical training and internship for hands-on experience in healthcare settings.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes, scholarships are available for eligible students based on merit and financial need. Contact our admissions office for more details.",
    },
    {
      question: "How can I schedule a campus visit?",
      answer:
        "Contact us via phone at 7517275151 or email to schedule a campus tour and meet with our admissions team during office hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about our nursing programs? We&apos;re here to help
            you start your healthcare career journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        {/* Campus photo strip */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl relative" style={{ height: '280px' }}>
          <Image
            src="/photos/institute-building-front-view/1.jpg"
            alt="Swami Vivekanand School of Nursing campus building"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent flex items-center">
            <div className="px-8 sm:px-12">
              <div className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">Our Campus</div>
              <div className="text-white font-playfair font-bold text-2xl sm:text-3xl mb-1">Swami Vivekanand School of Nursing</div>
              <div className="text-slate-300 text-sm">Beed Bypass Road, Beside Surya Lawns, Aurangabad</div>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* College Contact */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-700 h-2 w-full"></div>
            <CardHeader className="bg-blue-50 pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="bg-blue-700 p-2 rounded-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                College Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Campus Address
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Beed Bypass Road, Beside Surya Lawns
                    <br />
                    Aurangabad, Maharashtra, India – 431009
                  </p>
                </div>
              </div>

              <a
                href="tel:7517275151"
                className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Phone className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-blue-700 font-medium">7517275151</p>
                </div>
              </a>

              <a
                href="mailto:swamivekanandschoolofnursing@gmail.com"
                className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-blue-700 text-sm break-all">
                    swamivekanandschoolofnursing@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="bg-white p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Office Hours
                  </h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>
                      Monday - Saturday:{" "}
                      <span className="font-medium">9:00 AM - 5:30 PM</span>
                    </p>
                    <p>
                      Sunday:{" "}
                      <span className="text-red-600 font-medium">Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Contact */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-700 h-2 w-full"></div>
            <CardHeader className="bg-slate-50 pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="bg-blue-700 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                Trust Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Trust Address
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Flat No. 04, Waheguru Complex
                    <br />
                    Pundalik Nagar Road, Near Gajanan Mandir
                    <br />
                    Chh. Sambhajinagar
                  </p>
                </div>
              </div>

              <a
                href="mailto:indrayanipratishthan51@gmail.com"
                className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-blue-700 text-sm break-all">
                    indrayanipratishthan51@gmail.com
                  </p>
                </div>
              </a>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-700" />
                  About INDRAYANI PRATISHTHAN
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The educational trust that manages and oversees the operations
                  of Swami Vivekanand School of Nursing. For administrative and
                  trust-related matters, please use this contact.
                </p>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/svs_of_nursing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg hover:shadow-lg transition-all text-white"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/swamivivekanandschoolofnursing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-3 rounded-lg hover:shadow-lg transition-all text-white"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-3xl text-center font-playfair text-gray-900">
                Send Us a Message
              </CardTitle>
              <p className="text-gray-600 text-center mt-2">
                Fill out the form below and we will get back to you shortly.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto">
                {contactSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-2xl mb-3">Message Received!</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      Thank you for reaching out. Our admissions team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={contactForm.phone}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                            }
                            required
                            pattern="[0-9]{10}"
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Email <span className="text-slate-400 font-normal text-xs">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        </div>
                      </div>
                      {/* Course */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Course Interest <span className="text-slate-400 font-normal text-xs">(optional)</span>
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <select
                            value={contactForm.course}
                            onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none bg-white"
                          >
                            <option value="">Select a course</option>
                            <option value="GNM (General Nursing & Midwifery)">GNM (General Nursing & Midwifery)</option>
                            <option value="Admission Enquiry">Admission Enquiry</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Message <span className="text-slate-400 font-normal text-xs">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <textarea
                          placeholder="Your message or questions..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {contactError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {contactError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {contactSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Submitting…
                        </span>
                      ) : (
                        <><Send className="h-5 w-5" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section with Accordion */}
        <section className="mb-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-3xl text-center font-playfair text-gray-900">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-blue-700 flex-shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                        <p className="text-gray-600 text-sm leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Maps Embed */}
        <section>
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-2xl text-center font-playfair text-gray-900">
                Find Us on Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.149368866256!2d75.3336833149136!3d19.87598798663405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc63%3A0x712d538b29a2a73e!2sAurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625561234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="College Location"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
