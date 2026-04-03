"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const DEFAULT_ANNOUNCEMENTS = [
  "Admissions Open for GNM Batch 2026–27 – Only 60 Seats Available",
  "INC-Approved GNM Programme · 3 Years · Chhatrapati Sambhajinagar",
  "CNE Workshop Schedule Updated – Check CNE Section for Details",
  "New Academic Calendar 2026–27 Published – Download from Resources",
  "Results Declared: GNM First Year Practical Examinations",
  "Hospital Clinical Training at Affiliated Multi-Specialty Hospitals",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAdmissionsOpen, setMobileAdmissionsOpen] = useState(false);
  const [mobileFacilitiesOpen, setMobileFacilitiesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>(DEFAULT_ANNOUNCEMENTS);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length > 0) setAnnouncements(data as string[]);
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  const aboutDropdownItems = [
    { name: "Vision & Mission",  href: "/vision-mission" },
    { name: "Aims & Objectives", href: "/aims-objectives" },
    { name: "Faculty & Tutors",  href: "/faculty" },
    { name: "Messages",          href: "/messages" },
  ];
  const admissionsDropdownItems = [
    { name: "Admission Form",       href: "/admissions/apply" },
    { name: "Download Documents",   href: "/admissions/documents" },
    { name: "Eligibility Criteria", href: "/admissions/eligibility" },
    { name: "Fee Structure",        href: "/admissions/fees" },
    { name: "Overview",             href: "/admissions" },
  ];
  const facilitiesDropdownItems = [
    { name: "Laboratories",         href: "/facilities/laboratories" },
    { name: "Classrooms",           href: "/facilities/classrooms" },
    { name: "Library & Computer Lab", href: "/facilities/library" },
    { name: "Hostel & Amenities",   href: "/facilities/hostel" },
    { name: "Campus Building",      href: "/facilities/campus" },
  ];
  const resourcesDropdownItems = [
    { name: "GNM Course Syllabi",        href: "/resources/syllabus" },
    { name: "Previous Year Questions",   href: "/resources/previous-year-questions" },
    { name: "Question Banks",            href: "/resources/question-banks" },
    { name: "Academic Schedule",         href: "/resources/academic-schedule" },
    { name: "Forms & Guides",            href: "/resources/other" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const linkCls = (href: string) =>
    `px-2.5 xl:px-3 py-1 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-150 rounded-sm ${
      isActive(href)
        ? "bg-orange-600 text-white"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  const dropdownCls = (href: string) =>
    `flex items-center gap-0.5 px-2.5 xl:px-3 py-1 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-150 rounded-sm ${
      isActive(href)
        ? "bg-orange-600 text-white"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  const DropdownMenu = ({ items, onClose, right = false }: { items: { name: string; href: string }[]; onClose: () => void; right?: boolean }) => (
    <div className={`absolute top-full ${right ? "right-0" : "left-0"} min-w-[200px] bg-[#0f2a45] border border-white/10 py-1 z-50 shadow-2xl`}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-5 py-2.5 text-[11px] font-semibold text-white/80 hover:bg-white/15 hover:text-white transition-colors whitespace-nowrap border-b border-white/5 last:border-0"
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="w-full z-50 fixed top-0 left-0">

      {/* â”€â”€ ROW 1: Logo + College Name (white bar, h-14 = 56px) â”€â”€ */}
      <div className="bg-white border-b border-slate-200 h-20 flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-4 group">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/nursinglogo (1).png"
                alt="SVS Nursing Logo"
                fill
                className="object-contain"
                sizes="56px"
                priority
              />
            </div>
            <div className="leading-none">
              <p className="font-playfair font-bold text-xl text-slate-900 leading-tight">Swami Vivekanand School of Nursing</p>
              <p className="text-xs text-blue-700 font-semibold tracking-wide mt-1">Chhatrapati Sambhajinagar, Maharashtra · INC Approved</p>
            </div>
          </Link>
        </div>
      </div>

      {/* â”€â”€ ROW 2: Main Nav Bar (dark navy, h-10 = 40px) â”€â”€ */}
      <div className="bg-[#1a3a5c] h-10">
        <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center h-full gap-0">

              <Link href="/" className={linkCls("/")}>Home</Link>

              {/* About Us â–¼ */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <Link href="/about" className={dropdownCls("/about")}>
                  About Us <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${aboutOpen ? "rotate-180" : ""}`} />
                </Link>
                {aboutOpen && <DropdownMenu items={aboutDropdownItems} onClose={() => setAboutOpen(false)} />}
              </div>

              <Link href="/academic" className={linkCls("/academic")}>Academic</Link>

              {/* Admissions â–¼ */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setAdmissionsOpen(true)} onMouseLeave={() => setAdmissionsOpen(false)}>
                <Link href="/admissions" className={dropdownCls("/admissions")}>
                  Admissions <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${admissionsOpen ? "rotate-180" : ""}`} />
                </Link>
                {admissionsOpen && <DropdownMenu items={admissionsDropdownItems} onClose={() => setAdmissionsOpen(false)} />}
              </div>

              {/* Facilities â–¼ */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setFacilitiesOpen(true)} onMouseLeave={() => setFacilitiesOpen(false)}>
                <Link href="/facilities" className={dropdownCls("/facilities")}>
                  Facilities <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${facilitiesOpen ? "rotate-180" : ""}`} />
                </Link>
                {facilitiesOpen && <DropdownMenu items={facilitiesDropdownItems} onClose={() => setFacilitiesOpen(false)} />}
              </div>

              <Link href="/cne" className={linkCls("/cne")}>CNE</Link>

              {/* Student's Corner â–¼ */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
                <Link href="/downloads" className={dropdownCls("/downloads")}>
                  Student&apos;s Corner <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`} />
                </Link>
                {resourcesOpen && <DropdownMenu items={resourcesDropdownItems} onClose={() => setResourcesOpen(false)} />}
              </div>

              <Link href="/events" className={linkCls("/events")}>Events</Link>
              <Link href="/contact" className={linkCls("/contact")}>Contact Us</Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden flex items-center justify-center w-8 h-8 text-white hover:bg-white/15 rounded-sm transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* â”€â”€ ROW 3: Announcement Ticker (h-8 = 32px) â”€â”€ */}
      <div className="bg-[#0f2a45] h-8 flex items-center overflow-hidden border-t border-white/10">
        <div className="flex-shrink-0 px-3 h-full flex items-center bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider">
          Announcements
        </div>
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee inline-flex gap-10 whitespace-nowrap text-[11px] text-slate-300 font-medium">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Mobile Dropdown Menu â”€â”€ */}
      {isOpen && (
        <div className="lg:hidden bg-[#1a3a5c] border-t border-white/10 max-h-[75vh] overflow-y-auto">
          <div className="px-2 py-2 space-y-0.5">

            <Link href="/" className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setIsOpen(false)}>Home</Link>

            {/* About Us */}
            <div>
              <button className="flex items-center justify-between w-full px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setMobileAboutOpen(!mobileAboutOpen)}>
                About Us <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 pb-1 space-y-0.5">
                  <Link href="/about" className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>Overview</Link>
                  {aboutDropdownItems.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>{item.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/academic" className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setIsOpen(false)}>Academic</Link>

            {/* Admissions */}
            <div>
              <button className="flex items-center justify-between w-full px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setMobileAdmissionsOpen(!mobileAdmissionsOpen)}>
                Admissions <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAdmissionsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAdmissionsOpen && (
                <div className="pl-4 pb-1 space-y-0.5">
                  {admissionsDropdownItems.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>{item.name}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Facilities */}
            <div>
              <button className="flex items-center justify-between w-full px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setMobileFacilitiesOpen(!mobileFacilitiesOpen)}>
                Facilities <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileFacilitiesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileFacilitiesOpen && (
                <div className="pl-4 pb-1 space-y-0.5">
                  <Link href="/facilities" className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>All Facilities</Link>
                  {facilitiesDropdownItems.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>{item.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/cne" className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setIsOpen(false)}>CNE</Link>

            {/* Student's Corner */}
            <div>
              <button className="flex items-center justify-between w-full px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}>
                Student&apos;s Corner <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-4 pb-1 space-y-0.5">
                  <Link href="/downloads" className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>All Resources</Link>
                  {resourcesDropdownItems.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 text-slate-300 text-sm hover:bg-white/10 hover:text-white rounded transition-colors" onClick={() => setIsOpen(false)}>{item.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/events" className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setIsOpen(false)}>Events</Link>
            <Link href="/contact" className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-white/15 rounded transition-colors" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
