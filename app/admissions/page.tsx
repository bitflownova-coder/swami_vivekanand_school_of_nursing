import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Users, DollarSign, Calendar, GraduationCap, MapPin, ArrowRight, Download } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section with Background Pattern */}
      <div className="relative bg-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Admissions Open for 2024-25 Batch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Nursing</span> Starts Here
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Join Swami Vivekanand School of Nursing GNM. Empowering the next generation of healthcare leaders with compassion, skill, and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white px-8 py-6 text-lg font-semibold">
              Download Brochure <Download className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-24">
        {/* Floating Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, title: "ANM", subtitle: "Program Offered", color: "text-blue-600", border: "border-blue-600" },
            { icon: Clock, title: "2 Years", subtitle: "Full-Time Duration", color: "text-green-600", border: "border-green-600" },
            { icon: Users, title: "100%", subtitle: "Placement Assistance", color: "text-purple-600", border: "border-purple-600" },
            { icon: MapPin, title: "Sambhajinagar", subtitle: "Prime Location", color: "text-orange-600", border: "border-orange-600" }
          ].map((stat, index) => (
            <Card key={index} className={`text-center border-t-4 ${stat.border} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white`}>
              <CardContent className="pt-8 pb-6">
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-3 opacity-90`} />
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.title}</h3>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Program Highlights */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Program?</h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <CheckCircle className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Approved Curriculum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Government-recognized ANM curriculum rigorously designed to meet national nursing standards and regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <FileText className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clinical Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  Extensive hands-on practical experience in affiliated multi-specialty hospitals to ensure real-world readiness.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn from a dedicated team of experienced nursing professionals and medical experts committed to your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="mb-24 scroll-mt-24" id="fees">
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gray-900 text-white py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-400" />
                    </div>
                    Fee Structure
                  </CardTitle>
                  <p className="text-gray-400 mt-2 ml-1">Academic Years 2023-25 • ANM Program</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm text-gray-400">Swami Vivekanand School of Nursing</p>
                  <p className="text-xs text-gray-500">Chh. Sambhajinagar</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-extrabold text-gray-900">Sr. No.</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900">Course</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900">Year</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900">Fee Type</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900 text-right">Development</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900 text-right">Tuition</th>
                      <th className="px-6 py-4 font-extrabold text-gray-900 text-right bg-blue-50/50">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">1</td>
                      <td className="px-6 py-4 font-bold text-blue-600">ANM</td>
                      <td className="px-6 py-4 text-gray-600">2023-24</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Approved</span></td>
                      <td className="px-6 py-4 text-right font-mono text-gray-600">₹4,545</td>
                      <td className="px-6 py-4 text-right font-mono text-gray-600">₹45,455</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-lg text-blue-600 bg-blue-50/30">₹50,000</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">2</td>
                      <td className="px-6 py-4 font-bold text-blue-600">ANM</td>
                      <td className="px-6 py-4 text-gray-600">2024-25</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Approved</span></td>
                      <td className="px-6 py-4 text-right font-mono text-gray-600">₹4,545</td>
                      <td className="px-6 py-4 text-right font-mono text-gray-600">₹45,455</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-lg text-blue-600 bg-blue-50/30">₹50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50/50 p-6 border-t border-yellow-100">
                <div className="flex gap-4">
                  <div className="p-2 bg-yellow-100 rounded-full h-fit">
                    <DollarSign className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm uppercase tracking-wide mb-2">Fee Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-yellow-800/80">
                      <p>• Approved by Maharashtra Nursing Council.</p>
                      <p>• Additional fees for hostel, uniform & exams apply.</p>
                      <p>• Fees subject to government revision.</p>
                      <p>• Scholarship options available for eligible students.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Eligibility - Takes up 2 columns */}
          <section className="lg:col-span-2">
            <Card className="h-full shadow-lg border-0">
              <CardHeader className="border-b bg-gray-50/50 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">1</span>
                      Academic Requirements
                    </h4>
                    <ul className="space-y-3 pl-10">
                      <li className="flex items-start gap-3 text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span>Passed 10th standard (SSC) or equivalent from a recognized board.</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span>Minimum <strong>40% aggregate marks</strong> in the qualifying examination.</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span>Basic proficiency in English is required.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">2</span>
                      Personal Requirements
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-10">
                      <li className="bg-gray-50 p-3 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Age Limit</span>
                        <span className="font-medium text-gray-900">17 - 35 Years</span>
                      </li>
                      <li className="bg-gray-50 p-3 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Health</span>
                        <span className="font-medium text-gray-900">Medical Fitness Cert.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Application Timeline - Takes up 1 column */}
          <section>
            <Card className="h-full shadow-lg border-0 bg-blue-900 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Calendar className="h-6 w-6 text-blue-300" />
                  Key Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-l border-blue-700 ml-3 space-y-8 py-2">
                  {[
                    { label: "Application Start", date: "April 1st", color: "bg-green-400" },
                    { label: "Deadline", date: "June 30th", color: "bg-yellow-400" },
                    { label: "Interviews", date: "July 1-15", color: "bg-orange-400" },
                    { label: "Session Begins", date: "August 1st", color: "bg-white" }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${item.color} ring-4 ring-blue-900`}></div>
                      <p className="text-blue-300 text-xs uppercase tracking-wider font-bold">{item.label}</p>
                      <p className="text-xl font-bold">{item.date}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8 bg-white text-blue-900 hover:bg-blue-50 font-bold">
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Application Steps */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Apply</h2>
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 hidden md:block transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Register", desc: "Create account & fill form" },
                { step: "02", title: "Upload", desc: "Submit required documents" },
                { step: "03", title: "Verify", desc: "Document verification" },
                { step: "04", title: "Pay Fee", desc: "Confirm your admission" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 ring-4 ring-white">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-12 md:p-16 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg md:text-xl text-blue-100 mb-10">
                Don&apos;t miss the opportunity to study at one of Maharashtra&apos;s premier nursing institutes. 
                Limited seats available for the upcoming session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-7 text-lg font-bold shadow-xl">
                  Begin Application
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg font-bold">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}