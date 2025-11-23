import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Brain, MessageCircle, Shield, Lightbulb } from 'lucide-react';

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              GNM Programme 2024-25
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Academic Excellence
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive nursing education designed to develop competent, compassionate, 
              and professional healthcare providers through our industry-leading GNM program.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <div className="px-6 py-3 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600">3 Years</div>
                <div className="text-sm text-gray-600">Programme Duration</div>
              </div>
              <div className="px-6 py-3 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Placement Support</div>
              </div>
              <div className="px-6 py-3 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-bold text-purple-600">Clinical</div>
                <div className="text-sm text-gray-600">Hands-on Training</div>
              </div>
            </div>
          </div>

          {/* Enhanced Academic Tabs */}
          <Tabs defaultValue="programme-outcomes" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12 bg-white shadow-lg rounded-xl p-2">
              <TabsTrigger 
                value="programme-outcomes" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Programme Outcomes
              </TabsTrigger>
              <TabsTrigger 
                value="specific-outcomes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Users className="h-4 w-4 mr-2" />
                Specific Outcomes
              </TabsTrigger>
              <TabsTrigger 
                value="course-outcomes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Shield className="h-4 w-4 mr-2" />
                Course Outcomes
              </TabsTrigger>
            </TabsList>

            {/* Programme Outcomes */}
            <TabsContent value="programme-outcomes" className="animate-in fade-in duration-500">
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                    <BookOpen className="h-10 w-10" />
                    Programme Outcomes - GNM
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-10">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our GNM programme outcomes focus on developing nursing professionals who can 
                      apply knowledge effectively, work ethically, collaborate in teams, and 
                      communicate professionally in healthcare settings.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <Brain className="h-10 w-10 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">Knowledge Application</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Apply comprehensive nursing knowledge in diverse healthcare settings 
                          to provide evidence-based patient care and promote health and wellness.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Shield className="h-10 w-10 text-green-600" />
                        </div>
                        <CardTitle className="text-xl">Ethical Practice</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Demonstrate professional ethics, moral values, and legal responsibilities 
                          while maintaining patient confidentiality and dignity in all interactions.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-white border-l-4 border-l-purple-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                          <Users className="h-10 w-10 text-purple-600" />
                        </div>
                        <CardTitle className="text-xl">Teamwork & Collaboration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Work effectively as part of interdisciplinary healthcare teams, 
                          contributing to coordinated patient care and positive health outcomes.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-red-50 to-white border-l-4 border-l-red-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                          <MessageCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <CardTitle className="text-xl">Professional Communication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Communicate effectively with patients, families, and healthcare 
                          professionals using appropriate therapeutic and professional communication skills.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-white border-l-4 border-l-yellow-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                          <Lightbulb className="h-10 w-10 text-yellow-600" />
                        </div>
                        <CardTitle className="text-xl">Critical Thinking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Apply critical thinking and problem-solving skills to assess patient 
                          conditions and make informed decisions for optimal care delivery.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-white border-l-4 border-l-indigo-500">
                      <CardHeader>
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                          <BookOpen className="h-10 w-10 text-indigo-600" />
                        </div>
                        <CardTitle className="text-xl">Lifelong Learning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          Demonstrate commitment to continuous professional development and 
                          lifelong learning in the evolving healthcare environment.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Programme Specific Outcomes */}
            <TabsContent value="specific-outcomes" className="animate-in fade-in duration-500">
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                    <Users className="h-10 w-10" />
                    Programme Specific Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-10">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our programme specific outcomes emphasize the application of medical knowledge, 
                      development of leadership qualities, and enhancement of critical thinking abilities 
                      essential for nursing professionals.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Brain className="h-7 w-7 text-blue-600" />
                          </div>
                          Medical Knowledge Application
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Apply comprehensive medical and nursing knowledge to assess, plan, 
                          implement, and evaluate patient care across various healthcare settings.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Clinical Applications
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Pathophysiology understanding</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Pharmacology applications</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Diagnostic procedure knowledge</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Treatment protocol implementation</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              Patient Care
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">✓</span>
                                <span>Holistic patient assessment</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">✓</span>
                                <span>Care plan development</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">✓</span>
                                <span>Evidence-based interventions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">✓</span>
                                <span>Outcome evaluation</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-7 w-7 text-green-600" />
                          </div>
                          Leadership Development
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Develop leadership qualities and management skills necessary to lead 
                          healthcare teams and improve patient outcomes in various clinical environments.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Leadership Skills
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Team management</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Decision making</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Conflict resolution</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Performance improvement</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-emerald-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Quality Management
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span>Quality assurance</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span>Process improvement</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span>Risk management</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span>Safety protocols</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-teal-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              Professional Growth
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-teal-500 mt-1">✓</span>
                                <span>Mentoring abilities</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-teal-500 mt-1">✓</span>
                                <span>Change management</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-teal-500 mt-1">✓</span>
                                <span>Innovation promotion</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-teal-500 mt-1">✓</span>
                                <span>Best practice implementation</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-violet-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Lightbulb className="h-7 w-7 text-purple-600" />
                          </div>
                          Critical Thinking Enhancement
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Enhance critical thinking abilities to analyze complex healthcare situations, 
                          make informed clinical decisions, and provide optimal patient care.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Analytical Skills
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">✓</span>
                                <span>Problem identification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">✓</span>
                                <span>Data analysis and interpretation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">✓</span>
                                <span>Pattern recognition</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">✓</span>
                                <span>Risk assessment</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-violet-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                              Decision Making
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-1">✓</span>
                                <span>Evidence evaluation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-1">✓</span>
                                <span>Priority setting</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-1">✓</span>
                                <span>Solution development</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-1">✓</span>
                                <span>Outcome prediction</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Outcomes */}
            <TabsContent value="course-outcomes" className="animate-in fade-in duration-500">
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                    <Shield className="h-10 w-10" />
                    Course Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our course outcomes emphasize the development of safe, quality nursing care 
                      delivery across all healthcare sectors with focus on patient safety, 
                      evidence-based practice, and professional competence.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 via-pink-50 to-red-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-red-500 to-pink-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-red-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-7 w-7 text-red-600" />
                          </div>
                          Safe Nursing Care
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Provide safe, effective, and compassionate nursing care that prioritizes 
                          patient safety and prevents healthcare-associated complications.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-400">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                              <Shield className="h-6 w-6 text-red-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Infection Control</h4>
                            <p className="text-sm text-gray-600">
                              Implement evidence-based infection prevention and control measures
                            </p>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-pink-400">
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                              <Shield className="h-6 w-6 text-pink-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Medication Safety</h4>
                            <p className="text-sm text-gray-600">
                              Ensure accurate medication administration and monitoring
                            </p>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-rose-400">
                            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3">
                              <Shield className="h-6 w-6 text-rose-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Patient Safety</h4>
                            <p className="text-sm text-gray-600">
                              Identify and mitigate potential safety risks and hazards
                            </p>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-orange-400">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                              <Shield className="h-6 w-6 text-orange-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Emergency Response</h4>
                            <p className="text-sm text-gray-600">
                              Respond effectively to medical emergencies and critical situations
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-7 w-7 text-blue-600" />
                          </div>
                          Quality Nursing Care
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Deliver high-quality nursing care that meets professional standards 
                          and promotes optimal patient outcomes across diverse healthcare settings.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Evidence-Based Practice
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Research utilization</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Best practice implementation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Clinical guideline adherence</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Outcome measurement</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-cyan-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                              Patient-Centered Care
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-1">✓</span>
                                <span>Individualized care planning</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-1">✓</span>
                                <span>Cultural competency</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-1">✓</span>
                                <span>Family involvement</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-1">✓</span>
                                <span>Holistic approach</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-sky-400">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                              Continuous Improvement
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start gap-2">
                                <span className="text-sky-500 mt-1">✓</span>
                                <span>Quality indicators monitoring</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-sky-500 mt-1">✓</span>
                                <span>Performance evaluation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-sky-500 mt-1">✓</span>
                                <span>Process optimization</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-sky-500 mt-1">✓</span>
                                <span>Professional development</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-teal-50 to-green-50 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                      <CardHeader className="bg-white bg-opacity-80">
                        <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-7 w-7 text-green-600" />
                          </div>
                          Cross-Sector Competence
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white bg-opacity-80 p-6">
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          Demonstrate competence in providing nursing care across various healthcare 
                          sectors including acute care, community health, long-term care, and specialized units.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              Healthcare Settings
                            </h4>
                            <div className="space-y-3">
                              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-400 hover:shadow-lg transition-shadow">
                                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                  <span className="text-green-600">•</span>
                                  Acute Care
                                </h5>
                                <p className="text-sm text-gray-600 pl-4">Hospitals, emergency departments, intensive care units</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-shadow">
                                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                  <span className="text-teal-600">•</span>
                                  Community Health
                                </h5>
                                <p className="text-sm text-gray-600 pl-4">Primary health centers, home care, public health</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-emerald-400 hover:shadow-lg transition-shadow">
                                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                  <span className="text-emerald-600">•</span>
                                  Specialized Care
                                </h5>
                                <p className="text-sm text-gray-600 pl-4">Pediatrics, maternity, geriatrics, mental health</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                              Core Competencies
                            </h4>
                            <div className="bg-white p-5 rounded-xl shadow-md">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Adaptability to different environments</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                                  <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Technology integration</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Interdisciplinary collaboration</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Resource optimization</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                                  <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Cultural sensitivity</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700">Professional communication</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}