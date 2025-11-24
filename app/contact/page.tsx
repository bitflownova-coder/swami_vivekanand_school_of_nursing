'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Building, Users, ChevronDown, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Candidates must have completed 12th standard with a minimum of 40% marks for the GNM program. Visit our Admissions page for detailed requirements and eligibility criteria."
    },
    {
      question: "When does the academic session start?",
      answer: "The academic session typically begins in August. Application deadlines are usually in June. Check our Downloads section for the latest academic calendar."
    },
    {
      question: "Do you provide hostel facilities?",
      answer: "Yes, we have separate hostel facilities for boys and girls with all necessary amenities including mess, laundry, and 24/7 security."
    },
    {
      question: "What is the duration of the GNM program?",
      answer: "The GNM program is 3 years including practical training and internship for hands-on experience in healthcare settings."
    },
    {
      question: "Are scholarships available?",
      answer: "Yes, scholarships are available for eligible students based on merit and financial need. Contact our admissions office for more details."
    },
    {
      question: "How can I schedule a campus visit?",
      answer: "Contact us via phone at 7517275151 or email to schedule a campus tour and meet with our admissions team during office hours."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight font-serif">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about our nursing programs? We&apos;re here to help you start your healthcare career journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* Contact Information Cards */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* College Contact */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-600 h-2 w-full"></div>
            <CardHeader className="bg-blue-50 pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                College Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Campus Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Beed Bypass Road<br />
                    Chh. Sambhajinagar, Maharashtra – 431005
                  </p>
                </div>
              </div>
              
              <a href="tel:7517275151" className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-blue-600 font-medium">7517275151</p>
                </div>
              </a>
              
              <a href="mailto:swamivekanandschoolofnursing@gmail.com" className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-blue-600 text-sm break-all">swamivekanandschoolofnursing@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="bg-white p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Monday - Saturday: <span className="font-medium">9:00 AM - 5:30 PM</span></p>
                    <p>Sunday: <span className="text-red-600 font-medium">Closed</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Contact */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-green-600 h-2 w-full"></div>
            <CardHeader className="bg-green-50 pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                Trust Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Trust Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Flat No. 04, Waheguru Complex<br />
                    Pundalik Nagar Road, Near Gajanan Mandir<br />
                    Chh. Sambhajinagar
                  </p>
                </div>
              </div>
              
              <a href="mailto:indrayanipratishthan51@gmail.com" className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-green-600 text-sm break-all">indrayanipratishthan51@gmail.com</p>
                </div>
              </a>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Building className="h-4 w-4 text-green-600" />
                  About INDRAYANI PRATISHTHAN
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The educational trust that manages and oversees the operations of Swami Vivekanand School of Nursing. 
                  For administrative and trust-related matters, please use this contact.
                </p>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Connect With Us</h4>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/svs_of_nursing/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg hover:shadow-lg transition-all text-white">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://www.facebook.com/swamivivekanandschoolofnursing/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-3 rounded-lg hover:shadow-lg transition-all text-white">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Form Embed */}
        <section className="mb-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-3xl text-center font-serif text-gray-900">Send Us a Message</CardTitle>
              <p className="text-gray-600 text-center mt-2">
                Fill out the form below and we will get back to you shortly.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full flex justify-center bg-white p-4">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfX3Q0SVVcbnh1LotfbiqXIuJTYRbEJfz92nd-Qc27Yh252NA/viewform?embedded=true"
                  width="100%" 
                  height="800" 
                  style={{ border: 0 }} 
                  title="Google Contact Form"
                  className="max-w-4xl mx-auto"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section with Accordion */}
        <section className="mb-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-3xl text-center font-serif text-gray-900">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-blue-600 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                        <p className="text-gray-600 text-sm leading-relaxed pt-4">{faq.answer}</p>
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
              <CardTitle className="text-2xl text-center font-serif text-gray-900">Find Us on Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.6421!2d75.3433!3d19.8767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzM2LjEiTiA3NcKwMjGNMzUuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
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