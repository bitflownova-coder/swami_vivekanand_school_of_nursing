'use client';

import HeroSection from '@/components/hero-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Building, Phone, Award, Heart, Stethoscope, GraduationCap, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api]);
  return (
    <div>
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Students Graduated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-sm md:text-base opacity-90">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <div className="text-sm md:text-base opacity-90">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">3.5</div>
              <div className="text-sm md:text-base opacity-90">Years Program</div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="h-4 w-4" />
                <span>Premier Nursing Institute</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to Excellence in <span className="text-blue-600">Nursing Education</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Welcome to <strong>Swami Vivekanand School of Nursing / Sai Care School of Nursing</strong>. 
                A premier institute for GNM nursing education in Maharashtra, dedicated to shaping 
                the future of healthcare through comprehensive education and training.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our institution combines modern facilities with experienced faculty to provide 
                students with the knowledge, skills, and values needed to excel in healthcare. 
                We focus on developing compassionate professionals who make a real difference 
                in patient care and community health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                  <Link href="/about" className="flex items-center">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2">
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Nursing students in clinical training"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-4 border-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Accredited</p>
                    <p className="text-sm text-gray-600">By INC & Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>Explore Our Offerings</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive programs and services designed to support your nursing education journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
              <Link href="/academic">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <BookOpen className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">Academic Programs</CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 mb-4">
                    Comprehensive GNM curriculum designed for nursing excellence and professional growth.
                  </p>
                  <div className="text-blue-600 font-semibold text-sm flex items-center justify-center group-hover:gap-2 transition-all">
                    Explore Programs
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
              <Link href="/admissions">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                    <Users className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">Admissions</CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 mb-4">
                    Learn about eligibility, fees, and step-by-step application process for enrollment.
                  </p>
                  <div className="text-green-600 font-semibold text-sm flex items-center justify-center group-hover:gap-2 transition-all">
                    Apply Now
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
              <Link href="/facilities">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                    <Building className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">Facilities</CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 mb-4">
                    Modern labs, smart classrooms, and comfortable hostel facilities for students.
                  </p>
                  <div className="text-purple-600 font-semibold text-sm flex items-center justify-center group-hover:gap-2 transition-all">
                    View Facilities
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-red-50 to-white relative overflow-hidden">
              <Link href="/contact">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                    <Phone className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-red-600 transition-colors">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 mb-4">
                    Get in touch with us for queries or information about our programs.
                  </p>
                  <div className="text-red-600 font-semibold text-sm flex items-center justify-center group-hover:gap-2 transition-all">
                    Contact Now
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Nursing education excellence"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Your Path to <span className="text-blue-600">Nursing Excellence</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors flex-shrink-0">
                    <Stethoscope className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Clinical Training</h3>
                    <p className="text-gray-600">Hands-on experience in real healthcare environments with state-of-the-art equipment and expert supervision.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-green-50 p-3 rounded-xl group-hover:bg-green-600 transition-colors flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Faculty Members</h3>
                    <p className="text-gray-600">Learn from 20+ experienced nursing professionals and medical experts dedicated to your success and growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-purple-50 p-3 rounded-xl group-hover:bg-purple-600 transition-colors flex-shrink-0">
                    <Heart className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Holistic Development</h3>
                    <p className="text-gray-600">Focus on character building, ethical values, and professional integrity alongside academic excellence.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-yellow-50 p-3 rounded-xl group-hover:bg-yellow-600 transition-colors flex-shrink-0">
                    <Award className="h-6 w-6 text-yellow-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Recognition</h3>
                    <p className="text-gray-600">Our graduates are highly sought after by leading healthcare institutions across Maharashtra and beyond.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>Campus Life</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Our Vibrant Campus
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Modern facilities, dedicated faculty, and a supportive learning environment that prepares you for a successful nursing career.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <Carousel 
                className="rounded-2xl overflow-hidden shadow-2xl"
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {[
                    "/IMG_20240815_083955.jpg",
                    "/IMG_20240815_082245.jpg",
                    "/IMG_20240815_082209.jpg",
                    "/IMG_20240815_081747.jpg",
                    "/IMG_20240810_164503.jpg",
                    "/IMG_20240710_140352.jpg"
                  ].map((src, idx) => (
                    <CarouselItem key={idx}>
                      <div className="flex justify-center items-center h-96 md:h-[600px] bg-gray-100">
                        <Image
                          src={src}
                          alt={`Campus life image ${idx + 1}`}
                          className="object-cover w-full h-full"
                          width={1200}
                          height={600}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>Student Impact</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Students Make a Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how our graduates are making meaningful contributions to healthcare and serving communities with dedication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="https://images.pexels.com/photos/4173258/pexels-photo-4173258.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Nursing graduate in action"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-bold mb-3">Making Healthcare Accessible</h3>
                <p className="text-base opacity-90 mb-4">Our graduates serve in hospitals, clinics, and community health centers across Maharashtra</p>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-5 w-5" />
                  <span>500+ Active Healthcare Professionals</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Nursing team collaboration"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-bold mb-3">Leading with Compassion</h3>
                <p className="text-base opacity-90 mb-4">Developing leaders who transform healthcare delivery with empathy and dedication</p>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-5 w-5" />
                  <span>95% Student Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4" />
              <span>Start Your Journey Today</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Start Your Nursing Career?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Join us in our mission to create compassionate healthcare professionals 
              who make a difference in the world. Your journey to excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl text-lg px-8 py-6 group">
                <Link href="/admissions" className="flex items-center">
                  Apply for Admission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                <Link href="/contact">Schedule Campus Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}