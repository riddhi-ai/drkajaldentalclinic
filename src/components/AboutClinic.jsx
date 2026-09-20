import React from 'react';
import { Sparkles, Shield, HeartHandshake, Eye, Check } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function AboutClinic() {
  const clinicHighlights = [
    {
      title: "Clean & Modern Operatory",
      desc: "Equipped with advanced dental seating and precision lighting designed for patient comfort."
    },
    {
      title: "Calm & Relaxed Ambiance",
      desc: "A soothing atmosphere with positive encouragement to ease anxiety for adults and children alike."
    },
    {
      title: "Transparent & Respectful Care",
      desc: "Every procedure is explained before starting so you always feel confident and in control."
    },
    {
      title: "Comprehensive Specialities",
      desc: "From preventive cleanings to root canal and aligner consultations, all under one roof in Kothrud."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
            A Welcoming Dental Home
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3">
            About <span className="text-gradient">Our Clinic</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A serene, hygiene-first dental clinic located at DP Road, Kothrud, Pune.
          </p>
        </div>

        {/* 2-Column Story: Philosophy + Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Text Story & Highlights */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Patient-First Dentistry Designed for Comfort
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              At Dr. Kajal's Dental Clinic, we believe dental visits should feel calming rather than intimidating. Whether you are coming in for a routine check-up, managing tooth discomfort, or consulting on smile enhancements, we maintain a gentle, attentive pace.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Our clinic at Ashish Garden, DP Road is maintained with rigorous cleanliness standards and modern equipment to ensure reliable, high-quality care for every family member.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clinicHighlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 pl-7 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Showcase (Real Clinic Spaces) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Photo 1: Entrance */}
              <div className="space-y-4">
                <div className="group relative rounded-2xl overflow-hidden shadow-soft border border-slate-200 bg-white">
                  <img 
                    src="/images/clinic-entrance.webp" 
                    alt="Dr. Kajal's Dental Clinic entrance with speciality dentistry branding"
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-bold text-slate-900">Clinic Welcome & Entrance</p>
                    <p className="text-[11px] text-slate-500">Dr. Kajal's Speciality Dentistry</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-700 text-white shadow-soft">
                  <div className="text-2xl font-extrabold">5.0 ★</div>
                  <p className="text-xs text-teal-100 mt-1">22 Patient Reviews on Google</p>
                  <p className="text-[11px] text-teal-200/80 mt-2">Kothrud, Pune Dental Landmark</p>
                </div>
              </div>

              {/* Photo 2 & 3: Operatory & Lounge */}
              <div className="space-y-4 pt-6">
                <div className="group relative rounded-2xl overflow-hidden shadow-soft border border-slate-200 bg-white">
                  <img 
                    src="/images/clinic-operatory.webp" 
                    alt="Ergonomic modern dental chair at Dr. Kajal's clinic"
                    className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-bold text-slate-900">Modern Dental Operatory</p>
                    <p className="text-[11px] text-slate-500">High-grade sterilization setup</p>
                  </div>
                </div>

                <div className="group relative rounded-2xl overflow-hidden shadow-soft border border-slate-200 bg-white">
                  <img 
                    src="/images/clinic-lounge.webp" 
                    alt="Patient consultation and lounge corner with hygiene wall art"
                    className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-bold text-slate-900">Consultation Lounge</p>
                    <p className="text-[11px] text-slate-500">Relaxed waiting space</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
