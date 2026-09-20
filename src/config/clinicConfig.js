/**
 * Centralized Clinic Configuration for Dr. Kajal's Dental Clinic
 * 
 * All clinical information, timings, contact info, and services are centralized
 * here. Placeholders are clearly identified for clinic owner customization.
 */

export const clinicConfig = {
  // Brand Identity
  clinicName: "Dr. Kajal's Dental Clinic",
  tagline: "Your Smile Deserves Gentle, Personal Care.",
  subHeadline: "Quality dental care in a comfortable and welcoming environment.",
  
  // Doctor Profile (Editable placeholders for doctor qualifications and experience)
  doctor: {
    name: "Dr. Kajal",
    title: "Dental Surgeon & Speciality Dentistry",
    photo: "/images/dr-kajal-treating.webp",
    // Note: Qualifications, experience & awards are editable placeholders pending verification
    isPlaceholderProfile: true,
    qualifications: "B.D.S. (Dental Surgeon) [Placeholder - Doctor to confirm degree]",
    experience: "Practicing Dental Surgeon in Pune [Placeholder - Update years of experience]",
    specializations: [
      "Speciality Dentistry",
      "Restorative & Preventive Care",
      "Gentle Patient Consultation",
      "Paediatric Care",
      "Smile Designing"
    ],
    bio: "Dr. Kajal is dedicated to delivering gentle, attentive, and personalized dental care. At our Kothrud clinic, we prioritize patient comfort, clear communication, and modern dental techniques to help adults, children, and families maintain healthy smiles."
  },

  // Contact Details
  contact: {
    phoneDisplay: "088306 87816",
    phoneTel: "+918830687816",
    whatsappDisplay: "+91 88306 87816",
    // Verified format for WhatsApp API
    whatsappNumber: "918830687816",
    whatsappDefaultMessage: "Hello Dr. Kajal's Dental Clinic, I would like to inquire about an appointment.",
    email: "drkajal.dentalclinic@gmail.com [Placeholder - Doctor to confirm]",
    ownerNotificationEmail: "doctor@example.com", // Configured via backend OWNER_EMAIL env
  },

  // Clinic Location
  location: {
    addressLine1: "Ashish Garden, DP Rd, Sagar Colony,",
    addressLine2: "Guruganesh Nagar, Kothrud,",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    fullAddress: "Ashish Garden, DP Rd, Sagar Colony, Guruganesh Nagar, Kothrud, Pune, Maharashtra 411038",
    landmark: "Near Ashish Garden Chowk, DP Road",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Ashish+Garden,+DP+Rd,+Sagar+Colony,+Guruganesh+Nagar,+Kothrud,+Pune,+Maharashtra+411038&output=embed",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ashish+Garden,+DP+Rd,+Sagar+Colony,+Guruganesh+Nagar,+Kothrud,+Pune,+Maharashtra+411038",
  },

  // Reviews & Trust
  reputation: {
    rating: "5.0",
    ratingCount: "22",
    ratingSource: "Google Reviews",
    ratingNote: "Based on publicly available clinic rating (5.0 ★ · 22 Reviews). Reviews are patient submitted."
  },

  // Clinic Timings (Configurable schedule object)
  schedule: {
    referenceNote: "Reference indicates: Currently Opens at 5:30 PM (Evening Sessions). Full daily schedule can be customized below.",
    currentlyOpenNote: "Opens today at 5:30 PM",
    slots: [
      "05:30 PM - 06:00 PM",
      "06:00 PM - 06:30 PM",
      "06:30 PM - 07:00 PM",
      "07:00 PM - 07:30 PM",
      "07:30 PM - 08:00 PM",
      "08:00 PM - 08:30 PM",
      "08:30 PM - 09:00 PM"
    ],
    days: [
      { day: "Monday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Tuesday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Wednesday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Thursday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Friday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Saturday", hours: "5:30 PM – 9:00 PM", isOpen: true },
      { day: "Sunday", hours: "By Prior Appointment / Closed [Placeholder]", isOpen: false }
    ]
  },

  // Suggested Services (Categorized & clearly noted as suggested editable categories)
  services: [
    {
      id: "dental-checkup",
      name: "Dental Check-up & Consultation",
      tagline: "Comprehensive Oral Health Assessment",
      description: "Thorough examination of your teeth, gums, and oral tissues with personalized oral health guidance.",
      category: "Preventive",
      badge3d: "🔍",
      iconName: "ShieldCheck",
      popular: true,
      features: ["Oral cavity screening", "Digital photography check", "Personalized hygiene advice"]
    },
    {
      id: "teeth-cleaning",
      name: "Teeth Cleaning & Polishing",
      tagline: "Gentle Plaque & Tartar Removal",
      description: "Ultrasonic scaling and polishing to keep your gums healthy, freshen breath, and brighten your smile.",
      category: "Hygiene",
      badge3d: "✨",
      iconName: "Sparkles",
      popular: true,
      features: ["Painless ultrasonic scaling", "Stain removal & polish", "Gum health assessment"]
    },
    {
      id: "tooth-filling",
      name: "Tooth-Colored Filling",
      tagline: "Natural Aesthetic Restoration",
      description: "Composite tooth-colored fillings to repair cavities, restore tooth structure, and blend seamlessly.",
      category: "Restorative",
      badge3d: "🦷",
      iconName: "Smile",
      popular: false,
      features: ["Mercury-free composite", "Matches natural tooth shade", "Strong & long-lasting"]
    },
    {
      id: "root-canal",
      name: "Root Canal Treatment (RCT)",
      tagline: "Gentle Tooth Preservation",
      description: "Modern endodontic therapy to relieve toothache, clear infection, and save your natural tooth.",
      category: "Endodontics",
      badge3d: "🛡️",
      iconName: "Activity",
      popular: true,
      features: ["Advanced rotary endodontics", "Pain-alleviating therapy", "Crown restoration guidance"]
    },
    {
      id: "tooth-extraction",
      name: "Tooth Extraction",
      tagline: "Careful, Minimally Invasive Removal",
      description: "Gentle extraction procedure when a damaged or decayed tooth cannot be preserved, with comfortable recovery instructions.",
      category: "Oral Surgery",
      badge3d: "🩹",
      iconName: "ShieldAlert",
      popular: false,
      features: ["Gentle local anesthesia", "Minimal tissue trauma", "Clear aftercare support"]
    },
    {
      id: "wisdom-tooth",
      name: "Wisdom Tooth Consultation",
      tagline: "Impaction & Pain Assessment",
      description: "Clinical evaluation for impacted or painful wisdom teeth with conservative treatment advice.",
      category: "Oral Surgery",
      badge3d: "🩺",
      iconName: "HelpCircle",
      popular: false,
      features: ["Angulation & space analysis", "Pain & swelling management", "Safe surgical planning"]
    },
    {
      id: "dental-crowns",
      name: "Dental Crowns & Bridges",
      tagline: "Strength & Restored Function",
      description: "Custom-fitted ceramic or zirconia crowns to restore cracked or root-canal-treated teeth.",
      category: "Prosthodontics",
      badge3d: "👑",
      iconName: "Award",
      popular: false,
      features: ["Precision fit", "High-strength ceramics", "Natural bite restoration"]
    },
    {
      id: "braces-ortho",
      name: "Braces / Orthodontic Consultation",
      tagline: "Smile Alignment & Correction",
      description: "Consultation for teeth alignment, crowding, spacing, and bite correction for teens and adults.",
      category: "Orthodontics",
      badge3d: "📏",
      iconName: "Sliders",
      popular: true,
      features: ["Alignment diagnosis", "Metal, ceramic or aligner options", "Tailored treatment plan"]
    },
    {
      id: "cosmetic-dentistry",
      name: "Cosmetic Dentistry & Smile Designing",
      tagline: "Aesthetic Smile Enhancements",
      description: "Enhance your smile with aesthetic restorations, gap closures, and whitening consultations.",
      category: "Cosmetic",
      badge3d: "🌟",
      iconName: "Star",
      popular: false,
      features: ["Smile analysis", "Tooth reshaping & bonding", "Whitening consultation"]
    },
    {
      id: "pediatric-dentistry",
      name: "Pediatric Dentistry (Kids Care)",
      tagline: "Friendly, Gentle Care for Little Smiles",
      description: "Patient, caring dental examinations and preventive treatments designed specifically for children.",
      category: "Pediatric",
      badge3d: "🧸",
      iconName: "Heart",
      popular: true,
      features: ["Calm, friendly atmosphere", "Cavity prevention / fluorides", "Child-friendly education"]
    }
  ],

  // Real Clinic Gallery Photos
  gallery: [
    {
      title: "Doctor In Operatory",
      subtitle: "Dr. Kajal treating patient with modern dental unit",
      image: "/images/dr-kajal-treating.webp",
      tag: "Gentle Care"
    },
    {
      title: "Clinic Entrance & Welcome",
      subtitle: "Dr. Kajal's Speciality Dentistry - Kothrud",
      image: "/images/clinic-entrance.webp",
      tag: "Welcoming Space"
    },
    {
      title: "Modern Operatory Chair",
      subtitle: "High-spec ergonomic dental chair & illuminated mirror",
      image: "/images/clinic-operatory.webp",
      tag: "Advanced Setup"
    },
    {
      title: "Consultation & Waiting Area",
      subtitle: "Clean, calming patient lounge with oral hygiene encouragement",
      image: "/images/clinic-lounge.webp",
      tag: "Comfortable Environment"
    }
  ],

  // Why Choose Us Factual Benefits
  whyChooseUs: [
    {
      title: "Personalized Attention",
      description: "Dr. Kajal takes time to understand each patient's individual dental concerns and comfort level without rushing.",
      icon: "UserCheck"
    },
    {
      title: "Comfortable Environment",
      description: "Our clinic is designed to be calm, clean, and welcoming — helping even anxious and first-time patients feel at ease.",
      icon: "HeartHandshake"
    },
    {
      title: "Easy Appointment Booking",
      description: "Submit your request online in under 2 minutes. The clinic directly contacts you to confirm your convenient slot.",
      icon: "CalendarCheck"
    },
    {
      title: "Patient-Friendly Experience",
      description: "From children to elders, we explain every step clearly so you are always informed and comfortable.",
      icon: "Smile"
    },
    {
      title: "Convenient Kothrud Location",
      description: "Easily accessible at DP Road, near Ashish Garden Chowk, with convenient local transit access in Pune.",
      icon: "MapPin"
    },
    {
      title: "Clear Communication",
      description: "Honest treatment options and clear guidance so you can make the best choices for your oral health.",
      icon: "MessageCircleHeart"
    }
  ],

  // Honest FAQ (Avoiding unverified medical claims)
  faqs: [
    {
      q: "How can I book an appointment?",
      a: "You can easily submit an appointment request using our online booking form on this website, or call the clinic directly at 088306 87816. After you submit the form, the clinic will contact you to confirm your appointment time."
    },
    {
      q: "Can I request a preferred date and time?",
      a: "Yes. In the booking form, you can select your preferred date and evening time slot. Our clinic will review availability and confirm or coordinate the best timing with you."
    },
    {
      q: "How will my appointment be confirmed?",
      a: "Once your appointment request is received by Dr. Kajal's clinic team, we will call or WhatsApp you on your provided phone number to confirm your final appointment time. Submitting the form is an initial request and is confirmed once the clinic contacts you."
    },
    {
      q: "Where is the clinic located?",
      a: "We are located at Ashish Garden, DP Rd, Sagar Colony, Guruganesh Nagar, Kothrud, Pune, Maharashtra 411038 (near Ashish Garden Chowk, DP Road)."
    },
    {
      q: "How can I contact the clinic for urgent inquiries?",
      a: "You can call us directly on 088306 87816 or reach out via WhatsApp. A quick click on the 'Call Clinic' button on your phone will connect you immediately."
    },
    {
      q: "What dental services are available?",
      a: "We provide comprehensive dental care including routine check-ups, teeth cleaning, restorative fillings, root canal treatments, crowns, orthodontic consultations, pediatric care, and smile enhancements."
    },
    {
      q: "Do you treat children?",
      a: "Yes, Dr. Kajal's Dental Clinic welcomes children and families. We take special care to create a relaxed, positive, and gentle environment for young patients."
    }
  ]
};
