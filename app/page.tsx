'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Building, Phone, Award, Heart, Stethoscope, GraduationCap, ArrowRight, Star, MousePointerClick } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* HERO SECTION */}
      <section  className="relative h-[500px] md:h-[650px] w-full overflow-hidden bg-gray-900">
        <Carousel 
          setApi={setApi} 
          className="w-full"
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-ml-0">
            {carouselImages.map((src, idx) => (
              <CarouselItem key={idx} className="pl-0 relative w-full">
                {/* Container for responsive aspect ratio */}
                <div className="relative w-full h-[60vh] min-h-[500px] md:h-[800px]">
                  <Image
                    src={src}
                    alt={`Campus Life ${idx + 1}`}
                    fill
                    className="object-cover opacity-60"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-10 border-white/20 bg-black/20 text-white hover:bg-blue-600 hover:border-blue-600 backdrop-blur-sm transition-all" />
            <CarouselNext className="right-10 border-white/20 bg-black/20 text-white hover:bg-blue-600 hover:border-blue-600 backdrop-blur-sm transition-all" />
          </div>
        </Carousel>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
          <div className="max-w-5xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 border border-blue-400/30 text-blue-100 font-bold tracking-widest uppercase text-xs md:text-sm bg-blue-900/40 backdrop-blur-md rounded-full shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Admissions Open 2024-25
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              NURSING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">COLLEGE</span>
            </h1>
            
            <p className="text-base md:text-2xl text-gray-200 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md leading-relaxed px-2">
              Compassion, Care, and Excellence in Nursing Education. <br className="hidden md:block"/> Shaping the future of healthcare professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-4 md:pt-8 px-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold shadow-blue-900/50 shadow-lg transition-all hover:scale-105">
                <Link href="/admissions" className="flex items-center gap-2">
                  Apply Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/5 hover:bg-white hover:text-blue-900 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105">
                <Link href="/contact">Visit Campus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      {/* <section className="relative z-30 -mt-16 md:-mt-20 px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-2xl rounded-2xl border-t-4 border-blue-600 p-6 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-gray-100">
            {[
              { label: "Graduates", value: "500+", suffix: "Alumni" },
              { label: "Placement", value: "100%", suffix: "Success" },
              { label: "Faculty", value: "20+", suffix: "Experts" },
              { label: "Experience", value: "15+", suffix: "Years" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1 group cursor-default">
                <div className="text-3xl md:text-5xl font-serif font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300 origin-center inline-block">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                <div className="text-[10px] text-blue-400 font-medium">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* WELCOME SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 text-blue-600 font-bold uppercase tracking-widest text-sm bg-blue-50 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-blue-600" />
                <span>Legacy of Excellence</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Welcome to <br/>
                <span className="text-blue-600">Swami Vivekanand School of Nursing</span>
              </h2>
              
              <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  A premier institute for GNM nursing education in Maharashtra, dedicated to shaping the future of healthcare. Our institution combines modern facilities with experienced faculty to provide students with the knowledge, skills, and values needed to excel in the medical field.
                </p>
                <p>
                  We believe in nurturing not just skilled professionals, but compassionate caregivers who make a real difference in patients&apos; lives.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 h-12 text-base transition-all w-full sm:w-auto">
                  <Link href="/about">Read Our Story</Link>
                </Button>
                <Button asChild variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-12 text-base w-full sm:w-auto justify-center">
                  <Link href="/vision-mission" className="flex items-center gap-2">
                    Our Mission <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full relative group mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image 
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" 
                  alt="Nursing students in classroom"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-bold text-lg">State-of-the-art Facilities</p>
                  <p className="text-sm opacity-90">Modern labs & classrooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS CARDS */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Explore Our Campus</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Everything you need to build a successful career in healthcare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Academic Programs", 
                icon: BookOpen, 
                desc: "Comprehensive GNM curriculum designed for professional excellence with practical exposure.", 
                link: "/academic",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                title: "Admissions", 
                icon: MousePointerClick, 
                desc: "Seamless admission process. Check eligibility, fee structures, and apply online today.", 
                link: "/admissions",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              { 
                title: "Campus Facilities", 
                icon: Building, 
                desc: "World-class labs, smart classrooms, library, and comfortable hostel accommodation.", 
                link: "/facilities",
                color: "text-purple-600",
                bg: "bg-purple-50"
              }
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="group h-full block">
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2 overflow-hidden">
                  <div className={`h-2 w-full ${item.bg.replace('bg-', 'bg-').replace('50', '500')}`}></div>
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-20 h-20 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-10 w-10 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-8 flex-grow">{item.desc}</p>
                    <span className={`font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${item.color} group-hover:gap-3 transition-all`}>
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose Us?</h2>
             <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Clinical Training", desc: "Hands-on experience in top affiliated hospitals." },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Learn from industry veterans and medical experts." },
              { icon: Heart, title: "Holistic Growth", desc: "Focus on professional ethics, values & character." },
              { icon: Award, title: "100% Placement", desc: "Career guidance and placement support for all." },
            ].map((item, idx) => (
              <div key={idx} className="relative p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group hover:bg-blue-50/30">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <item.icon className="h-24 w-24 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <item.icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-24 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-10 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Join a community of dedicated professionals. Applications are now open for the 2024-25 academic session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-7 text-lg shadow-xl transition-transform hover:scale-105">
              <Link href="/admissions">Apply for Admission</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-400 text-blue-600 hover:bg-blue-800 hover:text-white px-10 py-7 text-lg font-bold">
              <Link target='_blank' href='https://drive.google.com/file/d/1MxykBvnYmWZQ3cqvCMbHLo9IFS6NxMjC/view'>Download Brochure</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}