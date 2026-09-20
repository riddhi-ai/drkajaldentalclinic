import React from 'react';
import { Phone, Calendar, Navigation, MessageCircle } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function MobileStickyBar({ onBookClick }) {
  const { contact, location } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`;

  return (
    <aside aria-label="Mobile quick actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2 sm:hidden shadow-lg">
      <div className="grid grid-cols-4 gap-2 text-center">
        
        {/* Call Now */}
        <a
          href={`tel:${contact.phoneTel}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-0.5">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Get Directions */}
        <a
          href={location.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-0.5">
            <Navigation className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Directions</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-teal-600 active:bg-teal-700 text-white shadow-soft"
        >
          <div className="w-8 h-8 rounded-full bg-teal-700/50 flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] font-bold">Book Appt</span>
        </button>

      </div>
    </aside>
  );
}
