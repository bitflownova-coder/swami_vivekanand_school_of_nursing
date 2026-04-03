import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, Sparkles } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Leadership &amp; Vision</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-tight">
            Messages from Leadership
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Inspiring words from our Principal and Director about our unwavering commitment to excellence in nursing education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* Principal's Message */}
        <section className="mb-16">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-700 h-2 w-full"></div>
            <CardContent className="p-0 md:flex">
              {/* Left Sidebar — large portrait */}
              <div className="bg-blue-50 md:w-2/5 flex flex-col border-b md:border-b-0 md:border-r border-blue-100">
                <div className="relative w-full" style={{ minHeight: '380px' }}>
                  <Image
                    src="/photos/principal/1.jpg"
                    alt="Principal, Swami Vivekanand School of Nursing"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-playfair font-bold text-blue-900 mb-2">Principal&apos;s Message</h2>
                  <div className="w-16 h-1 bg-blue-700 rounded-full mx-auto mb-3"></div>
                  <p className="font-semibold text-gray-800">Principal Name</p>
                  <p className="text-sm text-gray-500">Swami Vivekanand School of Nursing</p>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="p-8 md:p-12 md:w-3/5 bg-white">
                <Quote className="h-10 w-10 text-blue-200 mb-4" />
                <blockquote className="text-xl text-blue-900 font-playfair italic mb-8 leading-relaxed border-l-4 border-blue-700 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
                  &quot;Welcome to Swami Vivekanand School of Nursing, where we are committed to nurturing the next generation of healthcare professionals. Our institution stands as a beacon of excellence, emphasizing holistic development alongside academic achievement.&quot;
                </blockquote>
                
                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                  <p>
                    At our institution, we believe that nursing is not just a profession but a calling to serve humanity with compassion, competence, and dedication. Our comprehensive GNM program is designed to equip students with the knowledge, skills, and values necessary to excel in the dynamic healthcare environment.
                  </p>
                  <p>
                    We emphasize holistic education that encompasses theoretical knowledge, practical skills, ethical values, and professional integrity. Our experienced faculty members are committed to providing personalized attention and guidance to help each student reach their full potential.
                  </p>
                  <p>
                    The healthcare sector is evolving rapidly, and we ensure our curriculum remains current with industry standards and emerging trends. Our state-of-the-art laboratories, modern classrooms, and clinical partnerships provide students with hands-on experience in real healthcare settings.
                  </p>
                  <p>
                    I encourage all our students to embrace the values of lifelong learning, professional excellence, and compassionate care. Together, we will continue to uphold our institution&apos;s reputation for producing competent and caring nursing professionals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Director's Message */}
        <section className="mb-16">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-700 h-2 w-full"></div>
            <CardContent className="p-0 md:flex flex-row-reverse">
              {/* Right Sidebar — large portrait (reversed) */}
              <div className="bg-slate-50 md:w-2/5 flex flex-col border-b md:border-b-0 md:border-l border-slate-100">
                <div className="relative w-full" style={{ minHeight: '380px' }}>
                  <Image
                    src="/photos/chandrakant-jadhav/1.jpg"
                    alt="Mr. Chandrakant Appasaheb Jadhav — Director, INDRAYANI PRATISHTHAN"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2">Director&apos;s Message</h2>
                  <div className="w-16 h-1 bg-blue-700 rounded-full mx-auto mb-3"></div>
                  <p className="font-semibold text-gray-800">Mr. Chandrakant Appasaheb Jadhav</p>
                  <p className="text-sm text-gray-500">Director, INDRAYANI PRATISHTHAN</p>
                </div>
              </div>

              {/* Left Content Area */}
              <div className="p-8 md:p-12 md:w-3/5 bg-white">
                <Quote className="h-10 w-10 text-blue-200 mb-4" />
                <blockquote className="text-xl text-blue-900 font-playfair italic mb-8 leading-relaxed border-l-4 border-blue-700 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
                  &quot;Education is the foundation of progress, and at INDRAYANI PRATISHTHAN, we are dedicated to building that foundation with unwavering commitment to excellence, service, and the betterment of society through quality nursing education.&quot;
                </blockquote>
                
                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                  <p>
                    As the Director of INDRAYANI PRATISHTHAN, I am proud to lead an institution that has consistently demonstrated excellence in nursing education. Our journey began with a simple yet powerful vision: to create healthcare professionals who would serve society with dedication and competence.
                  </p>
                  <p>
                    Our commitment extends beyond traditional education. We focus on developing well-rounded individuals who possess not only technical expertise but also the emotional intelligence and ethical grounding necessary for effective healthcare delivery. The nursing profession demands individuals who can combine scientific knowledge with human compassion.
                  </p>
                  <p>
                    At INDRAYANI PRATISHTHAN, we have invested significantly in creating an environment that fosters learning, growth, and innovation. Our modern facilities, experienced faculty, and industry partnerships ensure that our students receive education that is both comprehensive and contemporary.
                  </p>
                  <p>
                    We believe in the transformative power of education and its ability to create positive change in society. Our graduates go on to serve in various healthcare settings, making meaningful contributions to patient care and community health.
                  </p>
                  <p>
                    I invite you to join our community of learners, educators, and healthcare professionals. Together, we will continue to uphold the highest standards of nursing education and contribute to the noble cause of healthcare service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision Statement / Shared Commitment */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Our Shared Commitment</h2>
              <div className="w-24 h-1 bg-white/30 mx-auto mb-8 rounded-full"></div>
              <p className="text-lg md:text-xl text-purple-100 leading-relaxed font-light">
                &quot;Both our Principal and Director share a unified vision of excellence in nursing education. Together, they lead our institution with a commitment to developing healthcare professionals who will make a lasting positive impact on society through compassionate care, professional competence, and ethical practice.&quot;
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}