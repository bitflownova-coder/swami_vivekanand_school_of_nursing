import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Users, DollarSign, Calendar } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Admissions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our premier GNM nursing program and embark on a rewarding career 
            in healthcare. Learn about eligibility, fees, and application process.
          </p>
        </div>

        {/* Quick Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>GNM Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  3.5-year comprehensive General Nursing and Midwifery program
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  3.5 years including 6 months internship for practical experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Limited seats available - Apply early to secure your admission
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Requirements</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Educational Qualification</p>
                        <p className="text-gray-600 text-sm">
                          Passed 12th standard (HSC) or equivalent with Science stream
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Minimum Marks</p>
                        <p className="text-gray-600 text-sm">
                          Minimum 45% aggregate marks in Physics, Chemistry, and Biology
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">English Proficiency</p>
                        <p className="text-gray-600 text-sm">
                          English as a compulsory subject in 12th standard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Requirements</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Age Criteria</p>
                        <p className="text-gray-600 text-sm">
                          Minimum 17 years and maximum 35 years as on date of admission
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Medical Fitness</p>
                        <p className="text-gray-600 text-sm">
                          Medical fitness certificate from registered medical practitioner
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Character Certificate</p>
                        <p className="text-gray-600 text-sm">
                          Good moral character certificate from previous institution
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Fee Structure */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <DollarSign className="h-8 w-8 text-blue-600" />
                Fee Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Swami Vivekanand School of Nursing - GNM */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Swami Vivekanand School of Nursing - GNM
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Chh. Sambhajinagar</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Sr. No.
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Course Year
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Fee Type
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Development Fee
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Tuition Fee
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Total Per Year
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-gray-300 px-4 py-3">1</td>
                          <td className="border border-gray-300 px-4 py-3">2021-22</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,466</td>
                          <td className="border border-gray-300 px-4 py-3">₹42,534</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹47,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">2</td>
                          <td className="border border-gray-300 px-4 py-3">2022-23</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,466</td>
                          <td className="border border-gray-300 px-4 py-3">₹42,534</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹47,000</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-300 px-4 py-3">3</td>
                          <td className="border border-gray-300 px-4 py-3">2023-24</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,942</td>
                          <td className="border border-gray-300 px-4 py-3">₹47,058</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹52,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">4</td>
                          <td className="border border-gray-300 px-4 py-3">2024-25</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,942</td>
                          <td className="border border-gray-300 px-4 py-3">₹47,058</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹52,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Shri Swami Samarth Nursing School - ANM */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Shri Swami Samarth Nursing School - ANM
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Chh. Sambhajinagar</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-green-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Sr. No.
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Course Year
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Fee Type
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Development Fee
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Tuition Fee
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Total Per Year
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-gray-300 px-4 py-3">1</td>
                          <td className="border border-gray-300 px-4 py-3">2021-22</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">2</td>
                          <td className="border border-gray-300 px-4 py-3">2022-23</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-300 px-4 py-3">3</td>
                          <td className="border border-gray-300 px-4 py-3">2023-24</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">4</td>
                          <td className="border border-gray-300 px-4 py-3">2024-25</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-300 px-4 py-3">5</td>
                          <td className="border border-gray-300 px-4 py-3">2023-24</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">6</td>
                          <td className="border border-gray-300 px-4 py-3">2024-25</td>
                          <td className="border border-gray-300 px-4 py-3">Approved Fee</td>
                          <td className="border border-gray-300 px-4 py-3">₹4,545</td>
                          <td className="border border-gray-300 px-4 py-3">₹45,455</td>
                          <td className="border border-gray-300 px-4 py-3 font-bold">₹50,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="space-y-1 text-yellow-700 text-sm">
                  <li>• All fees are approved by the regulatory authorities</li>
                  <li>• Fees are subject to revision as per government guidelines</li>
                  <li>• Additional charges may apply for hostel, uniforms, books, and examination</li>
                  <li>• Payment plans and scholarship opportunities are available for eligible students</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Application Process */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <FileText className="h-8 w-8 text-purple-600" />
                Application Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Application Form</h4>
                  <p className="text-gray-600 text-sm">
                    Obtain and fill the admission application form completely
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Document Submission</h4>
                  <p className="text-gray-600 text-sm">
                    Submit all required documents with the application form
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-600">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interview</h4>
                  <p className="text-gray-600 text-sm">
                    Attend personal interview and document verification
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Admission</h4>
                  <p className="text-gray-600 text-sm">
                    Complete admission formalities and fee payment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Required Documents */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Academic Documents</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">10th standard mark sheet and certificate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">12th standard mark sheet and certificate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">School leaving certificate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Character certificate from previous institution</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Personal Documents</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Birth certificate or age proof</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Caste certificate (if applicable)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Medical fitness certificate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Passport size photographs (6 copies)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Important Dates */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Calendar className="h-8 w-8 text-red-600" />
                Important Dates & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Application Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-900">Application Start</span>
                      <span className="text-blue-600 font-semibold">April 1st</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-900">Application Deadline</span>
                      <span className="text-green-600 font-semibold">June 30th</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-gray-900">Interview Period</span>
                      <span className="text-yellow-600 font-semibold">July 1-15</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-gray-900">Admission Confirmation</span>
                      <span className="text-purple-600 font-semibold">July 20th</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Academic Calendar</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="font-medium text-gray-900">Academic Session Begins</span>
                      <span className="text-indigo-600 font-semibold">August 1st</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium text-gray-900">Orientation Program</span>
                      <span className="text-teal-600 font-semibold">August 1-7</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-gray-900">Regular Classes Start</span>
                      <span className="text-red-600 font-semibold">August 8th</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-gray-900">First Semester End</span>
                      <span className="text-orange-600 font-semibold">December 31st</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start your journey towards becoming a professional nurse today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Download Application Form
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Contact Admissions Office
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}