import React from 'react';
import { Calendar, ArrowRight, Sparkles, ShieldCheck, Heart, Phone } from 'lucide-react';
import ThreeTooth from './ThreeTooth';
import { clinicConfig } from '../config/clinicConfig';

export default function Hero({ onBookClick, onExploreClick }) {
  return (
    <section id="home" className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 bg-gradient-to-b from-ocean-50/60 via-dental-50/40 to-slate-50 overflow-hidden">
      {/* Decorative subtle dental background elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute -top-12 right-12 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clinic Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
              <span>Dr. Kajal's Speciality Dentistry • Kothrud, Pune</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Your Smile Deserves <br />
              <span className="text-gradient">Gentle, Personal Care.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              {clinicConfig.subHeadline} Designed to feel approachable for adults, families, and first-time dental visitors.
            </p>

            {/* Quick Benefits Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg">
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Relaxed & Clean Environment</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-100 shadow-sm">
                <Heart className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Gentle Care for All Ages</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-base shadow-soft hover:shadow-soft-lg transform active:scale-95 transition-all duration-150"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:border-slate-300 transition-all duration-150"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </button>
            </div>

            {/* Direct Phone Assistance */}
            <p className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
              <span>Prefer speaking directly?</span>
              <a 
                href={`tel:${clinicConfig.contact.phoneTel}`}
                className="font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call {clinicConfig.contact.phoneDisplay}</span>
              </a>
            </p>

          </div>

          {/* Right Column: 3D Visual Experience */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md relative">
              
              {/* 3D Tooth Interactive Canvas */}
              <div className="relative z-10">
                <ThreeTooth />
              </div>

              {/* Floating Highlight Card 1: Rated 5.0 */}
              <div className="absolute top-6 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 font-bold text-sm">
                  ★ 5.0
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">22 Google Reviews</p>
                  <p className="text-[11px] text-slate-500">Trusted Local Clinic</p>
                </div>
              </div>

              {/* Floating Highlight Card 2: Personal Care */}
              <div className="absolute bottom-6 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-3 animate-float-medium">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Speciality Dentistry</p>
                  <p className="text-[11px] text-slate-500">Kothrud, Pune</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
