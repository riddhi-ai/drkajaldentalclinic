import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Lock } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function Footer({ onAdminClick, onBookClick }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm pt-14 pb-24 sm:pb-14 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Clinic Overview */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <span className="text-xl">🦷</span>
              <span>{clinicConfig.clinicName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Gentle, personalized dental care in a comfortable and welcoming clinic environment for adults, teens, children, and families.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-amber-400">
              <span>★ 5.0 Rated</span>
              <span className="text-slate-500">•</span>
              <span>22 Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">Meet Dr. Kajal</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Dental Treatments</a></li>
              <li><a href="#why-us" className="hover:text-teal-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#hours" className="hover:text-teal-400 transition-colors">Clinic Timings</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Find Clinic on Map</a></li>
            </ul>
          </div>

          {/* Col 3: Clinic Information */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Clinic Location & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>{clinicConfig.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <a href={`tel:${clinicConfig.contact.phoneTel}`} className="text-white hover:text-teal-400 font-semibold">
                  {clinicConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Evening: 5:30 PM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 4: Appointments & Admin Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Patient Appointments
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Ready to schedule your visit? Submit an online request or call our clinic desk directly.
            </p>
            <button
              onClick={onBookClick}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-soft transition-all text-center mb-4"
            >
              Book Appointment Now
            </button>

            {/* Doctor/Staff Secure Admin Link */}
            <div className="pt-2">
              <button
                onClick={onAdminClick}
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-teal-400 transition-colors"
                title="Staff & Doctor Login"
              >
                <Lock className="w-3 h-3" />
                <span>Doctor / Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & ethical medical disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {clinicConfig.clinicName}. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right max-w-lg">
            Dental information provided is for general educational & scheduling purposes. Diagnosis and treatment recommendations are determined upon in-clinic clinical examination.
          </p>
        </div>

      </div>
    </footer>
  );
}
