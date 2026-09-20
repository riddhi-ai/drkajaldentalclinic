import React from 'react';
import { Clock, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function ClinicHours() {
  const { schedule } = clinicConfig;

  // Determine current day for highlighting
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  return (
    <section id="hours" className="py-16 bg-slate-50 relative border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full">
            Clinic Schedule
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Consultation <span className="text-gradient">Timings & Days</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Convenient evening consultation hours for professionals, parents, and students in Kothrud.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80">
          
          {/* Status Indicator Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-teal-50 border border-teal-100 mb-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-sm font-bold text-teal-900">Current Status: Opens at 5:30 PM</span>
                </div>
                <p className="text-xs text-teal-700 mt-0.5">
                  Evening clinic consultations open today at 5:30 PM (IST)
                </p>
              </div>
            </div>

            <div className="text-xs font-bold bg-white text-teal-800 px-3.5 py-1.5 rounded-full border border-teal-200 shadow-2xs">
              Evening Sessions
            </div>
          </div>

          {/* Daily Schedule List */}
          <div className="divide-y divide-slate-100">
            {schedule.days.map((item, idx) => {
              const isToday = item.day === todayName;
              return (
                <div 
                  key={idx} 
                  className={`py-3.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                    isToday ? 'bg-teal-50/50 font-semibold text-teal-950' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{item.day}</span>
                    {isToday && (
                      <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span>{item.hours}</span>
                    {item.isOpen ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-xs text-slate-400 font-normal">(Prior Appt)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Configurable Notice Note */}
          <p className="mt-6 text-center text-xs text-slate-400">
            * Timings can be customized by clinic owner in <code className="text-slate-500 font-mono">clinicConfig.js</code>. Prior appointments are recommended to minimize waiting time.
          </p>

        </div>

      </div>
    </section>
  );
}
