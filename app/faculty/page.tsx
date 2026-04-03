import { GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Faculty & Tutors | Swami Vivekanand School of Nursing',
  description: 'Meet the qualified nursing faculty and tutors of Swami Vivekanand School of Nursing, verified by MSBNPE.',
};

const faculty = [
  { name: 'Rajashree Dattatray Jadhav' },
  { name: 'Ravina Luther Ghule' },
  { name: 'Vrushali Sunil Jadhav' },
  { name: 'Swati Hukumchand Rathod' },
  { name: 'Smita Sunil Bhuyagule' },
  { name: 'Snehal Ambadas Dhakane' },
  { name: 'Shubhangi Mohan Ade' },
  { name: 'Arati Rajaram Rathod' },
  { name: 'Rosemary Ajay Chandane' },
  { name: 'Anuja Balasaheb Kokate' },
  { name: 'Priti Shriram Hiwale' },
  { name: 'Namdev Shesherao Sogewad' },
  { name: 'Harshita Shirish Gaikwad' },
  { name: 'Aditya Rajendra Shelke' },
  { name: 'Gayatri Rangnath Ghule' },
  { name: 'Manisha Sarwel Kamble' },
  { name: 'Komal Dnyaneshwar Gaikwad' },
  { name: 'Hrushikesh Shivaji Sapkal' },
];

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Our Team</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight max-w-3xl">
            Faculty &amp; Tutors
          </h1>
          <p className="text-xl max-w-2xl opacity-80 leading-relaxed text-slate-300">
            Qualified nursing educators dedicated to shaping tomorrow&apos;s healthcare professionals at Swami Vivekanand School of Nursing.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
            <div className="text-4xl font-playfair font-bold text-blue-700 mb-1">{faculty.length}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Tutors</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
            <div className="text-4xl font-playfair font-bold text-blue-700 mb-1">GNM</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Programme</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center col-span-2 md:col-span-1">
            <div className="text-4xl font-playfair font-bold text-blue-700 mb-1">2025–26</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Academic Year</div>
          </div>
        </div>

        {/* Faculty grid */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-0.5 bg-blue-700"></div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Teaching Staff</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {faculty.map((member, i) => (
              <div
                key={member.name}
                className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm leading-snug">{member.name}</div>
                  <div className="text-xs text-blue-600 mt-0.5">B.Sc. Nursing &middot; GNM Tutor</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Verified by MSBNPE &mdash; Academic Year 2025&ndash;26
          </p>
        </div>

      </div>
    </div>
  );
}
