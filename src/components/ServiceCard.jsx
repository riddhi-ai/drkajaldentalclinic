import React from 'react';
import { Calendar, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function ServiceCard({ service, onBookService }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft card-hover-lift flex flex-col justify-between relative overflow-hidden group">
      
      {/* Top Accent Stripe on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header: 3D Badge + Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
            {service.badge3d}
          </div>
          <div className="flex items-center gap-1.5">
            {service.popular && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Popular
              </span>
            )}
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {service.category}
            </span>
          </div>
        </div>

        {/* Service Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
          {service.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs font-semibold text-teal-600 mt-1 mb-3">
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Key Features Bullet List */}
        {service.features && (
          <ul className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
            {service.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={() => onBookService(service.name)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-teal-600 text-slate-700 hover:text-white font-semibold text-xs transition-all duration-200 border border-slate-200 hover:border-teal-600 shadow-2xs group-hover:shadow-soft"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Appointment</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-60 group-hover:opacity-100" />
        </button>
      </div>

    </div>
  );
}
