import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, Award, Heart, Target, Eye, CheckCircle, Star, BookOpen, Microscope } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="py-16">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 -mt-16 mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="h-4 w-4" />
            <span>About Our Institution</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Shaping Future Healthcare Leaders
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            INDRAYANI PRATISHTHAN is dedicated to providing exceptional nursing education 
            through our Swami Vivekanand School of Nursing / Sai Care School of Nursing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview Section with Image */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                A Legacy of <span className="text-blue-600">Excellence</span> in Nursing Education
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Swami Vivekanand School of Nursing / Sai Care School of Nursing stands as a beacon 
                of excellence in nursing education in Maharashtra. Established under the auspices 
                of INDRAYANI PRATISHTHAN, our institution is committed to nurturing the next 
                generation of healthcare professionals.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our college has been designed to provide comprehensive nursing education that 
                combines theoretical knowledge with practical skills, ensuring our graduates 
                are well-prepared to serve in various healthcare settings with competence and compassion.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in holistic development, focusing not just on academic excellence 
                but also on character building, ethical values, and professional integrity 
                that are essential for healthcare professionals.
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/8438979/pexels-photo-8438979.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Nursing education"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be recognized as a leading institution in nursing education, producing 
                  compassionate and skilled healthcare professionals who contribute significantly 
                  to improving healthcare delivery and community wellbeing across Maharashtra and beyond.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide comprehensive, quality nursing education that integrates theoretical 
                  knowledge with practical skills, foster ethical values and professional integrity, 
                  and prepare competent nurses dedicated to serving humanity with compassion.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the unique features that set our institution apart
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-white hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <Users className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-gray-600">
                  Highly qualified and experienced nursing professionals dedicated to student success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-white hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                  <Building className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Modern Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-gray-600">
                  State-of-the-art laboratories, well-equipped classrooms, and comfortable hostel facilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-yellow-50 to-white hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors">
                  <Award className="h-8 w-8 text-yellow-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Quality Education</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-gray-600">
                  Comprehensive curriculum aligned with industry standards and regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-red-50 to-white hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                  <Heart className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Compassionate Care</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-gray-600">
                  Focus on developing empathy, compassion, and ethical values in future nurses.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Expert faculty members"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>Our Team</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Learn from the <span className="text-blue-600">Best in the Field</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our faculty comprises experienced nursing professionals, medical experts, and 
                educational specialists who bring a wealth of knowledge and practical experience 
                to the classroom. Each faculty member is committed to providing personalized 
                attention and guidance to help students achieve their full potential.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Qualified Professionals</h4>
                    <p className="text-gray-600">Masters and PhD holders in nursing and related fields with extensive academic credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="bg-green-50 p-3 rounded-xl group-hover:bg-green-600 transition-colors flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Clinical Experience</h4>
                    <p className="text-gray-600">Extensive practical experience in diverse healthcare settings and specializations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="bg-purple-50 p-3 rounded-xl group-hover:bg-purple-600 transition-colors flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Dedicated Mentors</h4>
                    <p className="text-gray-600">Committed to individual student development, success, and professional growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section className="mb-20">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-12">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Building className="h-4 w-4" />
                  <span>Infrastructure</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  World-Class Facilities for Excellence
                </h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Our institution boasts modern infrastructure designed specifically for nursing 
                  education. From well-equipped laboratories that simulate real healthcare 
                  environments to comfortable learning spaces and residential facilities, 
                  every aspect of our campus is designed to enhance the learning experience.
                </p>
              </div>
              <div className="bg-white p-8 md:p-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-900">Educational Facilities</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700 ml-14">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Modern, well-ventilated classrooms with smart boards</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Specialized nursing laboratories with modern equipment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Digital learning aids and audio-visual equipment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Library with extensive nursing literature and journals</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-900">Student Amenities</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700 ml-14">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Separate hostels for boys and girls with modern amenities</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Safe and secure 24/7 campus environment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Clean and hygienic dining and common facilities</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Recreation areas and sports facilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Achievements in Numbers
              </h2>
              <p className="text-lg text-gray-600">
                Building excellence through measurable success
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-700 font-medium">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-gray-700 font-medium">Expert Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}