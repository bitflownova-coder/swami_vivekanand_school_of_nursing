"use client";
import { Printer } from "lucide-react";

export default function PratigyapatraPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-blue-900 text-white flex items-center justify-between px-4 sm:px-8 h-14 shadow-lg">
        <span className="font-semibold text-sm tracking-wide">
          प्रतिज्ञापत्र — GNM Nursing · Print or Save as PDF
        </span>
        <div className="flex gap-3">
          <a href="/admissions" className="text-blue-200 hover:text-white text-sm font-medium transition-colors">← Back</a>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </div>
      <div className="no-print h-14" />
      <div id="pratigyapatra-form" className="mx-auto my-8 bg-white shadow-xl print:shadow-none print:my-0" style={{ width: "210mm", minHeight: "297mm", padding: "20mm 25mm" }}>
        <div className="text-center mb-8">
          <p className="text-sm font-bold underline tracking-wide">On The 100 Rs Non-Judicial paper</p>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold" style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}>
            स्वामी विवेकानंद स्कूल ऑफ नर्सिंग
          </h1>
          <p className="text-sm text-gray-600">Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold underline" style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}>
            प्रतिज्ञापत्र
          </h2>
        </div>
        <div className="text-sm leading-[2.2] text-justify space-y-5" style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}>
          <p>
            {String.fromCharCode(8195)}मी खाली सही करणार श्री / सौ.{" "}
            <span className="inline-block border-b border-gray-800 min-w-[220px]">{" "}</span>
            {" "}प्रतिज्ञापत्र लिहून देत आहे की, माझा पाल्य / माझी पाल्य / कु. / कुमारी{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">{" "}</span>
            {" "}<span className="inline-block border-b border-gray-800 min-w-[160px]">{" "}</span>
            {" "}आपल्या{" "}
            <span className="inline-block border-b border-gray-800 min-w-[220px]">{" "}</span>
            {" "}महाविद्यालयांमध्ये{" "}
            <strong>जी.एन.एम. नर्सिंग</strong> या अभ्यासक्रमास शैक्षणिक वर्षे{" "}
            <span className="inline-block border-b border-gray-800 min-w-[50px]">{" "}</span>
            {" "}केंद्रीयभूत प्रवेश प्रक्रियेद्वारे / अथवा केंद्रीयभूत प्रवेश प्रक्रियेद्वारे रिक्त /
            संस्था स्तरीय जागेवर प्रवेश घेतलेला आहे.
          </p>
          <p>
            {String.fromCharCode(8195)}मी आणि पाल्य / पाल्यास यास पूर्ण माहिती आणि जाणीव आहे की, माझ्या पाल्याचा प्रवेश
            अनुसूचित जाती (SC) / अनुसूचित जमाती (ST) / विमुक्त जाती (VJ) / भटक्या जमाती
            (NT१, NT२, NT३, NT४) / इतर मागास वर्ग (OBC) / विशेष मागास (SBC) / प्रवर्ग खुला (Open)
            प्रवर्ग / आर्थिक मागास प्रवर्ग (EWS) या प्रवर्गांतून प्रवेश मिळालेला आहे.
          </p>
          <p>
            {String.fromCharCode(8195)}मी शपथेवर लिहून देतो / देते की, महाराष्ट्र शासन / भारत सरकार यांच्या मार्फत /
            अंतर्गत दिली जाणारी शिष्यवृत्ती (Scholarship) / Freeship पात्रधारक असून / नसून,
            त्याचा लाभ मी घेत आहे / नाही. सदरची शिष्यवृत्ती / फ्रीशिप कोणत्याही तत्सम
            कारणांमुळे जर प्राप्त झालेली नसेल किंवा होणार नसेल तर या परिस्थितीत महाविद्यालयाची
            शिक्षण शुल्क समितीद्वारे मान्य शुल्क भरण्यास माझी काही हरकत नाही किंवा कोणत्याही
            प्रकारची तक्रार नसेल.
          </p>
          <p>
            {String.fromCharCode(8195)}तसेच माझ्या पाल्याने प्रथम /{" "}
            <span className="inline-block border-b border-gray-800 min-w-[80px]">{" "}</span>
            {" "}वर्षी <strong>जी.एन.एम. नर्सिंग</strong> या अभ्यासक्रमास प्रवेश घेतल्यानंतर कोणत्याही
            कारणास्तव प्रवेश रद्द केला किंवा अथवा झाला असेल तर या परिस्थितीत पुढील उर्वरित
            अभ्यासक्रमाचे शैक्षणिक शुल्क भरण्यास अथवा अदा करण्यास माझी कोणती ही हरकत नाही
            अथवा तक्रार नाही.
          </p>
          <p>
            {String.fromCharCode(8195)}सदरील अटींवर मी{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">{" "}</span>
            {" "}पूर्ण संमतीने, माझा पाल्य / पाल्या{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">{" "}</span>
            {" "}यांचा प्रवेश आपल्या महाविद्यालयांमध्ये घेत आहोत.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8" style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}>
          <div className="text-center">
            <p className="font-bold text-sm mb-8">पाल्याची सही</p>
            <div className="border-b border-gray-700 w-56 mx-auto mb-2" />
            <p className="text-sm">( <span className="inline-block w-40">&nbsp;</span> )</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm mb-8">पालकाची सही</p>
            <div className="border-b border-gray-700 w-56 mx-auto mb-2" />
            <p className="text-sm">( <span className="inline-block w-40">&nbsp;</span> )</p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 text-sm" style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}>
          <div><span>दिनांक : </span><span className="inline-block border-b border-gray-700 w-40">&nbsp;</span></div>
          <div><span>ठिकाण : </span><span className="inline-block border-b border-gray-700 w-40">&nbsp;</span></div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 text-center">
            हे प्रतिज्ञापत्र ₹100 च्या नॉन-ज्युडिशिअल स्टॅम्प पेपरवर नोटरी करून सादर करणे आवश्यक आहे.
          </p>
        </div>
      </div>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav, header, footer, .floating-enquiry { display: none !important; }
          body { background: white !important; }
          #pratigyapatra-form { width: 210mm !important; min-height: 297mm !important; padding: 20mm 25mm !important; margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
