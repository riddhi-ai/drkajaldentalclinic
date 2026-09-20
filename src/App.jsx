import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import AboutDoctor from './components/AboutDoctor';
import AboutClinic from './components/AboutClinic';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AppointmentBooking from './components/AppointmentBooking';
import ClinicHours from './components/ClinicHours';
import GoogleMapSection from './components/GoogleMapSection';
import Testimonials from './components/Testimonials';
import FAQAccordion from './components/FAQAccordion';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin'
  const [preselectedService, setPreselectedService] = useState('');

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    scrollToSection('appointment');
  };

  const handleBookService = (serviceName) => {
    setPreselectedService(serviceName);
    scrollToSection('appointment');
  };

  if (currentView === 'admin') {
    return <AdminDashboard onBackToSite={() => setCurrentView('public')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Header Navbar */}
      <Navbar 
        onBookClick={handleBookClick} 
        onAdminClick={() => setCurrentView('admin')} 
      />

      {/* Main Website Content */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D Tooth Canvas & Trust Badges */}
        <Hero 
          onBookClick={handleBookClick} 
          onExploreClick={() => scrollToSection('services')} 
        />

        {/* 2. Trust Bar (Rating, Kothrud Location, Phone, Hours) */}
        <TrustBar />

        {/* 3. About Doctor: "Meet Dr. Kajal" */}
        <AboutDoctor onBookClick={handleBookClick} />

        {/* 4. About Our Clinic (Authentic Operatory & Entrance Photos) */}
        <AboutClinic />

        {/* 5. Services Section (10 suggested categories + 3D badges) */}
        <Services onBookService={handleBookService} />

        {/* 6. Why Choose Us (Factual Patient Benefits) */}
        <WhyChooseUs onBookClick={handleBookClick} />

        {/* 7. Appointment Booking Section (CORE MVP FEATURE) */}
        <AppointmentBooking 
          preselectedService={preselectedService} 
          onResetPreselect={() => setPreselectedService('')}
        />

        {/* 8. Clinic Hours Component (Opens 5:30 PM & Weekly Schedule) */}
        <ClinicHours />

        {/* 9. Google Maps "Find Us" Section */}
        <GoogleMapSection onBookClick={handleBookClick} />

        {/* 10. Patient Reviews / Testimonials Slots */}
        <Testimonials />

        {/* 11. FAQ Accordion */}
        <FAQAccordion />

        {/* 12. Contact Section with Direct Call, WhatsApp & Directions */}
        <ContactSection onBookClick={handleBookClick} />
      </main>

      {/* Footer */}
      <Footer 
        onAdminClick={() => setCurrentView('admin')} 
        onBookClick={handleBookClick}
      />

      {/* Mobile Bottom Quick-Action Bar */}
      <MobileStickyBar onBookClick={handleBookClick} />

    </div>
  );
}
