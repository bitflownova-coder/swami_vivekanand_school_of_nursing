import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Users, DollarSign, Calendar, GraduationCap, MapPin } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              Admissions Open 2024-25
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Join Our Nursing Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Swami Vivekanand School of Nursing GNM - Empowering future healthcare professionals 
            with comprehensive nursing education and practical training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
              Download Brochure
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">ANM</h3>
                <p className="text-gray-600">Program Offered</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">2 Years</h3>
                <p className="text-gray-600">Program Duration</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-purple-600 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
                <p className="text-gray-600">Placement Support</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-orange-600 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Sambhajinagar</h3>
                <p className="text-gray-600">Location</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Approved Curriculum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Government-approved ANM program designed to meet industry standards and regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clinical Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hands-on practical experience in top hospitals and healthcare facilities for comprehensive skill development.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn from experienced nursing professionals and educators dedicated to student success.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fee Structure - Updated Single Table */}
        <section className="mb-20">
          <Card className="shadow-2xl border-t-4 border-blue-600">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <DollarSign className="h-10 w-10" />
                Fee Structure 2023-25
              </CardTitle>
              <p className="text-center text-blue-100 mt-2">Swami Vivekanand School of Nursing GNM - Chh. Sambhajinagar</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Sr. No.
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Course
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Course Year
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Fee Type
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Development Fee
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Tuition Fee
                      </th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">
                        Total Per Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-blue-50 transition-colors">
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">1</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">ANM</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">2023-24</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">Approved Fee</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">₹4,545</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">₹45,455</td>
                      <td className="border border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">₹50,000</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">2</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">ANM</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">2024-25</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">Approved Fee</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">₹4,545</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">₹45,455</td>
                      <td className="border border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">₹50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg">
                <h4 className="font-bold text-yellow-900 mb-3 text-lg flex items-center gap-2">
                  <span className="text-2xl">ℹ️</span>
                  Important Fee Information
                </h4>
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>All fees are approved by the Maharashtra Nursing Council and regulatory authorities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Fees are subject to revision as per government guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Additional charges may apply for hostel accommodation, uniforms, books, and examination fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Flexible payment plans and scholarship opportunities available for eligible students</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Eligibility Criteria */}
        <section className="mb-20">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <CheckCircle className="h-10 w-10" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg">📚</span>
                    Academic Requirements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Educational Qualification</p>
                        <p className="text-gray-600 text-sm">
                          Passed 10th standard or equivalent from a recognized board
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Minimum Marks</p>
                        <p className="text-gray-600 text-sm">
                          Minimum 40% aggregate marks in 10th standard examination
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">English Proficiency</p>
                        <p className="text-gray-600 text-sm">
                          Basic knowledge of English language is required
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-lg">👤</span>
                    Personal Requirements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Age Criteria</p>
                        <p className="text-gray-600 text-sm">
                          Minimum 17 years and maximum 35 years as on December 31st of admission year
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Medical Fitness</p>
                        <p className="text-gray-600 text-sm">
                          Medical fitness certificate from a registered medical practitioner
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Character Certificate</p>
                        <p className="text-gray-600 text-sm">
                          Good moral character certificate from previous educational institution
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Application Process */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Simple Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
              <CardContent className="pt-10 pb-8">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Submit Application</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fill out and submit the admission application form with all required information
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-t-4 border-green-600">
              <CardContent className="pt-10 pb-8">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Document Verification</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Submit all required documents for verification and eligibility assessment
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-600">
              <CardContent className="pt-10 pb-8">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-yellow-600">3</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Interview & Counseling</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Attend personal interview and academic counseling session
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-t-4 border-purple-600">
              <CardContent className="pt-10 pb-8">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-purple-600">4</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Confirm Admission</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Complete admission formalities and fee payment to secure your seat
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-20">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <FileText className="h-10 w-10" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    Academic Documents
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="bg-blue-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">10th standard mark sheet and passing certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-blue-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">School leaving certificate (LC)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-blue-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Character certificate from previous institution</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-blue-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Migration certificate (if applicable)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">🆔</span>
                    Personal Documents
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="bg-purple-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Birth certificate or school leaving certificate for age proof</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-purple-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Caste certificate (if applicable)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-purple-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Medical fitness certificate from registered doctor</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-purple-600 w-2 h-2 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Passport size photographs (6 recent copies)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Important Dates */}
        <section className="mb-20">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <Calendar className="h-10 w-10" />
                Important Dates 2024-25
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gray-900 mb-6">Application Timeline</h4>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Application Start</span>
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">April 1st</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Application Deadline</span>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">June 30th</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Interview Period</span>
                    <span className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">July 1-15</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Admission Confirmation</span>
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">July 20th</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gray-900 mb-6">Academic Calendar</h4>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Session Begins</span>
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">August 1st</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Orientation Program</span>
                    <span className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold">Aug 1-7</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">Classes Start</span>
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">August 8th</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-900">First Semester End</span>
                    <span className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">Dec 31st</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <CardContent className="py-16 px-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Nursing Career?</h2>
              <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of successful nursing professionals who started their journey at 
                Swami Vivekanand School of Nursing. Apply now and secure your future in healthcare!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-xl">
                  Download Application Form
                </Button>
                <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-10 py-6 text-lg font-semibold">
                  Contact Admissions Office
                </Button>
              </div>
              <div className="mt-10 flex items-center justify-center gap-8 text-white">
                <div>
                  <p className="text-sm opacity-80">Call Us</p>
                  <p className="font-bold text-lg">+91 XXXXX XXXXX</p>
                </div>
                <div className="w-px h-12 bg-white opacity-30"></div>
                <div>
                  <p className="text-sm opacity-80">Email Us</p>
                  <p className="font-bold text-lg">admissions@svson.edu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}