import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clinicConfig } from '../config/clinicConfig';

export default function AppointmentBooking({ preselectedService = '', onResetPreselect }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    age: '',
    service: preselectedService || clinicConfig.services[0]?.name || 'Dental Check-up & Consultation',
    preferred_date: '',
    preferred_time: clinicConfig.schedule.slots[0] || '05:30 PM - 06:00 PM',
    message: '',
    website_hp: '' // Anti-bot honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submittedData, setSubmittedData] = useState(null);
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  // Sync preselectedService prop if passed from a service card
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Minimum date selectable is today
  const todayStr = new Date().toISOString().split('T')[0];

  // Client-side validation
  const validate = () => {
    const errs = {};

    if (!formData.patient_name.trim() || formData.patient_name.trim().length < 2) {
      errs.patient_name = 'Please enter your full name (minimum 2 characters).';
    }

    // Indian phone number validation
    const cleanedPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errs.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for sending request details.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Age validation (optional, but if provided must be realistic)
    if (formData.age) {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        errs.age = 'Please enter a valid age between 1 and 120.';
      }
    }

    if (!formData.service) {
      errs.service = 'Please select a service or consultation.';
    }

    if (!formData.preferred_date) {
      errs.preferred_date = 'Please choose a preferred appointment date.';
    } else {
      const selected = new Date(formData.preferred_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.preferred_date = 'Date cannot be in the past.';
      }
    }

    if (!formData.preferred_time) {
      errs.preferred_time = 'Please select a preferred time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear individual error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setServerErrorMessage('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setSubmittedData(data.appointment || formData);
        
        // Trigger celebratory confetti on request receipt
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas blocked
        }

      } else {
        setSubmitStatus('error');
        setServerErrorMessage(
          data.message || 'Something went wrong. Please try again or call the clinic at 088306 87816.'
        );
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setServerErrorMessage(
        'Something went wrong. Please try again or call the clinic at 088306 87816.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitStatus(null);
    setSubmittedData(null);
    setFormData({
      patient_name: '',
      phone: '',
      email: '',
      age: '',
      service: clinicConfig.services[0]?.name || 'Dental Check-up & Consultation',
      preferred_date: '',
      preferred_time: clinicConfig.schedule.slots[0] || '05:30 PM - 06:00 PM',
      message: '',
      website_hp: ''
    });
    if (onResetPreselect) onResetPreselect();
  };

  return (
    <section id="appointment" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-teal-50/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200">
            Convenient Online Booking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Request an <span className="text-gradient">Appointment</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Fill out your details below to request an appointment. Our clinic team will contact you to coordinate and confirm your visit.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft-lg border border-slate-200/80 relative">
          
          {/* Honeypot field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Leave empty</label>
            <input
              id="website_hp"
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          {/* STATE 1: SUCCESS CONFIRMATION SCREEN */}
          {submitStatus === 'success' ? (
            <div className="text-center py-8 sm:py-12 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              {/* Exact prompt-compliant wording */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Appointment request received!
              </h3>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                Thank you for choosing <strong>Dr. Kajal's Dental Clinic</strong>. Your appointment request has been received. The clinic will contact you to confirm your appointment.
              </p>

              {/* Summary of request */}
              {submittedData && (
                <div className="max-w-md mx-auto bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5 mb-8 text-left text-sm text-slate-700">
                  <div className="font-bold text-teal-900 pb-2 border-b border-teal-200/60 mb-3 flex items-center justify-between">
                    <span>Request Summary</span>
                    {submittedData.appointment_id && (
                      <span className="text-xs font-mono text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200">
                        {submittedData.appointment_id}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p><span className="text-slate-500 font-medium">Patient:</span> <strong>{submittedData.patient_name}</strong></p>
                    <p><span className="text-slate-500 font-medium">Treatment:</span> <strong>{submittedData.service}</strong></p>
                    <p><span className="text-slate-500 font-medium">Preferred Date:</span> {submittedData.preferred_date}</p>
                    <p><span className="text-slate-500 font-medium">Preferred Time:</span> {submittedData.preferred_time}</p>
                  </div>
                </div>
              )}

              {/* Notice that it's a request awaiting clinic call */}
              <div className="inline-block bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-xl mb-8 max-w-lg">
                ℹ️ <strong>Please note:</strong> This request is currently <strong>Pending</strong>. You will receive a direct phone call or WhatsApp message from our doctor/clinic desk to finalize the slot.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
                >
                  Submit Another Request
                </button>
                <a
                  href={`tel:${clinicConfig.contact.phoneTel}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-soft flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Clinic: {clinicConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          ) : (
            /* STATE 2: ACTIVE BOOKING FORM */
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Server Error Alert Banner */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Notice</p>
                    <p>{serverErrorMessage}</p>
                  </div>
                </div>
              )}

              {/* Section 1: Patient Personal Details */}
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                  <User className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.patient_name 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                      required
                    />
                    {errors.patient_name && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.patient_name}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (Indian) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                          errors.phone 
                            ? 'border-rose-400 ring-2 ring-rose-100' 
                            : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                        }`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.email 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Age (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Patient Age <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 28"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.age 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                    />
                    {errors.age && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.age}</p>
                    )}
                  </div>

                </div>
              </div>

              {/* Section 2: Appointment & Treatment Preferences */}
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">Appointment Preferences</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Service <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.service 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                      required
                    >
                      {clinicConfig.services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="General Consultation / Other">Other / General Consultation</option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      min={todayStr}
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.preferred_date 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                      required
                    />
                    {errors.preferred_date && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.preferred_date}</p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.preferred_time 
                          ? 'border-rose-400 ring-2 ring-rose-100' 
                          : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                      required
                    >
                      {clinicConfig.schedule.slots.map((slot, idx) => (
                        <option key={idx} value={slot}>
                          {slot}
                        </option>
                      ))}
                      <option value="Other / Flexible Timing">Other / Flexible Evening Timing</option>
                    </select>
                    {errors.preferred_time && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.preferred_time}</p>
                    )}
                  </div>

                </div>
              </div>

              {/* Message / Reason for visit */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Reason for Visit <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about any tooth sensitivity, pain duration, or dental questions..."
                  className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                ></textarea>
              </div>

              {/* Transparency Notice */}
              <div className="bg-slate-50 rounded-xl p-4 mb-8 text-xs text-slate-500 border border-slate-200/60 leading-relaxed">
                🛡️ <strong>Booking Confirmation Process:</strong> Submitting this form sends an appointment request to Dr. Kajal's clinic. Our team will review the doctor's schedule and reach out to you via phone or WhatsApp to finalize your booking.
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Required fields are marked with <span className="text-rose-500 font-bold">*</span>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base shadow-soft text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-teal-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 active:scale-98 hover:shadow-soft-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting your appointment request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
