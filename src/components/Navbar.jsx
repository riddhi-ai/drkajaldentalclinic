import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, Clock, MapPin } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function Navbar({ onBookClick, onAdminClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Hours', href: '#hours' },
    { name: 'Find Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top Announcement / Quick Info Bar */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-teal-200">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Ashish Garden, DP Rd, Kothrud, Pune</span>
            </span>
            <span className="flex items-center gap-1.5 text-teal-200">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{clinicConfig.schedule.currentlyOpenNote}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-[11px] border border-amber-400/30">
              ★ 5.0 Rated (22 Reviews)
            </span>
            <a 
              href={`tel:${clinicConfig.contact.phoneTel}`}
              className="hover:text-teal-300 font-medium transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>{clinicConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <span className="text-xl">🦷</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                  {clinicConfig.clinicName}
                </span>
                <span className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider">
                  Speciality Dentistry • Kothrud
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${clinicConfig.contact.phoneTel}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-slate-700 hover:text-teal-700 hover:bg-teal-50/80 text-sm font-semibold transition-all border border-slate-200"
                title="Call Dr. Kajal's Dental Clinic"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{clinicConfig.contact.phoneDisplay}</span>
              </a>

              <button
                onClick={() => onBookClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm font-semibold shadow-soft hover:shadow-soft-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK APPOINTMENT</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => onBookClick()}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 text-white shadow-sm flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={`tel:${clinicConfig.contact.phoneTel}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call: {clinicConfig.contact.phoneDisplay}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-sm shadow-soft text-center"
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
