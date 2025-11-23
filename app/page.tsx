'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Building, Phone, Award, Heart, Stethoscope, GraduationCap, ArrowRight, CheckCircle, Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [api, setApi] = useState<any>();

  // Auto-scroll effect for the carousel
  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000); // Changed to 5 seconds for better viewing time
    return () => clearInterval(intervalId);
  }, [api]);

  const carouselImages = [
    "/IMG_20240815_083955.jpg",
    "/IMG_20240815_082245.jpg",
    "/IMG_20240815_082209.jpg",
    "/IMG_20240815_081747.jpg",
    "/IMG_20240810_164503.jpg",
    "/IMG_20240710_140352.jpg"
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION: Full Width Carousel at Start */}
      <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-gray-900">
        <Carousel 
          setApi={setApi} 
          className="w-full h-full"
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-ml-0">
            {carouselImages.map((src, idx) => (
              <CarouselItem key={idx} className="pl-0 relative w-full h-[600px] md:h-[700px]">
                <Image
                  src={src}
                  alt={`Campus Life ${idx + 1}`}
                  className="object-cover w-full h-full opacity-60" // Darkened for text readability
                  width={1920}
                  height={1080}
                  priority={idx === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Hidden controls on mobile, visible on desktop */}
          <div className="hidden md:block">
            <CarouselPrevious className="left-10 border-white text-white hover:bg-white hover:text-blue-900" />
            <CarouselNext className="right-10 border-white text-white hover:bg-white hover:text-blue-900" />
          </div>
        </Carousel>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <div className="inline-block px-6 py-2 rounded-full bg-blue-600/90 text-white font-bold tracking-wide uppercase text-sm mb-2 backdrop-blur-sm">
              Admissions Open for 2024-25
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
              Shaping the Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Healthcare
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
              Join a premier nursing institute dedicated to excellence, compassion, and professional growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-blue-900/20 border-0">
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 px-8 py-6 text-lg backdrop-blur-sm">
                <Link href="/contact">Visit Campus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION: Overlapping the Hero */}
      <section className="relative z-30 -mt-16 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-gray-100">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">500+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Graduates</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">100%</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Placement Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">20+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Expert Faculty</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">3.5</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Years Program</div>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION with LOGO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side: Content */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* LOGO PLACEHOLDER - Ensure image.jpg or logo.png is in public folder */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                   <Image 
                    src="/logo.png" // Replace with actual path to your logo 
                    alt="College Logo"
                    width={128}
                    height={128}
                    className="object-contain drop-shadow-md"
                   />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
                    <Star className="h-3 w-3 fill-blue-700" />
                    <span>Established Excellence</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Welcome to Swami Vivekanand School of Nursing
                  </h2>
                  <p className="text-xl text-blue-600 font-medium mt-2">
                    Premier Nursing Institute in Chh. Sambhajinagar
                  </p>
                </div>
              </div>
              
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  We are dedicated to shaping the future of healthcare through comprehensive education 
                  and practical training. Our institute combines modern facilities with experienced faculty 
                  to provide students with the knowledge, skills, and values needed to excel in the 
                  medical field.
                </p>
                <p>
                  Whether you are starting your journey in nursing or looking to advance your career, 
                  we provide the perfect environment for your professional growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button asChild variant="outline" className="border-blue-200 hover:border-blue-600 hover:bg-blue-50 text-blue-700 group">
                  <Link href="/about">
                    Read Our Story 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side: Feature Image */}
            <div className="flex-1 w-full max-w-lg md:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" 
                  alt="Nursing students"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <p className="font-bold text-lg">Recognized by INC & MNC</p>
                  <p className="text-sm opacity-90">Maharashtra Government Approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS CARDS - Simple & Modern */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Campus</h2>
            <p className="text-gray-600">Everything you need to know about our programs and facilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link href="/academic" className="group">
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
                <div className="h-2 bg-blue-500 w-0 group-hover:w-full transition-all duration-500"></div>
                <CardHeader>
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <BookOpen className="h-7 w-7 text-blue-600 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">Academic Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Comprehensive GNM & ANM curriculums designed for professional excellence.</p>
                  <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:gap-2 transition-all">
                    View Courses <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Card 2 */}
            <Link href="/admissions" className="group">
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
                <div className="h-2 bg-green-500 w-0 group-hover:w-full transition-all duration-500"></div>
                <CardHeader>
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <Users className="h-7 w-7 text-green-600 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Check eligibility, fee structures, and apply online for the upcoming session.</p>
                  <span className="text-green-600 font-semibold text-sm flex items-center group-hover:gap-2 transition-all">
                    Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3 */}
            <Link href="/facilities" className="group">
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
                <div className="h-2 bg-purple-500 w-0 group-hover:w-full transition-all duration-500"></div>
                <CardHeader>
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <Building className="h-7 w-7 text-purple-600 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">World-class labs, smart classrooms, and comfortable hostel accommodation.</p>
                  <span className="text-purple-600 font-semibold text-sm flex items-center group-hover:gap-2 transition-all">
                    Take a Tour <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Minimalist List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
             <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Clinical Training", desc: "Hands-on experience in top hospitals", color: "text-blue-600" },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Learn from industry veterans", color: "text-green-600" },
              { icon: Heart, title: "Holistic Growth", desc: "Focus on values & ethics", color: "text-red-600" },
              { icon: Award, title: "Best Placements", desc: "Career support & guidance", color: "text-yellow-600" },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4 ${item.color}`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / FOOTER PREVIEW */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Career?</h2>
          <p className="text-blue-100 mb-8 text-lg">Applications are now open for the 2024-25 academic session.</p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-6 text-lg rounded-full shadow-xl transition-transform hover:scale-105">
            <Link href="/admissions">Apply for Admission</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}