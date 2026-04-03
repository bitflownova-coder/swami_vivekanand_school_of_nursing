"use client";

import React, { useState, useRef } from "react";
import { AlertCircle, CheckCircle, Download, ClipboardList, Camera, X, FileText, ArrowLeft, ArrowRight, Upload, Check, Phone, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = ["Open", "SC", "ST", "NT-1 (NT-B)", "NT-2 (NT-C)", "NT-3 (NT-D)", "OBC", "SBC", "EWS", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];
const MARITAL_STATUS = ["Single", "Married", "Widowed", "Divorced"];

type F = {
  rollNo: string; academicYear: string; yearOfAdmission: string;
  surname: string; firstName: string; fatherHusbandName: string; motherName: string; fullNameMarathi: string;
  gender: string; bloodGroup: string; dob: string; category: string; religion: string; caste: string;
  emailId: string; studentMobile: string; aadharNo: string; panNo: string;
  nationality: string; placeOfBirth: string; motherTongue: string; maritalStatus: string;
  fatherOccupation: string; annualIncome: string; fatherContact: string; fatherEmail: string;
  otherInfo: string; physicallyHandicapped: string;
  permAddress: string; permPhone: string; permMobile: string; permEmail: string;
  localAddress: string; localPhone: string; localMobile: string; localEmail: string;
  sscYear: string; sscBoard: string; sscSchool: string; sscTotal: string; sscPercent: string;
  sscEng: string; sscPhy: string; sscChem: string; sscBio: string; sscPcb: string;
  hscYear: string; hscBoard: string; hscCollege: string; hscTotal: string; hscPercent: string;
  hscEng: string; hscPhy: string; hscChem: string; hscBio: string; hscPcb: string;
  declaration: boolean;
  photo: string;
  mahadbtUserId: string;
  mahadbtPassword: string;
};

const INIT: F = {
  rollNo: "", academicYear: "", yearOfAdmission: "Ist",
  surname: "", firstName: "", fatherHusbandName: "", motherName: "", fullNameMarathi: "",
  gender: "", bloodGroup: "", dob: "", category: "Open", religion: "", caste: "",
  emailId: "", studentMobile: "", aadharNo: "", panNo: "",
  nationality: "Indian", placeOfBirth: "", motherTongue: "", maritalStatus: "Single",
  fatherOccupation: "", annualIncome: "", fatherContact: "", fatherEmail: "",
  otherInfo: "", physicallyHandicapped: "No",
  permAddress: "", permPhone: "", permMobile: "", permEmail: "",
  localAddress: "", localPhone: "", localMobile: "", localEmail: "",
  sscYear: "", sscBoard: "", sscSchool: "", sscTotal: "", sscPercent: "",
  sscEng: "", sscPhy: "", sscChem: "", sscBio: "", sscPcb: "",
  hscYear: "", hscBoard: "", hscCollege: "", hscTotal: "", hscPercent: "",
  hscEng: "", hscPhy: "", hscChem: "", hscBio: "", hscPcb: "",
  declaration: false,
  photo: "",
  mahadbtUserId: "",
  mahadbtPassword: "",
};

/* ── Document upload types ── */
type DocFile = { name: string; base64: string; mimeType: string };
type Docs = { [key: string]: DocFile | null };

const DOC_LIST = [
  "10th (SSC) Mark Sheet & Passing Certificate",
  "12th (HSC) Mark Sheet & Passing Certificate",
  "Transfer Certificate (TC) / Migration Certificate",
  "School / College Leaving Certificate",
  "Birth Certificate / Aadhar Card (Age Proof)",
  "Caste Certificate (if applicable)",
  "Caste Validity Certificate (if applicable)",
  "Non-Creamy Layer Certificate (if applicable)",
  "Domicile Certificate",
  "Gap Certificate / Affidavit (if applicable)",
  "Medical Fitness Certificate",
  "Physically Handicapped Certificate (if applicable)",
  "Nationality Certificate",
  "Aadhar Card (both sides)",
  "PAN Card (if applicable)",
  "Passport Size Photographs (6 copies)",
  "MAHADBT Registration Printout",
  "Any Other Documents",
];

const INIT_DOCS: Docs = Object.fromEntries(DOC_LIST.map((_, i) => [`doc_${i}`, null]));

/* ── Shared input classes ── */
const fi = "w-full border-0 border-b border-slate-300 bg-transparent text-[13px] text-slate-900 px-1 py-1.5 focus:outline-none focus:border-blue-700 transition-colors placeholder:text-slate-300";
const tci = "w-full border-b border-slate-300 bg-transparent text-xs text-slate-900 px-1 py-1.5 focus:outline-none focus:border-blue-700 text-center transition-colors placeholder:text-slate-300";
const si = "w-full border-0 border-b border-slate-300 bg-transparent text-[13px] text-slate-900 px-1 py-1.5 focus:outline-none focus:border-blue-700 appearance-none transition-colors cursor-pointer";

/* ── Personal Detail Row ── */
function DetailRow({ no, label, children }: { no: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-b-0">
      <span className="text-xs font-semibold text-slate-400 w-6 text-right flex-shrink-0">{no}.</span>
      <span className="text-[13px] text-slate-600 w-52 flex-shrink-0">{label}</span>
      <span className="text-slate-300 flex-shrink-0">:</span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/* ── Wizard shared input style ── */
const inp = "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400";
const sel = "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer appearance-none";

/* ── Field wrapper with label ── */
function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

/* ── Upload card ── */
function UploadCard({ label, required, docKey, value, onChange }: {
  label: string; required?: boolean; docKey: string;
  value: DocFile | null; onChange: (key: string, file: DocFile | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(docKey, { name: file.name, base64: ev.target?.result as string, mimeType: file.type });
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => !value && ref.current?.click()}
      className={`relative rounded-xl border-2 border-dashed p-4 transition-all cursor-pointer select-none ${
        value
          ? "border-emerald-400 bg-emerald-50/60 cursor-default"
          : "border-slate-200 bg-slate-50/40 hover:border-blue-400 hover:bg-blue-50/30"
      }`}
    >
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile} />
      {value ? (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-700 leading-tight">{label}{required && " *"}</p>
            <p className="text-[11px] text-emerald-600 mt-0.5 truncate">{value.name}</p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(docKey, null); if (ref.current) ref.current.value = ""; }}
            className="w-6 h-6 rounded-full bg-emerald-200 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <X className="h-3 w-3 text-emerald-700 hover:text-red-600" />
          </button>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Upload className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 leading-tight">{label}{required && <span className="text-red-500"> *</span>}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">PDF, JPG or PNG · click to upload</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Steps config ── */
const STEPS_CONFIG = [
  { n: 1, label: "Basic Info" },
  { n: 2, label: "Personal" },
  { n: 3, label: "Address" },
  { n: 4, label: "Education" },
  { n: 5, label: "Documents" },
  { n: 6, label: "Declaration" },
];

/* ── Step progress indicator ── */
function StepProgress({ current }: { current: number }) {
  const pct = Math.round(((current - 1) / (STEPS_CONFIG.length - 1)) * 100);
  return (
    <>
      {/* Desktop: numbered circles */}
      <div className="hidden sm:flex items-center justify-between mb-6 px-1">
        {STEPS_CONFIG.map((s, i) => {
          const done = current > s.n;
          const active = current === s.n;
          return (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ring-4 ${
                  done ? "bg-emerald-500 text-white ring-emerald-100" :
                  active ? "bg-blue-600 text-white ring-blue-100" :
                  "bg-slate-100 text-slate-400 ring-transparent"
                }`}>
                  {done ? <Check className="h-4 w-4" /> : s.n}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                  active ? "text-blue-600" : done ? "text-emerald-600" : "text-slate-400"
                }`}>{s.label}</span>
              </div>
              {i < STEPS_CONFIG.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded-full transition-all ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile: progress bar */}
      <div className="sm:hidden mb-5">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
          <span>Step {current} of {STEPS_CONFIG.length}</span>
          <span className="text-blue-600">{STEPS_CONFIG[current - 1].label}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}

/* ── Sidebar ── */
function Sidebar() {
  return (
    <aside className="space-y-3 lg:sticky lg:top-[172px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-xl px-4 py-4 shadow-md">
        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">Prefer Offline?</p>
        <p className="text-sm font-semibold text-white leading-snug">Download the blank forms, fill by hand and submit at the college office.</p>
      </div>

      {/* Admission Form Download */}
      <a
        href="/api/download/admission-form"
        download="GNM-Admission-Form-Swami-Vivekanand.docx"
        className="flex items-start gap-3 border border-blue-100 bg-blue-50/80 hover:border-blue-300 hover:bg-blue-50 rounded-xl p-3.5 transition-all group"
      >
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          <FileText className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[13px] text-slate-800 leading-tight">GNM Admission Form</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Blank .docx — print on A4, fill with pen</p>
          <span className="inline-flex items-center gap-1 text-blue-700 text-[11px] font-semibold mt-1.5">
            <Download className="h-3 w-3" /> Download .docx
          </span>
        </div>
      </a>

      {/* Documents Checklist Download */}
      <a
        href="/api/download/documents-checklist"
        download="GNM-Documents-Checklist.docx"
        className="flex items-start gap-3 border border-emerald-100 bg-emerald-50/80 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl p-3.5 transition-all group"
      >
        <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          <ClipboardList className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[13px] text-slate-800 leading-tight">Documents Checklist</p>
          <p className="text-[11px] text-slate-500 mt-0.5">All 18 required documents for GNM admission</p>
          <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-semibold mt-1.5">
            <Download className="h-3 w-3" /> Download .docx
          </span>
        </div>
      </a>

      {/* GNM Info Card */}
      <div className="border border-slate-200 bg-white rounded-xl p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">GNM Programme 2026–27</p>
        <div className="space-y-1.5">
          {[
            ["Programme", "General Nursing & Midwifery"],
            ["Duration", "3½ Years"],
            ["Seats", "60"],
            ["Eligibility", "10+2 with Science"],
            ["Min. Marks", "40% aggregate"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold text-slate-700 text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Card */}
      <div className="border border-slate-200 bg-white rounded-xl p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Need Help?</p>
        <div className="space-y-2">
          <a href="tel:+919975999672" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-700 transition-colors">
            <Phone className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
            <span>+91 99759 99672</span>
          </a>
          <a href="mailto:svsnursing@gmail.com" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-700 transition-colors">
            <Mail className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
            <span>svsnursing@gmail.com</span>
          </a>
          <Link href="/contact" className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-800 mt-1 transition-colors">
            View contact page <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}



function AdmissionFormPage() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState<F>(INIT);
  const [docs, setDocs] = React.useState<Docs>(INIT_DOCS);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [appId, setAppId] = React.useState("");
  const [declared, setDeclared] = React.useState(false);
  const photoRef = useRef<HTMLInputElement>(null);

  const s = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(p => ({ ...p, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const setDoc = (key: string, file: DocFile | null) => setDocs(p => ({ ...p, [key]: file }));

  const uploadedCount = Object.values(docs).filter(Boolean).length;

  const validate = (): string => {
    if (step === 1 && (!form.firstName.trim() || !form.surname.trim())) return "First name and surname are required.";
    if (step === 2 && (!form.gender || !form.dob || !form.studentMobile)) return "Gender, date of birth and student mobile are required.";
    if (step === 3 && !form.permAddress.trim()) return "Permanent address is required.";
    if (step === 4 && (!form.sscBoard.trim() || !form.hscBoard.trim())) return "SSC and HSC board names are required.";
    if (step === 6 && !declared) return "Please accept the declaration to submit.";
    return "";
  };

  const handleNext = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setError("");
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/college/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${form.surname} ${form.firstName}`.trim(),
          dateOfBirth: form.dob, gender: form.gender,
          phone: form.studentMobile, email: form.emailId, address: form.permAddress,
          tenthBoard: form.sscBoard, tenthPercent: form.sscPercent,
          twelthBoard: form.hscBoard, twelthPercent: form.hscPercent,
          twelthStream: "Science", category: form.category,
          hasDisability: form.physicallyHandicapped === "Yes",
          isAnmRegistered: false,
        }),
      });
      const data = await res.json();
      if (data.success) setAppId(data.id);
      else setError(data.error || "Submission failed. Please try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  };

  /* â”€â”€â”€ SUCCESS SCREEN â”€â”€â”€ */
  if (appId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 pb-16">
        <div className="max-w-lg w-full text-center py-12">
          <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Application Submitted!</h1>
          <p className="text-slate-600 mb-6">
            Thank you, <strong>{form.firstName} {form.surname}</strong>. Your application has been received successfully.
          </p>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 text-left shadow-sm">
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Reference ID</p>
            <p className="font-mono font-bold text-blue-700 text-lg">{appId}</p>
            <p className="text-xs text-slate-400 mt-2">Keep this ID for follow-up enquiries with the college office.</p>
          </div>
          <Link href="/admissions" className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Admissions
          </Link>
        </div>
      </div>
    );
  }

  /* â”€â”€â”€ STEP 1 — BASIC INFO â”€â”€â”€ */
  const renderStep1 = () => (
    <div className="space-y-5">
      <SectionHeader title="Applicant Information" subtitle="Start with your basic details and photo" />

      {/* Photo upload */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="flex-shrink-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Passport Photo</p>
          <div
            className="w-28 h-32 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all relative group"
            onClick={() => photoRef.current?.click()}
          >
            {form.photo ? (
              <>
                <Image src={form.photo} alt="Photo" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </>
            ) : (
              <div className="text-center p-2">
                <Camera className="h-8 w-8 text-slate-300 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400">Click to upload</p>
              </div>
            )}
          </div>
          <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Roll No." className="sm:col-span-1">
            <input className={inp} placeholder="Leave blank if not assigned" value={form.rollNo} onChange={s("rollNo")} />
          </Field>
          <Field label="Year of Admission" className="sm:col-span-1">
            <select className={sel} value={form.yearOfAdmission} onChange={s("yearOfAdmission")}>
              <option value="Ist">1st Year</option>
              <option value="IInd">2nd Year</option>
              <option value="IIIrd">3rd Year</option>
            </select>
          </Field>
          <Field label="Academic Year" className="sm:col-span-2">
            <input className={inp} placeholder="e.g. 2026-27" value={form.academicYear} onChange={s("academicYear")} />
          </Field>
        </div>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Surname" required>
          <input className={inp} placeholder="Family / Last name" value={form.surname} onChange={s("surname")} />
        </Field>
        <Field label="First Name" required>
          <input className={inp} placeholder="First name" value={form.firstName} onChange={s("firstName")} />
        </Field>
        <Field label="Father's / Husband's Name">
          <input className={inp} placeholder="Father's or husband's name" value={form.fatherHusbandName} onChange={s("fatherHusbandName")} />
        </Field>
        <Field label="Mother's Name">
          <input className={inp} placeholder="Mother's full name" value={form.motherName} onChange={s("motherName")} />
        </Field>
        <Field label="Full Name in Marathi" className="sm:col-span-2">
          <input className={inp} placeholder="Full name in Marathi script" value={form.fullNameMarathi} onChange={s("fullNameMarathi")} />
        </Field>
      </div>

      {/* MAHADBT */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">MAHADBT Portal Credentials</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="MAHADBT User ID">
            <input className={inp} placeholder="Your MAHADBT user ID" value={form.mahadbtUserId} onChange={s("mahadbtUserId")} />
          </Field>
          <Field label="MAHADBT Password">
            <input className={inp} placeholder="Your MAHADBT password" value={form.mahadbtPassword} onChange={s("mahadbtPassword")} />
          </Field>
        </div>
        <p className="text-[11px] text-amber-600 mt-2">Register at <a href="https://mahadbt.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">mahadbt.maharashtra.gov.in</a> if not already registered.</p>
      </div>
    </div>
  );

  /* â”€â”€â”€ STEP 2 — PERSONAL DETAILS â”€â”€â”€ */
  const renderStep2 = () => (
    <div>
      <SectionHeader title="Personal Details" subtitle="20 personal detail fields" />
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        {[
          ["1", "Gender", <select key="gender" className={si} value={form.gender} onChange={s("gender")}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select>],
          ["2", "Date of Birth", <input key="dob" type="date" className={fi} value={form.dob} onChange={s("dob")} />],
          ["3", "Blood Group", <select key="bg" className={si} value={form.bloodGroup} onChange={s("bloodGroup")}><option value="">Select</option>{BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}</select>],
          ["4", "Category (Caste)", <select key="cat" className={si} value={form.category} onChange={s("category")}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>],
          ["5", "Religion", <input key="rel" className={fi} placeholder="e.g. Hindu" value={form.religion} onChange={s("religion")} />],
          ["6", "Caste", <input key="caste" className={fi} placeholder="Enter caste" value={form.caste} onChange={s("caste")} />],
          ["7", "Nationality", <input key="nat" className={fi} value={form.nationality} onChange={s("nationality")} />],
          ["8", "Place of Birth", <input key="pob" className={fi} placeholder="City / Village" value={form.placeOfBirth} onChange={s("placeOfBirth")} />],
          ["9", "Mother Tongue", <input key="mt" className={fi} placeholder="e.g. Marathi" value={form.motherTongue} onChange={s("motherTongue")} />],
          ["10", "Marital Status", <select key="ms" className={si} value={form.maritalStatus} onChange={s("maritalStatus")}>{MARITAL_STATUS.map(m => <option key={m}>{m}</option>)}</select>],
          ["11", "Student Mobile", <input key="sm" type="tel" className={fi} placeholder="10-digit mobile" value={form.studentMobile} onChange={s("studentMobile")} />],
          ["12", "Email ID", <input key="email" type="email" className={fi} placeholder="student@email.com" value={form.emailId} onChange={s("emailId")} />],
          ["13", "Aadhar No.", <input key="aadhar" className={fi} placeholder="12-digit Aadhar" value={form.aadharNo} onChange={s("aadharNo")} />],
          ["14", "PAN No.", <input key="pan" className={fi} placeholder="ABCDE1234F" value={form.panNo} onChange={s("panNo")} />],
          ["15", "Father's Occupation", <input key="fo" className={fi} placeholder="Occupation" value={form.fatherOccupation} onChange={s("fatherOccupation")} />],
          ["16", "Annual Family Income", <input key="ai" className={fi} placeholder="e.g. ₹2,50,000" value={form.annualIncome} onChange={s("annualIncome")} />],
          ["17", "Father's Contact No.", <input key="fc" type="tel" className={fi} placeholder="Father's mobile" value={form.fatherContact} onChange={s("fatherContact")} />],
          ["18", "Father's Email", <input key="fe" type="email" className={fi} placeholder="father@email.com" value={form.fatherEmail} onChange={s("fatherEmail")} />],
          ["19", "Other Information", <input key="oi" className={fi} placeholder="Any other relevant info" value={form.otherInfo} onChange={s("otherInfo")} />],
          ["20", "Physically Handicapped", <select key="ph" className={si} value={form.physicallyHandicapped} onChange={s("physicallyHandicapped")}><option>No</option><option>Yes</option></select>],
        ].map(([no, label, input]) => (
          <DetailRow key={no as string} no={no as string} label={label as string}>{input}</DetailRow>
        ))}
      </div>
    </div>
  );

  /* â”€â”€â”€ STEP 3 — ADDRESS â”€â”€â”€ */
  const renderStep3 = () => (
    <div className="space-y-6">
      <SectionHeader title="Address Details" subtitle="Permanent and local/current address" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permanent Address */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide border-b border-slate-100 pb-2">Permanent Address</p>
          <Field label="Address" required>
            <textarea className={inp + " resize-none"} rows={3} placeholder="Full permanent address" value={form.permAddress} onChange={s("permAddress")} />
          </Field>
          <Field label="Phone">
            <input className={inp} type="tel" placeholder="Landline number" value={form.permPhone} onChange={s("permPhone")} />
          </Field>
          <Field label="Mobile">
            <input className={inp} type="tel" placeholder="Mobile number" value={form.permMobile} onChange={s("permMobile")} />
          </Field>
          <Field label="Email">
            <input className={inp} type="email" placeholder="email@example.com" value={form.permEmail} onChange={s("permEmail")} />
          </Field>
        </div>
        {/* Local Address */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide border-b border-slate-100 pb-2">Local / Current Address</p>
          <Field label="Address">
            <textarea className={inp + " resize-none"} rows={3} placeholder="Current/local address (if different)" value={form.localAddress} onChange={s("localAddress")} />
          </Field>
          <Field label="Phone">
            <input className={inp} type="tel" placeholder="Landline number" value={form.localPhone} onChange={s("localPhone")} />
          </Field>
          <Field label="Mobile">
            <input className={inp} type="tel" placeholder="Mobile number" value={form.localMobile} onChange={s("localMobile")} />
          </Field>
          <Field label="Email">
            <input className={inp} type="email" placeholder="email@example.com" value={form.localEmail} onChange={s("localEmail")} />
          </Field>
        </div>
      </div>
    </div>
  );

  /* â”€â”€â”€ STEP 4 — EDUCATION â”€â”€â”€ */
  const renderStep4 = () => (
    <div className="space-y-6">
      <SectionHeader title="Academic Background" subtitle="SSC (10th) and HSC (12th) examination details" />
      {[
        { title: "SSC (10th Standard)", prefix: "ssc" as const, schoolLabel: "School Name", collegeKey: "sscSchool" as keyof F },
        { title: "HSC (12th Standard)", prefix: "hsc" as const, schoolLabel: "College Name", collegeKey: "hscCollege" as keyof F },
      ].map(({ title, prefix, schoolLabel, collegeKey }) => (
        <div key={prefix} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">{title}</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Year of Passing">
                <input className={inp} placeholder="YYYY" value={form[`${prefix}Year` as keyof F] as string} onChange={s(`${prefix}Year` as keyof F)} />
              </Field>
              <Field label="Board" required>
                <input className={inp} placeholder="Board name" value={form[`${prefix}Board` as keyof F] as string} onChange={s(`${prefix}Board` as keyof F)} />
              </Field>
              <Field label="Total Marks">
                <input className={inp} placeholder="e.g. 600" value={form[`${prefix}Total` as keyof F] as string} onChange={s(`${prefix}Total` as keyof F)} />
              </Field>
              <Field label="Percentage (%)">
                <input className={inp} placeholder="e.g. 72.50" value={form[`${prefix}Percent` as keyof F] as string} onChange={s(`${prefix}Percent` as keyof F)} />
              </Field>
            </div>
            <Field label={schoolLabel}>
              <input className={inp} placeholder={`${schoolLabel}`} value={form[collegeKey] as string} onChange={s(collegeKey)} />
            </Field>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Subject-wise Marks</p>
              <div className="grid grid-cols-5 gap-2">
                {(["Eng", "Phy", "Chem", "Bio", "Pcb"] as const).map(sub => (
                  <Field key={sub} label={sub === "Pcb" ? "PCB" : sub}>
                    <input className={tci} placeholder="-" value={form[`${prefix}${sub}` as keyof F] as string ?? ""} onChange={s(`${prefix}${sub}` as keyof F)} />
                  </Field>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* â”€â”€â”€ STEP 5 — DOCUMENTS â”€â”€â”€ */
  const renderStep5 = () => (
    <div>
      <SectionHeader
        title="Document Uploads"
        subtitle={`Upload PDF, JPG or PNG copies of each document. ${uploadedCount} of ${DOC_LIST.length} uploaded.`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {DOC_LIST.map((label, i) => (
          <UploadCard
            key={i}
            label={label}
            docKey={`doc_${i}`}
            value={docs[`doc_${i}`]}
            onChange={setDoc}
          />
        ))}
      </div>
      {uploadedCount < DOC_LIST.length && (
        <p className="text-xs text-amber-600 mt-4 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5" />
          You can proceed without uploading all documents, but all originals must be submitted at the college office.
        </p>
      )}
    </div>
  );

  /* â”€â”€â”€ STEP 6 — DECLARATION â”€â”€â”€ */
  const renderStep6 = () => {
    const step1Ok = !!form.surname.trim() && !!form.firstName.trim();
    const step2Ok = !!form.gender && !!form.dob && !!form.studentMobile;
    const step3Ok = !!form.permAddress.trim();
    const step4Ok = !!form.sscBoard.trim() && !!form.hscBoard.trim();
    const step5Ok = uploadedCount === DOC_LIST.length;

    const SummarySection = ({
      stepNum, label, ok, rows,
    }: {
      stepNum: number;
      label: string;
      ok: boolean;
      rows: [string, string][];
    }) => (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {ok ? (
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </span>
            ) : (
              <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-3 w-3 text-white" />
              </span>
            )}
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</p>
          </div>
          <button
            type="button"
            onClick={() => { setError(""); setStep(stepNum); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M12.146 1.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-3 1a.5.5 0 0 1-.635-.635l1-3a.5.5 0 0 1 .11-.168l9.5-9.5zm-8.5 9.354L3 13l2.5-.646L3.646 10.5zm.5-.5L11.5 3.5 12.5 4.5 5.5 11.5 4.146 10z"/></svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
          {rows.map(([k, v]) => (
            <div key={k} className="px-3 py-2">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{k}</p>
              <p className="font-semibold text-slate-800 text-xs mt-0.5 truncate">{v || <span className="text-amber-500 font-normal">Not filled</span>}</p>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-5">
        <SectionHeader title="Declaration & Submission" subtitle="Review your application and submit" />

        {/* Summary sections */}
        <div className="space-y-3">
          <SummarySection stepNum={1} label="Basic Information" ok={step1Ok} rows={[
            ["Surname", form.surname],
            ["First Name", form.firstName],
            ["Father/Husband", form.fatherHusbandName],
            ["Academic Year", form.academicYear],
          ]} />
          <SummarySection stepNum={2} label="Personal Details" ok={step2Ok} rows={[
            ["Gender", form.gender],
            ["Date of Birth", form.dob],
            ["Mobile", form.studentMobile],
            ["Category", form.category],
          ]} />
          <SummarySection stepNum={3} label="Address" ok={step3Ok} rows={[
            ["Permanent Address", form.permAddress.slice(0, 40) + (form.permAddress.length > 40 ? "\u2026" : "")],
            ["Local Address", form.localAddress ? form.localAddress.slice(0, 40) + (form.localAddress.length > 40 ? "\u2026" : "") : ""],
          ]} />
          <SummarySection stepNum={4} label="Academic Background" ok={step4Ok} rows={[
            ["SSC Board", form.sscBoard],
            ["SSC %", form.sscPercent],
            ["HSC Board", form.hscBoard],
            ["HSC %", form.hscPercent],
          ]} />
          <SummarySection stepNum={5} label="Documents" ok={step5Ok} rows={[
            ["Uploaded", `${uploadedCount} / ${DOC_LIST.length}`],
            ["Status", step5Ok ? "All uploaded" : `${DOC_LIST.length - uploadedCount} pending`],
          ]} />
        </div>

        {/* Declaration text */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Declaration</p>
          <div className="border border-slate-200 rounded-xl bg-slate-50/50 p-4 max-h-56 overflow-y-auto text-[12px] text-slate-700 leading-relaxed space-y-2 scrollbar-thin">
            <p>I, the undersigned, do hereby declare that all information furnished in this application form is true, complete and correct to the best of my knowledge and belief. I have not concealed or misstated any fact.</p>
            <p>I am aware that in the event of my application or admission being found to be based on false, incorrect or suppressed information, my admission is liable to be cancelled at any stage.</p>
            <p>I agree to abide by the rules and regulations of Swami Vivekanand School of Nursing, Udgir and the Maharashtra Nursing Council. I will maintain discipline, attend classes regularly and clear examination fees and other dues on time.</p>
            <p>I understand that the college authorities reserve the right to cancel my admission if I fail to comply with the rules and regulations of the institution or if my conduct is found to be unsatisfactory.</p>
            <p>I also declare that I have read and understood the fee structure, hostel rules (if applicable), and the terms of the bonding agreement if any, and I agree to abide by them.</p>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <button
            type="button"
            role="checkbox"
            aria-checked={declared}
            onClick={() => setDeclared(p => !p)}
            className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              declared ? "bg-emerald-500 border-emerald-500" : "border-slate-300 bg-white group-hover:border-blue-400"
            }`}
          >
            {declared && <Check className="h-3 w-3 text-white" />}
          </button>
          <span className="text-sm text-slate-700 leading-snug">
            I have read and agree to the declaration above. All information provided is true and correct. <span className="text-red-500">*</span>
          </span>
        </label>
      </div>
    );
  };

  /* â”€â”€â”€ MAIN RENDER â”€â”€â”€ */
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-5">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/admissions" className="hover:text-slate-700 transition-colors">Admissions</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-semibold">Apply Online</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 lg:items-start">
          {/* LEFT — Form Card */}
          <div>
            {/* Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-1">GNM Admissions 2026-27</p>
                <h1 className="text-white font-bold text-lg leading-tight">Swami Vivekanand School of Nursing</h1>
                <p className="text-blue-200 text-xs mt-0.5">Online Admission Form · Step {step} of {STEPS_CONFIG.length}</p>
              </div>

              {/* Step Progress */}
              <div className="px-6 pt-5 pb-1">
                <StepProgress current={step} />
              </div>

              {/* Step Content */}
              <div className="px-6 pb-6 pt-2">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
                {step === 6 && renderStep6()}
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-xs text-slate-400 font-medium">Step {step} / {STEPS_CONFIG.length}</span>
                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold shadow-sm transition-all"
                    >
                      Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting || !declared}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm transition-all"
                    >
                      {submitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <><CheckCircle className="h-4 w-4" /> Submit Application</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="mt-6 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <AdmissionFormPage />;
}

