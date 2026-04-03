import { BookOpen, Users, Brain, MessageCircle, Shield, Lightbulb, CheckCircle, GraduationCap, FlaskConical, HeartPulse, Stethoscope, Clock, Award, ChevronRight, Target, BarChart3 } from 'lucide-react';

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* â”€â”€â”€ HERO â”€â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-blue-400 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">GNM Programme - Batch 2026-27</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl mb-6 leading-tight">
              Academic Programme
            </h1>
            <p className="text-xl opacity-80 leading-relaxed text-slate-300 mb-10">
              A rigorous three-year General Nursing &amp; Midwifery programme that blends evidence-based 
              theory with intensive clinical practice, preparing graduates to deliver compassionate, 
              competent care across all healthcare settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { value: '3 Years', label: 'Programme Duration' },
              { value: '6 Semesters', label: 'Academic Structure' },
              { value: 'INC Approved', label: 'Regulatory Body' },
              { value: 'Hospital-Based', label: 'Clinical Training' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl min-w-[140px]">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ PROGRAMME AT A GLANCE â”€â”€â”€ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {[
              { icon: Clock,         value: '3',     unit: 'Years',      label: 'Full-Time Duration' },
              { icon: GraduationCap, value: '6',     unit: 'Semesters',  label: 'Academic Terms' },
              { icon: HeartPulse,    value: '2000+', unit: 'Hours',      label: 'Clinical Practice' },
              { icon: Award,         value: '100%',  unit: 'Placement',  label: 'Supported' },
            ].map(({ icon: Icon, value, unit, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-blue-700" />
                </div>
                <div className="font-playfair text-3xl font-bold text-slate-900">{value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">{unit}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ ABOUT THE PROGRAMME â”€â”€â”€ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">About the Programme</span>
              </div>
              <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-6 leading-snug">
                General Nursing &amp;<br />Midwifery (GNM)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                The GNM programme is a comprehensive, three-year diploma course approved by the Indian 
                Nursing Council (INC) and affiliated with the State Nursing Registration Council. 
                It equips students with theoretical foundations and practical clinical competencies 
                required to function as professional nurses in hospitals, community health settings, 
                and specialised care units.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Students undergo rotational postings across medical, surgical, gynaecology, paediatrics, 
                orthopaedics, psychiatry, and community health departments, supplemented by simulation-lab 
                training and supervised bedside procedures.
              </p>
              <div className="space-y-3">
                {[
                  'INC & State Nursing Council approved curriculum',
                  'Structured internship at affiliated district hospital',
                  'Simulation lab with life-size patient mannequins',
                  'Dedicated placement & career guidance cell',
                  'Scholarship support for meritorious students',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 mb-6">
                <h3 className="font-playfair text-2xl font-bold mb-6">Programme Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Duration',     value: '3 Years (6 Semesters)' },
                    { label: 'Qualification', value: 'GNM Diploma' },
                    { label: 'Eligibility',  value: '10+2 with Science / Any Stream' },
                    { label: 'Min. Age',     value: '17 Years at time of admission' },
                    { label: 'Approval',     value: 'INC, State Nursing Council' },
                    { label: 'Intake',       value: '60 Seats per batch' },
                    { label: 'Medium',       value: 'English' },
                    { label: 'Session',      value: 'July - June' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="text-slate-400 text-sm">{label}</span>
                      <span className="text-white font-medium text-sm text-right max-w-[55%]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-blue-700 font-playfair">98%</div>
                  <div className="text-sm text-slate-500 mt-1">Board Exam Pass Rate</div>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-blue-700 font-playfair">15+</div>
                  <div className="text-sm text-slate-500 mt-1">Hospital Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CURRICULUM STRUCTURE â”€â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Curriculum</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">3-Year Programme Structure</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A carefully sequenced curriculum that builds clinical competence progressively 
              across six semesters, from foundational sciences to advanced specialised care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: 'Year 1', badge: 'bg-blue-700',
                title: 'Foundation & Basics', subtitle: 'Semesters 1 & 2',
                icon: BookOpen,
                subjects: ['Anatomy & Physiology', 'Microbiology & Nutrition', 'Fundamentals of Nursing', 'First Aid & Community Health', 'Health Education', 'Environmental Hygiene', 'Psychology & Sociology'],
              },
              {
                year: 'Year 2', badge: 'bg-slate-800',
                title: 'Medical & Surgical', subtitle: 'Semesters 3 & 4',
                icon: Stethoscope,
                subjects: ['Medical-Surgical Nursing I & II', 'Pharmacology', 'Pathology & Genetics', 'Medical Jurisprudence', 'Communicable Disease Nursing', 'Orthopaedic Nursing', 'Professional Trends in Nursing'],
              },
              {
                year: 'Year 3', badge: 'bg-blue-700',
                title: 'Advanced & Specialised', subtitle: 'Semesters 5 & 6',
                icon: HeartPulse,
                subjects: ['Child Health Nursing (Paediatrics)', 'Midwifery & Obstetric Nursing', 'Community Health Nursing', 'Psychiatric Nursing', 'Geriatric & Palliative Care', 'Nursing Research & Statistics', 'Supervised Internship'],
              },
            ].map(({ year, badge, title, subtitle, icon: Icon, subjects }) => (
              <div key={year} className="relative">
                <div className={`absolute -top-4 left-6 ${badge} text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full`}>{year}</div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden pt-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="px-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{title}</div>
                        <div className="text-xs text-slate-400">{subtitle}</div>
                      </div>
                    </div>
                  </div>
                  <ul className="p-6 space-y-2.5">
                    {subjects.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-slate-600 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ PROGRAMME OUTCOMES â”€â”€â”€ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Outcomes</span>
              </div>
              <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-6 leading-snug">
                What Our<br />Graduates Achieve
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our programme outcomes define the professional competencies every GNM graduate 
                will demonstrate upon completion - benchmarked against INC national standards 
                and industry best practices.
              </p>
              <div className="bg-blue-700 text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-300" />
                  <span className="font-bold text-lg">Graduate Profile</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Our graduates are prepared for immediate deployment in hospitals, 
                  community health centres, nursing homes, and international healthcare facilities.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { number: '01', icon: Brain,          title: 'Knowledge Application',      body: 'Apply comprehensive nursing knowledge in diverse healthcare settings to provide evidence-based patient care and promote health and wellness.' },
                { number: '02', icon: Shield,         title: 'Ethical Practice',           body: 'Demonstrate professional ethics, moral values, and legal responsibilities while maintaining patient confidentiality and dignity in all interactions.' },
                { number: '03', icon: Users,          title: 'Teamwork & Collaboration',   body: 'Work effectively as part of interdisciplinary healthcare teams and contribute to coordinated, high-quality patient care.' },
                { number: '04', icon: MessageCircle,  title: 'Professional Communication', body: 'Communicate effectively with patients, families, and healthcare professionals using therapeutic and professional communication techniques.' },
                { number: '05', icon: Lightbulb,      title: 'Critical Thinking',          body: 'Apply critical thinking and problem-solving skills to assess clinical situations and make sound, evidence-guided care decisions.' },
                { number: '06', icon: BookOpen,       title: 'Lifelong Learning',          body: 'Demonstrate commitment to continuous professional development and lifelong learning in a rapidly evolving healthcare environment.' },
              ].map(({ number, icon: Icon, title, body }) => (
                <div key={number} className="bg-white border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-700 flex items-center justify-center transition-colors duration-300">
                        <Icon className="h-5 w-5 text-blue-700 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-700 mb-1 tracking-wider">PO - {number}</div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">{title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CLINICAL TRAINING â”€â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Clinical Training</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Hands-On Clinical Experience</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Real-world clinical rotations across 10+ specialities ensure our students are 
              procedure-ready, safety-conscious, and professionally confident before graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
            {[
              { icon: HeartPulse,    dept: 'Medical & Surgical',         hours: '480 hrs',  desc: 'Rotational postings in general medicine and surgery wards covering acute care, wound management, and post-operative nursing under consultant supervision.' },
              { icon: Users,         dept: 'Obstetrics & Gynaecology',   hours: '320 hrs',  desc: 'Hands-on midwifery training including antenatal, intranatal, and postnatal care, conducting normal deliveries under direct clinical supervision.' },
              { icon: Brain,         dept: 'Psychiatry & Mental Health', hours: '160 hrs',  desc: 'Exposure to psychiatric assessment, therapeutic communication, and management of patients with common mental health disorders.' },
              { icon: Stethoscope,   dept: 'Paediatric & Neonatal',      hours: '240 hrs',  desc: 'Child health nursing across OPD, ward, and NICU settings covering growth assessment, immunisation, and paediatric emergency response.' },
              { icon: FlaskConical,  dept: 'Community Health',           hours: '320 hrs',  desc: 'Field postings at PHCs, sub-centres, and anganwadis for community health assessment, health education, family planning, and epidemiology.' },
              { icon: Shield,        dept: 'ICU / Critical Care',        hours: '160 hrs',  desc: 'Supervised ICU rotations covering cardiac monitoring, ventilator management, central line care, and hemodynamic monitoring.' },
            ].map(({ icon: Icon, dept, desc, hours }) => (
              <div key={dept} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group bg-white">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-700 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">{hours}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{dept}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Total Clinical Hours',  value: '2,000+' },
                { label: 'Speciality Rotations',  value: '10+'    },
                { label: 'Hospital Bed Strength', value: '500+'   },
                { label: 'Clinical Supervisors',  value: '25+'    },
              ].map(({ label, value }) => (
                <div key={label} className="border-r border-white/10 last:border-0">
                  <div className="font-playfair text-3xl font-bold text-blue-300 mb-1">{value}</div>
                  <div className="text-sm text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ COURSE LEARNING OUTCOMES â”€â”€â”€ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Course Outcomes</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Course Learning Outcomes</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Measurable outcomes tied to each course that ensure graduates meet national 
              and institutional nursing competency standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {[
              {
                icon: Shield, co: 'CO-1', title: 'Safe Nursing Care',
                desc: 'Provide safe, effective, and evidence-based nursing care that prioritises patient safety, dignity, and the prevention of healthcare-associated complications.',
                points: ['Infection prevention & control', 'Medication safety protocols', 'Fall & pressure injury prevention', 'Emergency response & resuscitation'],
              },
              {
                icon: Target, co: 'CO-2', title: 'Quality Nursing Practice',
                desc: 'Deliver high-quality nursing care that meets professional and regulatory standards, using evidence-based best practices to optimise patient outcomes.',
                points: ['Evidence-based practice', 'Patient-centred care planning', 'Continuous quality improvement', 'Outcome monitoring & evaluation'],
              },
              {
                icon: Users, co: 'CO-3', title: 'Leadership & Management',
                desc: 'Develop leadership qualities and management skills to effectively lead healthcare teams and drive service improvement in diverse clinical environments.',
                points: ['Ward management skills', 'Team coordination & delegation', 'Conflict & grievance resolution', 'Mentoring junior nursing staff'],
              },
              {
                icon: GraduationCap, co: 'CO-4', title: 'Cross-Sector Competence',
                desc: 'Demonstrate readiness to practice competently across hospital, community, long-term care, and specialised healthcare settings.',
                points: ['Acute & critical care', 'Community & primary health', 'Maternal & child health', 'Geriatric & palliative care'],
              },
            ].map(({ icon: Icon, co, title, desc, points }) => (
              <div key={co} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-900 text-white px-8 py-5 flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{title}</div>
                    <div className="text-slate-400 text-xs">Course Learning Outcome {co}</div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">{desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {points.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CTA â”€â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Admissions Open</span>
            <div className="w-8 h-0.5 bg-blue-400"></div>
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
            Begin Your Nursing Career
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Applications are now open for the 2026-27 GNM batch. Seats are limited - 
            take the first step towards a rewarding career in healthcare.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/admissions" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200">
              Apply Now
              <ChevronRight className="h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200">
              Contact Admissions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
