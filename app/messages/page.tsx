import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, User, GraduationCap, Sparkles } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Leadership & Vision</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight font-serif">
            Messages from Leadership
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Inspiring words from our Principal and Director about our unwavering commitment to excellence in nursing education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* Principal's Message */}
        <section className="mb-16">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-blue-600 h-2 w-full"></div>
            <CardContent className="p-0 md:flex">
              {/* Left Sidebar / Header for Desktop */}
              <div className="bg-blue-50 md:w-1/3 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-blue-100">
                <div className="bg-white p-4 rounded-full shadow-md mb-6">
                  <GraduationCap className="h-16 w-16 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2 font-serif">Principal&apos;s Message</h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-4"></div>
                <p className="font-semibold text-gray-800">Principal Name</p>
                <p className="text-sm text-gray-500">Swami Vivekanand School of Nursing</p>
              </div>

              {/* Right Content Area */}
              <div className="p-8 md:p-12 md:w-2/3 bg-white">
                <Quote className="h-10 w-10 text-blue-200 mb-4" />
                <blockquote className="text-xl text-blue-900 font-serif italic mb-8 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
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
            <div className="bg-green-600 h-2 w-full"></div>
            <CardContent className="p-0 md:flex flex-row-reverse">
              {/* Right Sidebar / Header for Desktop (Reversed) */}
              <div className="bg-green-50 md:w-1/3 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-l border-green-100">
                <div className="bg-white p-4 rounded-full shadow-md mb-6">
                  <User className="h-16 w-16 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-900 mb-2 font-serif">Director&apos;s Message</h2>
                <div className="w-16 h-1 bg-green-600 rounded-full mb-4"></div>
                <p className="font-semibold text-gray-800">Mr. Chandrakant Appasaheb Jadhav</p>
                <p className="text-sm text-gray-500">Director, INDRAYANI PRATISHTHAN</p>
              </div>

              {/* Left Content Area */}
              <div className="p-8 md:p-12 md:w-2/3 bg-white">
                <Quote className="h-10 w-10 text-green-200 mb-4" />
                <blockquote className="text-xl text-green-900 font-serif italic mb-8 leading-relaxed border-l-4 border-green-600 pl-6 py-2 bg-green-50/50 rounded-r-lg">
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
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Our Shared Commitment</h2>
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