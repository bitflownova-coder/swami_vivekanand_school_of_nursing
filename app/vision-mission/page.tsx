import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Award, CheckCircle, Star, Lightbulb, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function VisionMissionPage() {
  return (
    <div className="py-16">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-24 -mt-16 mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="h-4 w-4" />
            <span>Our Guiding Principles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Vision, Mission & Quality Policy
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Our guiding principles that shape every aspect of nursing education 
            and professional development at our institution.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Eye className="h-4 w-4" />
                <span>Our Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Shaping Tomorrow&apos;s <span className="text-blue-600">Healthcare Heroes</span>
              </h2>
              <blockquote className="text-2xl text-blue-900 font-medium italic mb-8 border-l-4 border-blue-600 pl-6">
                To nurture nursing professionals who serve society with compassion and competence.
              </blockquote>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our vision encompasses the development of healthcare professionals who not only 
                possess technical expertise but also embody the values of empathy, dedication, 
                and service to humanity.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We strive to create nurses who will make a meaningful difference in the lives 
                of patients and communities they serve, setting new standards in compassionate 
                healthcare delivery.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/7578836/pexels-photo-7578836.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Vision for nursing education"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-4 border-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Visionary</p>
                    <p className="text-sm text-gray-600">Education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Mission driven education"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-4 border-green-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Mission</p>
                    <p className="text-sm text-gray-600">Driven</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Target className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Excellence in <span className="text-green-600">Holistic Education</span>
              </h2>
              <blockquote className="text-2xl text-green-900 font-medium italic mb-8 border-l-4 border-green-600 pl-6">
                To provide holistic nursing education and develop professional excellence in care and service.
              </blockquote>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <Lightbulb className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Educational Excellence</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Comprehensive theoretical and practical training</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Evidence-based nursing practices</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Continuous curriculum updates</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Integration of modern healthcare technologies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Professional Development</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Leadership and management skills</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Ethical and professional values</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Critical thinking and problem-solving</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Lifelong learning commitment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Policy Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4" />
              <span>Quality Policy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Commitment to <span className="text-yellow-600">Excellence</span>
            </h2>
            <blockquote className="text-2xl text-yellow-900 font-medium italic max-w-4xl mx-auto border-l-4 border-yellow-600 pl-6 text-left">
              To promote excellence through continuous evaluation, professional development, and hands-on training.
            </blockquote>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Continuous Evaluation Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Continuous Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  We implement comprehensive assessment methods to monitor student progress 
                  and institutional effectiveness.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h5 className="font-bold text-gray-900 mb-1">Academic Assessment</h5>
                    <p className="text-sm text-gray-600">Regular testing and practical evaluations</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h5 className="font-bold text-gray-900 mb-1">Clinical Competency</h5>
                    <p className="text-sm text-gray-600">Skills-based assessments in real settings</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h5 className="font-bold text-gray-900 mb-1">Professional Growth</h5>
                    <p className="text-sm text-gray-600">360-degree feedback and mentoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Development Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Professional Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Our commitment to faculty and student development ensures excellence 
                  in teaching and learning.
                </p>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">Faculty Development</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Regular training workshops</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Research and publication support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Professional conferences</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">Student Support</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Academic mentoring programs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Career guidance and counseling</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Leadership development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hands-on Training Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Hands-on Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Practical experience is at the core of our educational approach through 
                  comprehensive clinical training programs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-purple-100">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Real healthcare scenarios</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-purple-100">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Modern clinical facilities</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-purple-100">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Expert supervision</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-purple-100">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Competency building</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Framework */}
        <section className="mb-20">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Implementation Framework</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Our systematic approach to achieving and maintaining excellence
              </p>
            </div>
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Plan</h4>
                  <p className="text-gray-600">Strategic planning and goal setting for excellence</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-green-600">2</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Execute</h4>
                  <p className="text-gray-600">Implementation of quality programs and initiatives</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-yellow-600">3</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Monitor</h4>
                  <p className="text-gray-600">Continuous assessment and feedback collection</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-purple-600">4</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Improve</h4>
                  <p className="text-gray-600">Continuous enhancement and optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}