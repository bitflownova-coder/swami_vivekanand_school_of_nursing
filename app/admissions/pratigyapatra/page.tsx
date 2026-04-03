"use client";
import { Printer } from "lucide-react";

export default function PratigyapatraPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* â”€â”€ Print / Download bar (hidden on print) â”€â”€ */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-blue-900 text-white flex items-center justify-between px-4 sm:px-8 h-14 shadow-lg">
        <span className="font-semibold text-sm tracking-wide">
          à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤° — GNM Nursing · Print or Save as PDF
        </span>
        <div className="flex gap-3">
          <a
            href="/admissions"
            className="text-blue-200 hover:text-white text-sm font-medium transition-colors"
          >
            â† Back
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* â”€â”€ Spacer for fixed bar â”€â”€ */}
      <div className="no-print h-14" />

      {/* â”€â”€ A4 Paper â”€â”€ */}
      <div
        id="pratigyapatra-form"
        className="mx-auto my-8 bg-white shadow-xl print:shadow-none print:my-0"
        style={{ width: "210mm", minHeight: "297mm", padding: "20mm 25mm" }}
      >
        {/* Header note */}
        <div className="text-center mb-8">
          <p className="text-sm font-bold underline tracking-wide">On The 100 Rs Non-Judicial paper</p>
        </div>

        {/* College info (top) */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
            à¤¸à¥à¤µà¤¾à¤®à¥€ à¤µà¤¿à¤µà¥‡à¤•à¤¾à¤¨à¤‚à¤¦ à¤¸à¥à¤•à¥‚à¤² à¤‘à¤« à¤¨à¤°à¥à¤¸à¤¿à¤‚à¤—
          </h1>
          <p className="text-sm text-gray-600">Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold underline"
            style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
          >
            à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤°
          </h2>
        </div>

        {/* Body text */}
        <div
          className="text-sm leading-[2.2] text-justify space-y-5"
          style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
        >
          {/* Para 1 */}
          <p>
            &emsp;à¤®à¥€ à¤–à¤¾à¤²à¥€ à¤¸à¤¹à¥€ à¤•à¤°à¤£à¤¾à¤° à¤¶à¥à¤°à¥€ / à¤¸à¥Œ.{" "}
            <span className="inline-block border-b border-gray-800 min-w-[220px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤° à¤²à¤¿à¤¹à¥‚à¤¨ à¤¦à¥‡à¤¤ à¤†à¤¹à¥‡ à¤•à¥€, à¤®à¤¾à¤à¤¾ à¤ªà¤¾à¤²à¥à¤¯ / à¤®à¤¾à¤à¥€ à¤ªà¤¾à¤²à¥à¤¯ / à¤•à¥. / à¤•à¥à¤®à¤¾à¤°à¥€{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}
            <span className="inline-block border-b border-gray-800 min-w-[160px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤†à¤ªà¤²à¥à¤¯à¤¾{" "}
            <span className="inline-block border-b border-gray-800 min-w-[220px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤®à¤¹à¤¾à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯à¤¾à¤‚à¤®à¤§à¥à¤¯à¥‡{" "}
            <strong>à¤œà¥€.à¤à¤¨.à¤à¤®. à¤¨à¤¸à¤¿à¤‚à¤—</strong> à¤¯à¤¾ à¤…à¤­à¥à¤¯à¤¾à¤¸à¤•à¥à¤°à¤®à¤¾à¤¸ à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤• à¤µà¤°à¥à¤·à¥‡{" "}
            <span className="inline-block border-b border-gray-800 min-w-[50px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤•à¥‡à¤‚à¤¦à¥à¤°à¥€à¤¯à¤­à¥‚à¤¤ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¥‡à¤µà¥à¤¦à¤¾à¤°à¥‡ / à¤…à¤¥à¤µà¤¾ à¤•à¥‡à¤‚à¤¦à¥à¤°à¥€à¤¯à¤­à¥‚à¤¤ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¥‡à¤µà¥à¤¦à¤¾à¤°à¥‡ à¤°à¤¿à¤•à¥à¤¤ /
            à¤¸à¤‚à¤¸à¥à¤¥à¤¾ à¤¸à¥à¤¤à¤°à¥€à¤¯ à¤œà¤¾à¤—à¥‡à¤µà¤° à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤˜à¥‡à¤¤à¤²à¥‡à¤²à¤¾ à¤†à¤¹à¥‡.
          </p>

          {/* Para 2 */}
          <p>
            &emsp;à¤®à¥€ à¤†à¤£à¤¿ à¤ªà¤¾à¤²à¥à¤¯ / à¤ªà¤¾à¤²à¥à¤¯à¤¾à¤¸ à¤¯à¤¾à¤¸ à¤ªà¥‚à¤°à¥à¤£ à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤†à¤£à¤¿ à¤œà¤¾à¤£à¥€à¤µ à¤†à¤¹à¥‡ à¤•à¥€, à¤®à¤¾à¤à¥à¤¯à¤¾ à¤ªà¤¾à¤²à¥à¤¯à¤¾à¤šà¤¾ à¤ªà¥à¤°à¤µà¥‡à¤¶
            à¤…à¤¨à¥à¤¸à¥à¤šà¤¿à¤¤ à¤œà¤¾à¤¤à¥€ (SC) / à¤…à¤¨à¥à¤¸à¥à¤šà¤¿à¤¤ à¤œà¤®à¤¾à¤¤à¥€ (ST) / à¤µà¤¿à¤®à¥à¤•à¥à¤¤ à¤œà¤¾à¤¤à¥€ (VJ) / à¤­à¤Ÿà¤•à¥à¤¯à¤¾ à¤œà¤®à¤¾à¤¤à¥€
            (NTà¥§, NTà¥¨, NTà¥©, NTà¥ª) / à¤‡à¤¤à¤° à¤®à¤¾à¤—à¤¾à¤¸ à¤µà¤°à¥à¤— (OBC) / à¤µà¤¿à¤¶à¥‡à¤· à¤®à¤¾à¤—à¤¾à¤¸ (SBC) / à¤ªà¥à¤°à¤µà¤°à¥à¤— à¤–à¥à¤²à¤¾ (Open)
            à¤ªà¥à¤°à¤µà¤°à¥à¤— / à¤†à¤°à¥à¤¥à¤¿à¤• à¤®à¤¾à¤—à¤¾à¤¸ à¤ªà¥à¤°à¤µà¤°à¥à¤— (EWS) à¤¯à¤¾ à¤ªà¥à¤°à¤µà¤°à¥à¤—à¤¾à¤‚à¤¤à¥‚à¤¨ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤‡à¤¸à¥à¤¤à¥à¤°à¤¾à¤²à¥‡à¤²à¤¾ à¤†à¤¹à¥‡.
          </p>

          {/* Para 3 */}
          <p>
            &emsp;à¤®à¥€ à¤¶à¤ªà¤¥à¥‡à¤µà¤° à¤²à¤¿à¤¹à¥‚à¤¨ à¤¦à¥‡à¤¤à¥‹ / à¤¦à¥‡à¤¤à¥‡ à¤•à¥€, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° à¤¶à¤¾à¤¸à¤¨ / à¤­à¤¾à¤°à¤¤ à¤¸à¤°à¤•à¤¾à¤° à¤¯à¤¾à¤‚à¤šà¥à¤¯à¤¾ à¤®à¤¾à¤°à¥à¤«à¤¤ /
            à¤…à¤‚à¤¤à¤°à¥à¤—à¤¤ à¤¦à¤¿à¤²à¥€ à¤œà¤¾à¤£à¤¾à¤°à¥€ à¤¶à¤¿à¤·à¥à¤¯à¤µà¥ƒà¤¤à¥à¤¤à¥€ (Scholarship) / Freeship à¤ªà¤¾à¤¤à¥à¤°à¤§à¤¾à¤°à¤• à¤…à¤¸à¥‚à¤¨ / à¤¨à¤¸à¥‚à¤¨,
            à¤¤à¥à¤¯à¤¾à¤šà¤¾ à¤²à¤¾à¤­ à¤®à¥€ à¤˜à¥‡à¤¤ à¤†à¤¹à¥‡ / à¤¨à¤¾à¤¹à¥€. à¤¸à¤¦à¤°à¤šà¥€ à¤¶à¤¿à¤·à¥à¤¯à¤µà¥ƒà¤¤à¥à¤¤à¥€ / à¤«à¥à¤°à¥€à¤¶à¤¿à¤ª à¤•à¥‹à¤£à¤¤à¥à¤¯à¤¾à¤¹à¥€ à¤¤à¤¤à¥à¤¸à¤®
            à¤•à¤¾à¤°à¤£à¤¾à¤‚à¤µà¥à¤¦à¤¾à¤°à¥‡ à¤œà¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤à¤¾à¤²à¥‡à¤²à¥€ à¤¨à¤¸à¥‡à¤² à¤•à¤¿à¤‚à¤µà¤¾ à¤¹à¥‹à¤£à¤¾à¤° à¤¨à¤¸à¥‡à¤² à¤¤à¤° à¤¯à¤¾ à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤¤ à¤®à¤¹à¤¾à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯à¤¾à¤šà¥€
            à¤¶à¤¿à¤•à¥à¤·à¤£ à¤¶à¥à¤²à¥à¤• à¤¸à¤®à¤¿à¤¤à¥€à¤µà¥à¤¦à¤¾à¤°à¥‡ à¤®à¤¾à¤¨à¥à¤¯ à¤¶à¥à¤²à¥à¤• à¤­à¤°à¤£à¥‡à¤¸ à¤®à¤¾à¤à¥€ à¤•à¤¾à¤¹à¥€ à¤¹à¤°à¤•à¤¤ à¤¨à¤¾à¤¹à¥€ à¤•à¤¿à¤‚à¤µà¤¾ à¤•à¥‹à¤£à¤¤à¥à¤¯à¤¾à¤¹à¥€
            à¤ªà¥à¤°à¤•à¤¾à¤°à¤šà¥€ à¤¤à¤•à¥à¤°à¤¾à¤° à¤¨à¤¸à¥‡à¤².
          </p>

          {/* Para 4 */}
          <p>
            &emsp;à¤¤à¤¸à¥‡à¤š à¤®à¤¾à¤à¥à¤¯à¤¾ à¤ªà¤¾à¤²à¥à¤¯à¤¾à¤¨à¥‡ à¤ªà¥à¤°à¤¥à¤® /{" "}
            <span className="inline-block border-b border-gray-800 min-w-[80px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤µà¤°à¥à¤·à¥€ <strong>à¤œà¥€.à¤à¤¨.à¤à¤®. à¤¨à¤¸à¤¿à¤‚à¤—</strong> à¤¯à¤¾ à¤…à¤­à¥à¤¯à¤¾à¤¸à¤•à¥à¤°à¤®à¤¾à¤¸ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤˜à¥‡à¤¤à¤²à¥à¤¯à¤¾à¤¨à¤‚à¤¤à¤° à¤•à¥‹à¤£à¤¤à¥à¤¯à¤¾à¤¹à¥€
            à¤•à¤¾à¤°à¤£à¤¾à¤¸à¥à¤¤à¤µ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤°à¤¦à¥à¤¦ à¤•à¥‡à¤²à¤¾ à¤•à¤¿à¤‚à¤µà¤¾ à¤…à¤¥à¤µà¤¾ à¤à¤¾ à¤²à¤¾ à¤…à¤¸à¥‡à¤² à¤¤à¤° à¤¯à¤¾ à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤¤ à¤ªà¥à¤¢à¥€à¤² à¤‰à¤°à¥à¤µà¤°à¤¿à¤¤
            à¤…à¤­à¥à¤¯à¤¾à¤¸à¤•à¥à¤°à¤®à¤¾à¤šà¥‡ à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤• à¤¶à¥à¤²à¥à¤• à¤­à¤°à¤£à¥à¤¯à¤¾à¤¸ à¤…à¤¥à¤µà¤¾ à¤…à¤¦à¤¾ à¤•à¤°à¤£à¥à¤¯à¤¾à¤¸ à¤®à¤¾à¤à¥€ à¤•à¥‹à¤£à¤¤à¥€ à¤¹à¥€ à¤¹à¤°à¤•à¤¤ à¤¨à¤¾à¤¹à¥€
            à¤…à¤¥à¤µà¤¾ à¤¤à¤•à¥à¤°à¤¾à¤° à¤¨à¤¾à¤¹à¥€.
          </p>

          {/* Para 5 */}
          <p>
            &emsp;à¤¸à¤¦à¤°à¥€à¤² à¤…à¤Ÿà¥€à¤‚à¤µà¤° à¤®à¥€{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤ªà¥‚à¤°à¥à¤£ à¤¸à¤‚à¤®à¤¤à¥€à¤¨à¥‡, à¤®à¤¾à¤à¤¾ à¤ªà¤¾à¤²à¥à¤¯ / à¤ªà¤¾à¤²à¥à¤¯à¤¾{" "}
            <span className="inline-block border-b border-gray-800 min-w-[200px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {" "}à¤¯à¤¾à¤‚à¤šà¤¾ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤†à¤ªà¤²à¥à¤¯à¤¾ à¤®à¤¹à¤¾à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯à¤¾à¤‚à¤®à¤§à¥à¤¯à¥‡ à¤˜à¥‡à¤¤ à¤†à¤¹à¥‹à¤¤.
          </p>
        </div>

        {/* Signature area */}
        <div className="mt-16 grid grid-cols-2 gap-8" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
          <div className="text-center">
            <p className="font-bold text-sm mb-8">à¤ªà¤¾à¤²à¥à¤¯à¤¾à¤šà¥€ à¤¸à¤¹à¥€</p>
            <div className="border-b border-gray-700 w-56 mx-auto mb-2" />
            <p className="text-sm">( <span className="inline-block w-40">&nbsp;</span> )</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm mb-8">à¤ªà¤¾à¤²à¤•à¤¾à¤šà¥€ à¤¸à¤¹à¥€</p>
            <div className="border-b border-gray-700 w-56 mx-auto mb-2" />
            <p className="text-sm">( <span className="inline-block w-40">&nbsp;</span> )</p>
          </div>
        </div>

        {/* Date & Place */}
        <div className="mt-12 grid grid-cols-2 gap-8 text-sm" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
          <div>
            <span>à¤¦à¤¿à¤¨à¤¾à¤‚à¤• : </span>
            <span className="inline-block border-b border-gray-700 w-40">&nbsp;</span>
          </div>
          <div>
            <span>à¤ à¤¿à¤•à¤¾à¤£ : </span>
            <span className="inline-block border-b border-gray-700 w-40">&nbsp;</span>
          </div>
        </div>

        {/* Note at bottom */}
        <div className="mt-10 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 text-center">
            à¤¹à¥‡ à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤° ₹100 à¤šà¥à¤¯à¤¾ à¤¨à¥‰à¤¨-à¤œà¥à¤¯à¥à¤¡à¤¿à¤¶à¤¿à¤…à¤² à¤¸à¥à¤Ÿà¥…à¤®à¥à¤ª à¤ªà¥‡à¤ªà¤°à¤µà¤° à¤¨à¥‹à¤Ÿà¤°à¥€ à¤•à¤°à¥‚à¤¨ à¤¸à¤¾à¤¦à¤° à¤•à¤°à¤£à¥‡ à¤†à¤µà¤¶à¥à¤¯à¤• à¤†à¤¹à¥‡.
          </p>
        </div>
      </div>

      {/* â”€â”€ Print CSS â”€â”€ */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav, header, footer, .floating-enquiry { display: none !important; }
          body { background: white !important; }
          #pratigyapatra-form {
            width: 210mm !important;
            min-height: 297mm !important;
            padding: 20mm 25mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
