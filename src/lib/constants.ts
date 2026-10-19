import { Branch, SiteSettings, MediaItem } from "@/types";

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: "DK Dance Company",
  tagline: "Learn • Train • Perform • Grow",
  director: "Dhanesh Krishnan",
  headOffice: "Kozhikode, Kerala, India",
  internationalBranch: "Bournemouth, United Kingdom",
  intro:
    "DK Dance Company (DKDC) is a professional dance training institution dedicated to developing dance skills, creativity, confidence, and stage performance. We provide structured dance training for children, teenagers, and adults, from beginners to advanced learners.",
  mission:
    "To inspire, train, and empower every dancer through quality dance education.",
  vision:
    "To build confident performers and create opportunities for dancers to learn, grow, and shine on stage.",
  fees: {
    admissionFee: "₹1,000",
    weeklyOneClassFee: "₹500 / month",
    weeklyTwoClassesFee: "₹800 / month",
    disclaimer:
      "Fees and schedules may vary by branch, program, or special training course. Students should confirm the applicable fee and timetable with the respective branch before admission.",
    paymentNote:
      "Monthly fees should be paid on or before the 10th of every month.",
  },
  onlineClasses: {
    headline: "Learn dance from anywhere in the world",
    description:
      "Access DKDC's world-class training curriculum from the comfort of your home. Our interactive digital sessions deliver individual attention, technical rigor, and artistic development.",
    features: [
      "Basic & Advanced Dance Movements",
      "Rhythm, Timing & Musicality",
      "Body Coordination & Flexibility",
      "Performance Conditioning & Technique",
    ],
  },
  contact: {
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    email: "info@dkdancecompany.com",
    address: "Head Office: Kozhikode, Kerala, India",
    website: "www.dkdancecompany.com",
  },
  socialLinks: {
    instagram: "https://instagram.com/dkdancecompany",
    facebook: "https://facebook.com/dkdancecompany",
    youtube: "https://youtube.com/@dkdancecompany",
    tiktok: "",
  },
};

export const INITIAL_BRANCHES: Branch[] = [
  {
    name: "Kunduparamba",
    slug: "kunduparamba",
    country: "India",
    state: "Kerala",
    city: "Kozhikode",
    address: "Kunduparamba, Kozhikode, Kerala, India",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Kunduparamba+Kozhikode",
    description:
      "Our Kunduparamba studio offers premier dance training across contemporary, hip-hop, and Bollywood styles for all age groups.",
    classTimings: "Weekly batches available. Please confirm with branch desk.",
    isActive: true,
    displayOrder: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Westhill",
    slug: "westhill",
    country: "India",
    state: "Kerala",
    city: "Kozhikode",
    address: "Westhill, Kozhikode, Kerala, India",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Westhill+Kozhikode",
    description:
      "Located in Westhill, this branch focuses on foundational technique, rhythm conditioning, and stage performance preparation.",
    classTimings: "Weekend & weekday batches available.",
    isActive: true,
    displayOrder: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Balussery",
    slug: "balussery",
    country: "India",
    state: "Kerala",
    city: "Kozhikode",
    address: "Balussery, Kozhikode, Kerala, India",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Balussery+Kozhikode",
    description:
      "DKDC Balussery provides comprehensive training programs from beginners to advanced competitive performers.",
    classTimings: "Weekend intensive batches available.",
    isActive: true,
    displayOrder: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kottooli",
    slug: "kottooli",
    country: "India",
    state: "Kerala",
    city: "Kozhikode",
    address: "Kottooli, Kozhikode, Kerala, India",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Kottooli+Kozhikode",
    description:
      "Equipped for contemporary, lyrical, and freestyle dance training with spacious dance floors and professional acoustic design.",
    classTimings: "Evening batches available for students & working professionals.",
    isActive: true,
    displayOrder: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Parambilbazar (Cheruvatta)",
    slug: "parambilbazar",
    country: "India",
    state: "Kerala",
    city: "Kozhikode",
    address: "Parambilbazar, Cheruvatta, Kozhikode, Kerala, India",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Parambilbazar+Kozhikode",
    description:
      "Serving Cheruvatta and Parambilbazar communities with dedicated classes for children, teenagers, and fitness enthusiasts.",
    classTimings: "Flexible weekly schedule.",
    isActive: true,
    displayOrder: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bournemouth",
    slug: "bournemouth-uk",
    country: "United Kingdom",
    state: "Dorset",
    city: "Bournemouth",
    address: "Bournemouth, United Kingdom",
    phone: "+91 9995 272 083",
    whatsapp: "919995272083",
    googleMapsUrl: "https://maps.google.com/?q=Bournemouth+UK",
    description:
      "Our international branch in the UK brings DKDC's signature movement culture, Indian dance expression, and contemporary choreography to the international stage.",
    classTimings: "International workshop schedules and regular term classes.",
    isActive: true,
    displayOrder: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },
];

export const DANCE_STYLES = [
  {
    number: "01",
    name: "Bollywood Dance",
    slug: "bollywood",
    tagline: "High Energy • Expression • Cinematic Rhythm",
    description:
      "Blending Indian theatrical expression with contemporary and commercial movement. High-octane choreography designed to build stamina, expressive stage presence, and musicality.",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Cinematic Expression & Storytelling",
      "Dynamic Footwork & Hand Gestures",
      "High-Energy Cardio & Stamina",
      "Folk & Modern Fusion Combinations",
    ],
  },
  {
    number: "02",
    name: "Hip-Hop",
    slug: "hip-hop",
    tagline: "Groove • Isolation • Musical Dynamics",
    description:
      "Authentic urban dance styles focusing on bounce, groove, body isolations, rhythm control, and personal style evolution.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Groove Conditioning & Musicality",
      "Body Isolations & Popping Foundations",
      "Freestyle Dynamics & Battle Presence",
      "Fast-Paced Contemporary Choreography",
    ],
  },
  {
    number: "03",
    name: "Contemporary Dance",
    slug: "contemporary",
    tagline: "Fluidity • Floorwork • Emotional Depth",
    description:
      "An artistic exploration of momentum, gravity, contraction, release, and fluid transitions between vertical and horizontal movement.",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Floorwork & Weight Transfer",
      "Breath Control & Momentum",
      "Contraction, Release & Suspension",
      "Improvisation & Story Interpretation",
    ],
  },
  {
    number: "04",
    name: "Lyrical Dance",
    slug: "lyrical",
    tagline: "Poetry • Emotion • Precision",
    description:
      "Merging technical precision with raw storytelling. Dancers translate lyrics, melodies, and emotional narratives into expressive kinetic art.",
    image:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Lyric Interpretation & Musical Nuance",
      "Controlled Extensions & Balances",
      "Seamless Kinetic Flow",
      "Deep Thematic Performance",
    ],
  },
  {
    number: "05",
    name: "Western Dance",
    slug: "western",
    tagline: "Showmanship • Precision • Stagecraft",
    description:
      "Commercial western stage routines combining jazz technique, synchronization, stage presence, and precision ensemble performance.",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Ensemble Synchronization & Line Discipline",
      "Stage Spatial Awareness",
      "Turn & Leap Formations",
      "Commercial Performance Standards",
    ],
  },
  {
    number: "06",
    name: "Freestyle Dance",
    slug: "freestyle",
    tagline: "Authenticity • Improvisation • Versatility",
    description:
      "Empowering dancers to break free from choreographic boundaries, trust their muscle memory, and respond authentically to any beat in real-time.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Spontaneous Rhythm Adaptation",
      "Individual Signature Moves",
      "Fearless Improvisation Drills",
      "Multi-Genre Musical Blending",
    ],
  },
];

export const SPECIAL_TRAINING_MODULES = [
  {
    title: "Basic Dance Movements",
    desc: "Foundational postures, balance alignment, weight shifting, and primary movement planes.",
  },
  {
    title: "Footwork Training",
    desc: "Agility drills, syncopated speed patterns, grounded heel-toe transfers, and rhythmic clarity.",
  },
  {
    title: "Tutting",
    desc: "Geometric arm, wrist, and finger choreography exploring precise 90-degree angles and illusions.",
  },
  {
    title: "Body Flexibility",
    desc: "Safe anatomical lengthening, range-of-motion expansion, and joint mobility enhancement.",
  },
  {
    title: "Stretching Exercises",
    desc: "Dynamic and PNF stretching routines designed to prevent injury and sustain athletic agility.",
  },
  {
    title: "Acrobatics & Movement Skills",
    desc: "Safe floor flips, rolls, aerial weight transfers, and acrobatic transitions into choreography.",
  },
];

export const INITIAL_GALLERY_ITEMS: MediaItem[] = [
  {
    type: "image",
    title: "Stage Choreography Showcase",
    category: "Performances",
    description: "DKDC senior company dancers performing contemporary routine.",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 1,
  },
  {
    type: "image",
    title: "Hip-Hop Intensive Workshop",
    category: "Workshops",
    description: "Studio session exploring isolation techniques and rhythm grooves.",
    url: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 2,
  },
  {
    type: "image",
    title: "Bournemouth UK Cultural Exchange",
    category: "Bournemouth",
    description: "International collaboration and masterclass sessions in Bournemouth, UK.",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 3,
  },
  {
    type: "image",
    title: "Annual Stage Extravaganza",
    category: "Stage Shows",
    description: "Lighting and synchronization during our Kozhikode grand stage show.",
    url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 4,
  },
  {
    type: "image",
    title: "Studio Movement & Flexibility Training",
    category: "Special Training",
    description: "Students conditioning acrobatics and stretching drills.",
    url: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 5,
  },
  {
    type: "image",
    title: "State Level Dance Championship",
    category: "Competitions",
    description: "DKDC competition team performing winning routine.",
    url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1200&q=80",
    published: true,
    displayOrder: 6,
  },
];
