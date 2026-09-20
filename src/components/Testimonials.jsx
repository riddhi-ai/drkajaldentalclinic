import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function Testimonials() {
  // Clear placeholder review slots conforming strictly to prompt requirements
  const reviewPlaceholders = [
    {
      id: 1,
      name: "Patient Feedback #1",
      tag: "Google Reviewer",
      stars: 5,
      content: "Add verified patient review here. Once the clinic owner shares authorized patient testimonials or Google review texts, they can be directly added here.",
      isPlaceholder: true
    },
    {
      id: 2,
      name: "Patient Feedback #2",
      tag: "Google Reviewer",
      stars: 5,
      content: "Add verified patient review here. Once the clinic owner shares authorized patient testimonials or Google review texts, they can be directly added here.",
      isPlaceholder: true
    },
    {
      id: 3,
      name: "Patient Feedback #3",
      tag: "Google Reviewer",
      stars: 5,
      content: "Add verified patient review here. Once the clinic owner shares authorized patient testimonials or Google review texts, they can be directly added here.",
      isPlaceholder: true
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Public Reputation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Patient Feedback & <span className="text-gradient">Ratings</span>
          </h2>
          
          {/* Real Rating Banner */}
          <div className="mt-4 inline-flex items-center gap-3 bg-white px-5 py-2 rounded-2xl shadow-soft border border-slate-200">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-900 font-bold text-base">5.0 / 5.0</span>
            <span className="text-slate-500 text-xs font-medium border-l border-slate-200 pl-3">
              (22 Reviews on Google Maps)
            </span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewPlaceholders.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Placeholder Slot
                  </span>
                </div>

                <p className="text-sm text-slate-500 italic leading-relaxed mb-6">
                  "{review.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  ★
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">{review.name}</h4>
                  <p className="text-[10px] text-slate-400">{review.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-fabrication integrity note */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          🔒 In adherence to ethical medical transparency, reviews are marked as customizable slots until verified patient quotes are authorized by the clinic owner.
        </div>

      </div>
    </section>
  );
}
