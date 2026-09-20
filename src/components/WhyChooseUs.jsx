import React from 'react';
import { UserCheck, HeartHandshake, CalendarCheck, Smile, MapPin, MessageCircleHeart } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

const iconMap = {
  UserCheck,
  HeartHandshake,
  CalendarCheck,
  Smile,
  MapPin,
  MessageCircleHeart
};

export default function WhyChooseUs({ onBookClick }) {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Patient-Centric Dental Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Choose <span className="text-gradient">Dr. Kajal's Dental Clinic?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We focus on authentic, considerate care where you feel respected and comfortable from the moment you step in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicConfig.whyChooseUs.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Smile;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-teal-200 shadow-2xs hover:shadow-soft card-hover-lift transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
