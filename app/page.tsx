'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Building, Phone, Award, Heart, Stethoscope, GraduationCap, ArrowRight, CheckCircle, Star } from 'lucide-react';
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
    }, 5000);
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
    <div className="min-h-screen bg-white font-sans">
      
      {/* HERO SECTION */}
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
                  className="object-cover w-full h-full opacity-50"
                  width={1920}
                  height={1080}
                  priority={idx === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-10 border-white text-white hover:bg-blue-600 hover:border-blue-600" />
            <CarouselNext className="right-10 border-white text-white hover:bg-blue-600 hover:border-blue-600" />
          </div>
        </Carousel>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
          <div className="max-w-5xl space-y-6">
            <div className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-100 font-bold tracking-widest uppercase text-sm mb-2 bg-blue-900/40 backdrop-blur-sm">
              Admissions Open 2024-25
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wide leading-tight drop-shadow-lg uppercase">
              NURSING COLLEGE
            </h1>
            <p className="text-xl md:text-3xl text-blue-50 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md font-serif">
              Compassion, Care, and Excellence in Nursing Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg rounded-none uppercase tracking-wider font-semibold border-0">
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 px-10 py-6 text-lg rounded-none uppercase tracking-wider font-semibold">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-20">
          <div className="bg-white shadow-xl border-t-4 border-blue-600 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-serif font-bold text-blue-600">500+</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Graduates</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-serif font-bold text-blue-600">100%</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Placement</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-serif font-bold text-blue-600">20+</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Faculty</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-serif font-bold text-blue-600">3</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Years GNM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center space-x-2 text-blue-600 font-bold uppercase tracking-widest text-sm">
                <Star className="h-4 w-4 fill-blue-600" />
                <span>Legacy of Excellence</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Welcome to <br/>
                <span className="text-blue-600">Swami Vivekanand School of Nursing</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                A premier institute for GNM nursing education in Maharashtra, dedicated to shaping the future of healthcare. Our institution combines modern facilities with experienced faculty to provide students with the knowledge, skills, and values needed to excel in the medical field.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-none uppercase tracking-wider font-semibold px-8">
                  <Link href="/about">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative border-8 border-gray-50 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" 
                  alt="Nursing students"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS CARDS */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Explore Our Campus</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Academic Programs", icon: BookOpen, desc: "Comprehensive GNM curriculum designed for professional excellence.", link: "/academic" },
              { title: "Admissions", icon: Users, desc: "Check eligibility, fee structures, and apply online.", link: "/admissions" },
              { title: "Facilities", icon: Building, desc: "World-class labs, smart classrooms, and hostel accommodation.", link: "/facilities" }
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="group">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader className="border-b border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-600 transition-colors">
                      <item.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="text-xl text-center font-serif text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600 mb-6">{item.desc}</p>
                    <span className="text-blue-600 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-serif font-bold text-gray-900">Why Choose Us?</h2>
             <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Clinical Training", desc: "Hands-on experience in top hospitals" },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Learn from industry veterans" },
              { icon: Heart, title: "Holistic Growth", desc: "Focus on values & ethics" },
              { icon: Award, title: "Best Placements", desc: "Career support & guidance" },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 border border-gray-100 hover:border-blue-600 transition-colors group">
                <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to Start Your Career?</h2>
          <p className="text-blue-100 mb-10 text-xl font-light">Applications are now open for the 2024-25 academic session.</p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold px-12 py-6 text-lg rounded-none uppercase tracking-widest shadow-xl transition-transform hover:scale-105">
            <Link href="/admissions">Apply for Admission</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
