import React from 'react';
import { Phone, MessageSquare, Navigation, Calendar, Mail, MapPin, Clock } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function ContactSection({ onBookClick }) {
  const { contact, location } = clinicConfig;

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`;

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-soft-lg relative overflow-hidden">
          
          {/* Decorative subtle background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Clinic Contact Info */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-widest bg-teal-500/20 px-3.5 py-1.5 rounded-full border border-teal-400/30 inline-block mb-4">
                Direct Clinic Assistance
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
                Get in Touch with Dr. Kajal's Dental Clinic
              </h2>
              
              <p className="text-teal-100/90 text-base mb-8 max-w-xl leading-relaxed">
                Have questions regarding a treatment, toothache, or scheduling? Contact us directly by call or WhatsApp. We are here to help.
              </p>

              <div className="space-y-4 text-sm text-teal-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-700/80 flex items-center justify-center shrink-0 text-teal-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Location</span>
                    <span>{location.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-700/80 flex items-center justify-center shrink-0 text-teal-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Direct Phone</span>
                    <a href={`tel:${contact.phoneTel}`} className="hover:text-teal-300 transition-colors font-medium">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-700/80 flex items-center justify-center shrink-0 text-teal-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Hours</span>
                    <span>Evening Sessions: 5:30 PM – 9:00 PM (Monday – Saturday)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Direct Action Buttons */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15">
              <h3 className="text-lg font-bold text-white mb-5 text-center sm:text-left">
                Quick Actions
              </h3>

              <div className="flex flex-col gap-3.5">
                
                {/* 1. Call Now */}
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call Now ({contact.phoneDisplay})</span>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>

                {/* 3. Get Directions */}
                <a
                  href={location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-teal-700/90 hover:bg-teal-700 text-white font-semibold text-sm border border-teal-500/50 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Map</span>
                </a>

                {/* 4. Book Appointment */}
                <button
                  onClick={onBookClick}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-soft transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
