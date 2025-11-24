"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Vision & Mission", href: "/vision-mission" },
    { name: "Academic", href: "/academic" },
    { name: "Admissions", href: "/admissions" },
    { name: "Facilities", href: "/facilities" },
    { name: "Downloads", href: "/downloads" },
    { name: "Messages", href: "/messages" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full z-50 bg-white sticky top-0 shadow-md">
      {/* TOP BAR: Logo & Name */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24 lg:h-28">
            {/* Logo and College Name */}
            <Link href="/" className="flex items-center gap-3 md:gap-5 group">
              <div className="relative w-14 h-14 md:w-22 md:h-28 flex-shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/nursinglogo (1).png"
                  alt="College Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 56px, 80px"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-serif font-bold text-blue-900 tracking-wide uppercase leading-none md:leading-tight">
                  SWAMI VIVEKANAND
                </h1>
                <h2 className="text-sm md:text-lg lg:text-xl font-serif font-bold text-blue-600 tracking-wide uppercase leading-none md:leading-tight mt-1">
                  SCHOOL OF NURSING
                </h2>
              </div>
            </Link>

            {/* Search / Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Search Bar (Desktop) */}
              <div className="hidden lg:flex items-center relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 w-48 xl:w-64 transition-all"
                />
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle Menu"
                >
                  {isOpen ? (
                    <X className="h-8 w-8 text-blue-900" />
                  ) : (
                    <Menu className="h-8 w-8 text-blue-900" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR: Blue Background */}
      <div className="bg-blue-600 text-white w-full relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-between h-12 xl:h-14 text-sm font-medium tracking-wide">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2 xl:px-4 h-full flex items-center hover:bg-blue-700 transition-colors duration-200 uppercase text-[11px] xl:text-sm font-bold tracking-wider whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-5">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium border-b border-gray-50 last:border-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;