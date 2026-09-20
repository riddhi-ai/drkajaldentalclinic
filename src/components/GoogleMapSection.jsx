import React from 'react';
import { MapPin, Navigation, Phone, Calendar, Clock, ExternalLink } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function GoogleMapSection({ onBookClick }) {
  const { location, contact } = clinicConfig;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100/60 px-3.5 py-1.5 rounded-full">
            Visit Our Clinic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Find Us in <span className="text-gradient">Kothrud, Pune</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Conveniently located on DP Road near Ashish Garden Chowk with easy neighborhood access.
          </p>
        </div>

        {/* 2-Column: Map Frame + Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 min-h-[380px] sm:min-h-[460px] flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Dr. Kajal's Dental Clinic • Kothrud</span>
              </span>
              <a 
                href={location.googleMapsDirectionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full h-full min-h-[350px]">
              <iframe
                title="Google Maps Location of Dr. Kajal's Dental Clinic in Kothrud, Pune"
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right: Location & Action Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-teal-500 animate-ping" />
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                  Clinic Address & Landmark
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {clinicConfig.clinicName}
              </h3>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 mb-6 space-y-1 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{location.addressLine1}</p>
                <p>{location.addressLine2}</p>
                <p>{location.city}, {location.state} - {location.pincode}</p>
                <p className="text-xs text-teal-800 font-medium pt-2 border-t border-teal-100">
                  Landmark: {location.landmark}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Phone className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Phone Desk</span>
                    <a href={`tel:${contact.phoneTel}`} className="font-bold text-slate-900 hover:text-teal-700">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Consultation Hours</span>
                    <span className="font-semibold text-slate-800">5:30 PM – 9:00 PM (Mon – Sat)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              
              <a
                href={location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg active:scale-98 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call Clinic</span>
                </a>

                <button
                  onClick={onBookClick}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-xs transition-colors text-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
