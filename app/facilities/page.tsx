import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Microscope, BookOpen, Wifi, Shield, Utensils } from 'lucide-react';

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            World-Class Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our state-of-the-art facilities provide students with the best learning 
            environment, combining modern technology with hands-on practical training.
          </p>
        </div>

        {/* Facilities Tabs */}
        <Tabs defaultValue="laboratories" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-12 h-12 bg-white shadow-sm rounded-lg p-1 border border-gray-100">
            <TabsTrigger 
              value="laboratories" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-gray-600 font-medium transition-all"
            >
              Laboratories
            </TabsTrigger>
            <TabsTrigger 
              value="classrooms" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-gray-600 font-medium transition-all"
            >
              Classrooms
            </TabsTrigger>
          </TabsList>

          {/* Laboratories */}
          <TabsContent value="laboratories" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-0 shadow-lg">
              <div className="h-2 bg-blue-600 w-full rounded-t-xl"></div>
              <CardHeader>
                <CardTitle className="text-3xl text-center flex items-center justify-center gap-3 text-gray-900 font-serif">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Microscope className="h-8 w-8 text-blue-600" />
                  </div>
                  Specialized Laboratories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                  Our laboratories are equipped with modern instruments and simulation mannequins 
                  to provide realistic hands-on training in various aspects of nursing care.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Nutrition Lab */}
                  <Card className="border-l-4 border-l-red-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-red-700 font-bold group-hover:text-red-600 transition-colors">Nutrition Laboratory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Comprehensive facility for learning nutrition principles and therapeutic diets.
                      </p>
                      <div className="space-y-2">
                        {["Diet planning equipment", "Food composition analysis tools", "Cooking demonstration area", "Nutritional assessment instruments"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fundamentals Lab */}
                  <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700 font-bold group-hover:text-blue-600 transition-colors">Fundamentals of Nursing Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Basic nursing skills training laboratory with advanced simulation equipment.
                      </p>
                      <div className="space-y-2">
                        {["Patient care mannequins", "Vital signs monitoring equipment", "Injection practice models", "Wound care simulation kits"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Child Health Lab */}
                  <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-green-700 font-bold group-hover:text-green-600 transition-colors">Child Health Nursing Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Specialized laboratory for pediatric nursing care training.
                      </p>
                      <div className="space-y-2">
                        {["Pediatric mannequins (various ages)", "Growth monitoring equipment", "Immunization training kits", "Pediatric emergency equipment"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Med-Surg Lab */}
                  <Card className="border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-700 font-bold group-hover:text-purple-600 transition-colors">Medical-Surgical Nursing Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Advanced laboratory for complex nursing procedures and surgical care.
                      </p>
                      <div className="space-y-2">
                        {["Surgical simulation equipment", "Advanced patient simulators", "Catheterization training models", "Emergency response equipment"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Maternity Lab */}
                  <Card className="border-l-4 border-l-pink-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-pink-700 font-bold group-hover:text-pink-600 transition-colors">Maternity Nursing Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Obstetric and gynecological nursing care training facility.
                      </p>
                      <div className="space-y-2">
                        {["Delivery simulation models", "Antenatal care equipment", "Neonatal care simulators", "Breastfeeding training aids"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Health Lab */}
                  <Card className="border-l-4 border-l-orange-500 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-orange-700 font-bold group-hover:text-orange-600 transition-colors">Community Health Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        Community health and public health nursing training laboratory.
                      </p>
                      <div className="space-y-2">
                        {["Epidemiology study materials", "Health education aids", "Disease prevention kits", "Home visit simulation setup"].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Laboratory Standards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Microscope className="h-5 w-5" /></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">State-of-the-art Equipment</h4>
                          <p className="text-sm text-gray-600">Regularly updated instruments matching hospital standards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Shield className="h-5 w-5" /></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Safety Protocols</h4>
                          <p className="text-sm text-gray-600">Strict adherence to safety guidelines and hygiene</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><BookOpen className="h-5 w-5" /></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Learning Resources</h4>
                          <p className="text-sm text-gray-600">Charts, models, and manuals for reference</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Wifi className="h-5 w-5" /></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Digital Integration</h4>
                          <p className="text-sm text-gray-600">Smart displays for demonstration videos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classrooms */}
          <TabsContent value="classrooms" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-0 shadow-lg">
              <div className="h-2 bg-green-600 w-full rounded-t-xl"></div>
              <CardHeader>
                <CardTitle className="text-3xl text-center flex items-center justify-center gap-3 text-gray-900 font-serif">
                  <div className="p-3 bg-green-100 rounded-full">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  Modern Learning Spaces
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                  Our classrooms are designed to facilitate effective learning with modern 
                  amenities and technology integration for an enhanced educational experience.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-800">Classroom Infrastructure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { title: "Spacious and Well-Ventilated", desc: "Large classrooms ensuring comfortable environment" },
                          { title: "Natural Lighting", desc: "Optimal natural light supplemented with LED systems" },
                          { title: "Ergonomic Furniture", desc: "Comfortable seating designed for extended sessions" },
                          { title: "Climate Control", desc: "Proper ventilation and temperature management" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-800">Digital Aids & Tech</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { title: "Smart Boards", desc: "Interactive whiteboards for multimedia presentations" },
                          { title: "Projector Systems", desc: "High-definition projectors for video content" },
                          { title: "Wi-Fi Connectivity", desc: "High-speed internet access for digital learning" },
                          { title: "Audio Systems", desc: "Clear sound systems for effective lecturing" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 transition-colors group">
                    <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Lecture Halls</h3>
                    <p className="text-gray-600 text-sm">
                      Large capacity halls for theoretical sessions and guest lectures
                    </p>
                  </div>

                  <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors group">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                      <Microscope className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tutorial Rooms</h3>
                    <p className="text-gray-600 text-sm">
                      Small group discussion rooms for interactive learning sessions
                    </p>
                  </div>

                  <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-300 transition-colors group">
                    <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                      <Wifi className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Classrooms</h3>
                    <p className="text-gray-600 text-sm">
                      Technology-integrated classrooms for modern learning experiences
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Additional Learning Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                        Library & Study Areas
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm pl-10">
                        <li>• Extensive nursing and medical literature</li>
                        <li>• Digital library access and e-books</li>
                        <li>• Quiet study areas and group discussion zones</li>
                        <li>• Reference materials and journals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                        Computer Lab
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm pl-10">
                        <li>• Modern computers with updated software</li>
                        <li>• Internet access for research purposes</li>
                        <li>• Digital learning platforms and simulations</li>
                        <li>• Technical support and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}