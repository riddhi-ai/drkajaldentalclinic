import React, { useState } from 'react';
import { Sparkles, Info, Filter } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { clinicConfig } from '../config/clinicConfig';

export default function Services({ onBookService }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Preventive', 'Restorative', 'Endodontics', 'Orthodontics', 'Cosmetic', 'Pediatric'];

  const filteredServices = activeCategory === 'ALL' 
    ? clinicConfig.services 
    : clinicConfig.services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Dental Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our Dental <span className="text-gradient">Services & Consultations</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Thoughtful, modern dental treatments tailored for every stage of oral health.
          </p>

          {/* Prompt Compliant Transparency Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-800 text-xs font-medium text-left">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Note:</strong> These represent suggested clinical categories offered at Dr. Kajal's Speciality Dentistry. Services and treatment plans are customized based on individual doctor consultation.
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white shadow-soft'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'ALL' ? 'All Treatments' : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onBookService={onBookService}
            />
          ))}
        </div>

        {/* Custom inquiry prompt */}
        <div className="mt-14 text-center p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-teal-50 border border-teal-100 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-slate-800">
            Need a specific treatment or dental advice not listed above?
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Call our Kothrud clinic desk at <a href={`tel:${clinicConfig.contact.phoneTel}`} className="font-bold text-teal-700 underline">{clinicConfig.contact.phoneDisplay}</a> for assistance.
          </p>
        </div>

      </div>
    </section>
  );
}
