import React from 'react';
import { Award, GraduationCap, Clock, CheckCircle2, UserCheck, Calendar } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function AboutDoctor({ onBookClick }) {
  const { doctor } = clinicConfig;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Dedicated Dental Surgeon</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Meet <span className="text-gradient">Dr. Kajal</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Focused on gentle, considerate dental care where your questions are answered and your comfort always comes first.
          </p>
        </div>

        {/* Doctor Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Real Photo Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500 to-sky-400 rounded-3xl opacity-20 blur-lg transform -rotate-1" />
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft-lg bg-slate-100 border-4 border-white">
                <img 
                  src={doctor.photo} 
                  alt="Dr. Kajal treating patient at Dr. Kajal's Dental Clinic in Kothrud, Pune"
                  className="w-full h-[460px] object-cover object-top hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />

                {/* In-photo badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-soft border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{doctor.name}</h3>
                      <p className="text-xs font-semibold text-teal-700">{doctor.title}</p>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                      ★ 5.0
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Doctor Details Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="mb-6">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Professional Profile</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {doctor.name}
              </h3>
              <p className="text-base font-medium text-teal-800 mt-1">
                {doctor.title}
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {doctor.bio}
            </p>

            {/* Profile Fields (with clear editable configuration indicator) */}
            <div className="space-y-4 mb-8">
              
              {/* Qualifications */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Professional Degree & Education</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {doctor.qualifications}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Clinical Practice & Location</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {doctor.experience}
                  </p>
                </div>
              </div>

              {/* Specializations */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">
                  Areas of Focus & Patient Care
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Book with Dr. Kajal Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-soft hover:shadow-soft-lg active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Consultation with Dr. Kajal</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
