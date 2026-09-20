import React from 'react';
import { Star, MapPin, PhoneCall, Clock4, CheckCircle2 } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function TrustBar() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-soft-lg border border-slate-100/80 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Trust Metric 1: Google Rating */}
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-base sm:text-lg">
                <span>{clinicConfig.reputation.rating} ★</span>
                <span className="text-xs font-normal text-slate-500">({clinicConfig.reputation.ratingCount} Reviews)</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Patient-submitted feedback</p>
            </div>
          </div>

          {/* Trust Metric 2: Clinic Location */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base">
                Kothrud, Pune
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[150px] sm:max-w-none">
                Ashish Garden, DP Road
              </p>
            </div>
          </div>

          {/* Trust Metric 3: Quick Direct Phone */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <a 
                href={`tel:${clinicConfig.contact.phoneTel}`}
                className="font-bold text-slate-900 hover:text-teal-600 text-sm sm:text-base transition-colors"
              >
                {clinicConfig.contact.phoneDisplay}
              </a>
              <p className="text-xs text-slate-500 font-medium">Direct Clinic Desk</p>
            </div>
          </div>

          {/* Trust Metric 4: Clinic Hours */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock4 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-emerald-700 text-sm sm:text-base flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Opens 5:30 PM</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Evening Sessions</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
