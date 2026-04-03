import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">About Our Institution</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight max-w-3xl">
            Shaping Future Healthcare Leaders
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl opacity-80 leading-relaxed text-slate-300">
            INDRAYANI PRATISHTHAN is dedicated to providing exceptional nursing education 
            through Swami Vivekanand School of Nursing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section with Image */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
              </div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
                A Legacy of <span className="text-blue-700">Excellence</span> in Nursing Education
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Swami Vivekanand School of Nursing stands as a beacon 
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
                  src="/photos/institute-building-front-view/1.jpg" 
                  alt="Swami Vivekanand School of Nursing campus building"
                  className="w-full h-96 md:h-[500px] object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="bg-slate-50 rounded-2xl p-12 border border-slate-100">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">By the Numbers</span>
                <div className="w-8 h-0.5 bg-blue-700"></div>
              </div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-slate-900 mb-4">
                Our Achievements in Numbers
              </h2>
              <p className="text-lg text-gray-600">
                Building excellence through measurable success
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-playfair font-bold text-blue-700 mb-2">500+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-playfair font-bold text-blue-700 mb-2">95%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-playfair font-bold text-blue-700 mb-2">20+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Expert Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-playfair font-bold text-blue-700 mb-2">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}