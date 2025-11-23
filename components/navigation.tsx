'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Vision & Mission', href: '/vision-mission' },
    { name: 'Academic', href: '/academic' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'Messages', href: '/messages' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      {/* TOP BAR: Logo & Name (Clean, No Advertisements) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28">
          {/* Logo and College Name */}
          <Link href="/" className="flex items-center gap-4 md:gap-6 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <Image 
                src="/nursinglogo (1).png" 
                alt="College Logo"
                width={80}
                height={80}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-3xl font-serif font-bold text-blue-900 tracking-wide uppercase leading-tight">
                SWAMI VIVEKANAND
              </h1>
              <h2 className="text-lg md:text-2xl font-serif font-bold text-blue-600 tracking-wide uppercase leading-tight">
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
                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-600 w-64 transition-all"
               />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-8 w-8 text-blue-900" /> : <Menu className="h-8 w-8 text-blue-900" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR: Blue Background */}
      <div className="bg-blue-600 text-white w-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-between h-14 text-sm font-medium tracking-wide">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-4 h-full flex items-center hover:bg-blue-700 transition-colors duration-200 uppercase text-xs xl:text-sm font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-400 border-t border-blue-500">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-3 rounded-md text-white hover:bg-blue-700 font-medium uppercase tracking-wide"
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
