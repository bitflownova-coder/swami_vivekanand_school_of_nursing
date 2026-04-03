import { Target, CheckCircle, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Aims & Objectives | Swami Vivekanand School of Nursing',
  description: 'The aims and objectives of the GNM nursing programme at Swami Vivekanand School of Nursing.',
};

const aims = [
  'To prepare individuals to assume responsibilities as professional, competent nurses and midwives in providing, preventive, curative and rehabilitative service in rural area.',
  'Prepare nurses who can make independent decision in nursing situations, protect the right of and facilitate individuals and groups in pursuit of health, function in the hospital, community nursing services in rural area.',
];

const objectives = [
  'Apply knowledge from physical, biological and behavioral sciences, medicine including alternative systems and nursing in providing nursing care to individuals, families and communities in villages.',
  'Provide nursing care based on steps of nursing process in collaboration with the individuals quality care.',
  'Demonstrate critical thinking skill in making decisions in all situations in order to provide quality care.',
  'Utilize the latest trends and technology in providing health care.',
  'Provide promotive, preventive and restorative health services in line with the national health policies and programmes.',
  'Participate effectively as Members of the health team in health care delivery system in rural areas.',
];

const generalObjectives = [
  'At the end of the training programme, the students of Health worker shall demonstrate the ability to plan & carry out job responsibilities assigned to her under the multipurpose health workers scheme.',
];

const specificObjectives = [
  'Explain the principles of healthy living related to all age groups in the community.',
  'Perform basic health care activities in community and institutional settings.',
  'Plan and carry out nutrition and health education activities in the home, clinic and community.',
  'Provide basic maternal and child health care including immunization services, family health care and family planning services.',
  'Perform basic midwifery procedure and basic nursing techniques with special emphasis on domiciliary and home nursing procedures.',
  'Provide first aid and emergency nursing care, elementary medical care, including treatment of minor ailments.',
  'Participate as a responsible member of the health team.',
  'Identify community resources that could be utilized for health promotion, health maintenance and prevention of diseases.',
  'Assist in the training of community / village level health workers.',
  'Know the principles of healthful living related to all age groups in the urban and rural community.',
  'Observe and get knowledge about the basic health care activities performing in the urban and rural community and hospital setting.',
  'Observe and get knowledge about nutrition and health education activities in the home, clinic and community.',
  'Observe and get knowledge about basic maternal and child health care including immunization services, family health care and family planning services.',
  'Observe and get knowledge about basic midwifery procedures and basic nursing techniques with special emphasis on domiciliary and home nursing procedures.',
  'Observe and get knowledge about first aid and emergency nursing care, elementary medical care including treatment of minor ailments.',
  'Observe and get knowledge about participating as a responsible member of health team.',
  'Observe and get knowledge about community resources which could be utilized for health maintenance and prevention of diseases.',
  'Observe and get knowledge about training of community / village level health worker.',
  'Observe and get knowledge about community development activities.',
  'Know the principles of healthful living related to all age groups in the urban and rural community.',
  'Develop skill in planning and carrying out nutrition and health education activities in the home, clinic and community.',
  'Develop skill in basic health care activities in the urban and rural community and institutional setting.',
  'Develop skill in providing basic maternal and child health care including immunization services, family health care and family planning services.',
  'Develop skill in performing basic midwifery procedure and basic nursing techniques with special emphasis on domiciliary and home nursing procedures.',
  'Develop skill to provide first aid and emergency nursing care, elementary nursing care including treatment of minor ailments.',
  'Develop skill to participate as a responsible member of the health team.',
  'Develop skill to identify community resources which could be utilized for health promotion, health maintenance and prevention of diseases.',
  'Develop skill to assist in the training of community / village level health workers.',
  'Develop skill to promote community development activities.',
  'Know the principles of healthful living related to all age groups.',
  'Perform basic health care activities in the community and hospital setting.',
  'Plan and carry out nutrition and health education activities in the home, clinic and community.',
  'Provide basic maternal and child health care including immunization services, family health care and family planning services.',
  'Perform basic midwifery procedure and basic nursing technique with special emphasis on health care.',
  'Provide first aid and emergency nursing care, elementary medical care including treatment of minor ailments.',
  'Participate as a responsible member of the health team.',
  'Identify community resources which could be utilized for health care, health maintenance and prevention of diseases.',
  'Assist in the training of community / village level health workers.',
  'Promote community development activities.',
];

export default function AimsObjectivesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Our Purpose</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight max-w-3xl">
            Aims &amp; Objectives
          </h1>
          <p className="text-xl max-w-2xl opacity-80 leading-relaxed text-slate-300">
            The guiding principles and learning goals of the GNM programme at Swami Vivekanand School of Nursing.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Aims */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-blue-700"></div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Aims</span>
          </div>
          <h2 className="font-playfair font-bold text-3xl text-slate-900 mb-8">Our Aims</h2>
          <div className="space-y-4">
            {aims.map((aim, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <div className="flex-shrink-0 mt-0.5">
                  <Target className="w-5 h-5 text-blue-700" />
                </div>
                <p className="text-slate-700 leading-relaxed">{aim}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-blue-700"></div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Objectives</span>
          </div>
          <h2 className="font-playfair font-bold text-3xl text-slate-900 mb-8">Our Objectives</h2>
          <div className="space-y-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-blue-700" />
                </div>
                <p className="text-slate-700 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GNM Course Objectives */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-blue-700"></div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">GNM Programme</span>
          </div>
          <div className="flex items-start gap-4 mb-8">
            <h2 className="font-playfair font-bold text-3xl text-slate-900">Objectives of the GNM Course</h2>
            <span className="mt-2 flex-shrink-0 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">3 Years</span>
          </div>

          {/* General */}
          <div className="mb-10">
            <h3 className="font-playfair font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              General Objectives
            </h3>
            {generalObjectives.map((obj, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-slate-700 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>

          {/* Specific */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              Specific Objectives
            </h3>
            <div className="space-y-2.5">
              {specificObjectives.map((obj, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="text-slate-700 leading-relaxed text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
