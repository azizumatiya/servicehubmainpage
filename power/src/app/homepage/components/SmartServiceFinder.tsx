"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aiPulseJson from "@/lottie/ai-pulse.json";
import serviceRobotJson from "@/lottie/service-robot.json";
import { Mic, X, MessageSquare, Check, Star, MapPin, Clock, DollarSign, Filter, Phone, Mail, User, Calendar, Camera, ExternalLink } from "lucide-react";

type Answers = {
  issue?: string;
  locationType?: string;
  budget?: string;
  urgency?: string;
  technicianType?: string;
  technicianSubtype?: string;
  additionalDetails?: string;
  preferredTime?: string;
  contactNumber?: string;
};

const SERVICE_OPTIONS = {
  issues: [
    "AC Not Cooling",
    "Water Leakage",
    "Electrical Issue",
    "Installation Needed",
    "Washing Machine Problem",
  ],
  locationTypes: ["Home", "Shop", "Office", "Apartment"],
  budgets: ["₹200 - ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"],
  urgency: ["Today", "Within 48 hours", "This week", "Flexible"],
  preferredTimes: ["Morning (9AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-8PM)", "Anytime"],
};

const TECHNICIAN_CATEGORIES = [
  {
    id: "home-appliance",
    name: "Home Appliance Technicians",
    icon: "🏠",
    keywords: ["ac", "refrigerator", "washing machine", "microwave", "ro", "geyser", "dishwasher", "chimney", "gas stove", "home theater", "fridge", "cooler", "oven", "purifier"],
    technicians: [
      { id: "ac-tech", name: "AC Technician", description: "AC servicing, gas filling, repair, installation." },
      { id: "refrigerator-tech", name: "Refrigerator Technician", description: "Cooling issues, gas charging, compressor repair." },
      { id: "washing-tech", name: "Washing Machine Technician", description: "Front/Top load repair, drum issues, motor service." },
      { id: "microwave-tech", name: "Microwave Oven Technician", description: "Heating issue, touchpad, magnetron repair." },
      { id: "ro-tech", name: "RO Water Purifier Technician", description: "RO filter change, servicing, leakage repair." },
      { id: "geyser-tech", name: "Geyser Technician", description: "Heating element replace, installation/repair." },
      { id: "dishwasher-tech", name: "Dishwasher Technician", description: "Drain, heating & spray arm repair." },
      { id: "chimney-tech", name: "Chimney Technician", description: "Deep cleaning, motor repair, duct installation." },
      { id: "gas-stove-tech", name: "Gas Stove/Hob Technician", description: "Burner repair, knob change, gas leakage fix." },
      { id: "home-theater-tech", name: "Home Theater Technician", description: "Setup, wiring, sound calibration." },
    ]
  },
  {
    id: "electrical",
    name: "Electrical Technicians",
    icon: "⚡",
    keywords: ["electrical", "electrician", "wiring", "inverter", "stabilizer", "switchboard", "solar", "generator", "led", "cctv power", "ups", "circuit", "switch", "light", "fan"],
    technicians: [
      { id: "electrician-general", name: "Electrician (General)", description: "Switchboard, wiring, fan, light installation." },
      { id: "wiring-tech", name: "Wiring & Rewiring Technician", description: "House wiring, short circuit fix, load balancing." },
      { id: "inverter-tech", name: "Inverter Technician", description: "Battery change, inverter repair & servicing." },
      { id: "stabilizer-tech", name: "Stabilizer Technician", description: "Voltage issues, PCB repair." },
      { id: "switchboard-tech", name: "Switchboard Technician", description: "Switch/MCB installation, burnt board repair." },
      { id: "solar-tech", name: "Solar Panel Technician", description: "Solar installation, cleaning, inverter repair." },
      { id: "generator-tech", name: "Generator Technician", description: "DG servicing, oil change, noise issue fixing." },
      { id: "led-tech", name: "LED Panel Light Technician", description: "LED fittings, driver replacement." },
      { id: "cctv-power-tech", name: "CCTV Power Technician", description: "Power supply fix, adapter change." },
      { id: "ups-tech", name: "UPS Technician", description: "UPS battery replacement & repair." },
    ]
  },
  {
    id: "electronics",
    name: "Electronics Repair Technicians",
    icon: "📱",
    keywords: ["tv", "laptop", "desktop", "printer", "projector", "mobile", "speaker", "cctv", "biometrics", "gaming", "computer", "phone", "monitor", "playstation", "xbox"],
    technicians: [
      { id: "tv-tech", name: "TV Repair Technician", description: "Display, sound, motherboard repair." },
      { id: "laptop-tech", name: "Laptop Technician", description: "OS, keyboard, screen, motherboard fix." },
      { id: "desktop-tech", name: "Desktop Technician", description: "CPU assembly, repair, cleaning." },
      { id: "printer-tech", name: "Printer Technician", description: "Inkjet/laser repair, cartridge cleaning." },
      { id: "projector-tech", name: "Projector Technician", description: "Lens, lamp, display repair." },
      { id: "mobile-tech", name: "Mobile Technician", description: "Screen, battery, charging repair." },
      { id: "speaker-tech", name: "Speaker Technician", description: "Home speakers, soundbar, amplifier repair." },
      { id: "cctv-tech", name: "CCTV Technician", description: "Installation, repair, network setup." },
      { id: "biometrics-tech", name: "Biometrics Technician", description: "Attendance machine setup & repair." },
      { id: "gaming-tech", name: "Gaming Console Technician", description: "PS/Xbox repair, HDMI/SSD fix." },
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing & Water System Technicians",
    icon: "🚰",
    keywords: ["plumbing", "plumber", "water", "motor", "borewell", "tank", "pipeline", "bathroom", "softener", "drainage", "kitchen sink", "shower", "tap", "leakage"],
    technicians: [
      { id: "plumber-tech", name: "Plumber Technician", description: "Leakage, fitting, tap, pipeline repair." },
      { id: "water-motor-tech", name: "Water Motor Technician", description: "Water pump repair & installation." },
      { id: "borewell-tech", name: "Borewell Technician", description: "Borewell repair, motor fitting." },
      { id: "water-tank-tech", name: "Water Tank Cleaning", description: "Manual/chemical cleaning." },
      { id: "pipeline-tech", name: "Pipeline Leakage Technician", description: "Leakage detection & repair." },
      { id: "bathroom-tech", name: "Bathroom Fitting Technician", description: "Shower, taps, basin, fittings." },
      { id: "water-softener-tech", name: "Water Softener Technician", description: "Water softener installation & servicing." },
      { id: "drainage-tech", name: "Drainage Technician", description: "Blockage clearing." },
      { id: "kitchen-sink-tech", name: "Kitchen Sink Technician", description: "Sink fitting, pipe replacement." },
      { id: "shower-tap-tech", name: "Shower/Tap Technician", description: "Shower repair, tap installation." },
    ]
  },
  {
    id: "furniture",
    name: "Furniture & Woodwork Technicians",
    icon: "🪵",
    keywords: ["carpenter", "furniture", "modular kitchen", "sofa", "door", "polishing", "cupboard", "bed", "flooring", "partition", "window", "wood", "almirah"],
    technicians: [
      { id: "carpenter-tech", name: "Carpenter Technician", description: "All types of wood works." },
      { id: "modular-kitchen-tech", name: "Modular Kitchen Technician", description: "Cabinet fitting, repair, design." },
      { id: "sofa-tech", name: "Sofa Repair Technician", description: "Fabric change, cushion repair." },
      { id: "door-tech", name: "Door Installation Technician", description: "Door fitting & lock installation." },
      { id: "furniture-polish-tech", name: "Furniture Polishing Technician", description: "Melamine, PU, varnish polishing." },
      { id: "cupboard-tech", name: "Cupboard Technician", description: "Wardrobe repair & hinge fix." },
      { id: "bed-tech", name: "Bed Repair Technician", description: "Bed frame & hinge repair." },
      { id: "flooring-tech", name: "Wooden Flooring Technician", description: "Installation & polishing." },
      { id: "partition-tech", name: "Partition Woodwork", description: "Office/home partitions." },
      { id: "window-tech", name: "Window Frame Technician", description: "Wooden window repair." },
    ]
  }
];

const TECHNICIAN_DATA = [
  // Home Appliance Technicians
  { 
    id: 1, 
    name: "AC Technician", 
    category: "home-appliance", 
    description: "AC servicing, gas filling, repair, installation.", 
    rating: 4.7, 
    experience: "5 years", 
    location: "Mumbai", 
    availability: "Today",
    address: "123, Cooling Solutions, Andheri West, Mumbai - 400053",
    phone: "+91 98765 43210",
    email: "acspecialist@example.com",
    priceRange: "₹299 – ₹3,500",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Rahul Sharma", rating: 5, comment: "Excellent service, fixed my AC quickly!" },
      { name: "Priya Patel", rating: 4, comment: "Professional and punctual technician." }
    ]
  },
  { 
    id: 2, 
    name: "Refrigerator Technician", 
    category: "home-appliance", 
    description: "Cooling issues, gas charging, compressor repair.", 
    rating: 4.5, 
    experience: "4 years", 
    location: "Delhi", 
    availability: "Within 48 hours",
    address: "456, Fridge Care, Connaught Place, Delhi - 110001",
    phone: "+91 87654 32109",
    email: "fridgeexpert@example.com",
    priceRange: "₹300 – ₹4,000",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Amit Kumar", rating: 5, comment: "Saved my refrigerator from breaking down completely." },
      { name: "Sneha Reddy", rating: 4, comment: "Good service, reasonable pricing." }
    ]
  },
  { 
    id: 3, 
    name: "Washing Machine Technician", 
    category: "home-appliance", 
    description: "Front/Top load repair, drum issues, motor service.", 
    rating: 4.6, 
    experience: "6 years", 
    location: "Bangalore", 
    availability: "Today",
    address: "789, Laundry Experts, Koramangala, Bangalore - 560034",
    phone: "+91 76543 21098",
    email: "washingmachinepro@example.com",
    priceRange: "₹299 – ₹3,000",
    image: "https://images.unsplash.com/photo-1588943218336-eb3c06189098?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Vikram Singh", rating: 5, comment: "Fixed my washing machine in just one visit." },
      { name: "Ananya Joshi", rating: 4, comment: "Knowledgeable technician, explained the issue well." }
    ]
  },
  
  // Electrical Technicians
  { 
    id: 11, 
    name: "Electrician (General)", 
    category: "electrical", 
    description: "Switchboard, wiring, fan, light installation.", 
    rating: 4.5, 
    experience: "5 years", 
    location: "Mumbai", 
    availability: "Today",
    address: "101, Power Solutions, Bandra West, Mumbai - 400050",
    phone: "+91 65432 10987",
    email: "electricianpro@example.com",
    priceRange: "₹149 – ₹1,500",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Rajesh Mehta", rating: 5, comment: "Quick and efficient electrical work." },
      { name: "Kavita Nair", rating: 4, comment: "Fixed all my electrical issues professionally." }
    ]
  },
  { 
    id: 12, 
    name: "Wiring & Rewiring Technician", 
    category: "electrical", 
    description: "House wiring, short circuit fix, load balancing.", 
    rating: 4.7, 
    experience: "8 years", 
    location: "Delhi", 
    availability: "Within 48 hours",
    address: "202, Wire Masters, Saket, Delhi - 110017",
    phone: "+91 54321 09876",
    email: "wiringexpert@example.com",
    priceRange: "₹499 – ₹10,000",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Sanjay Gupta", rating: 5, comment: "Completely rewired my old house safely." },
      { name: "Deepa Iyer", rating: 5, comment: "Professional service, would highly recommend." }
    ]
  },
  
  // Electronics Repair Technicians
  { 
    id: 21, 
    name: "TV Repair Technician", 
    category: "electronics", 
    description: "Display, sound, motherboard repair.", 
    rating: 4.6, 
    experience: "7 years", 
    location: "Mumbai", 
    availability: "Within 48 hours",
    address: "303, TV Care Center, Andheri East, Mumbai - 400069",
    phone: "+91 43210 98765",
    email: "tvrepairpro@example.com",
    priceRange: "₹299 – ₹5,000",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Arjun Desai", rating: 5, comment: "Fixed my TV that others couldn't repair." },
      { name: "Neha Verma", rating: 4, comment: "Good service, fair pricing." }
    ]
  },
  { 
    id: 22, 
    name: "Laptop Technician", 
    category: "electronics", 
    description: "OS, keyboard, screen, motherboard fix.", 
    rating: 4.8, 
    experience: "8 years", 
    location: "Delhi", 
    availability: "Today",
    address: "404, Laptop Hospital, Nehru Place, Delhi - 110019",
    phone: "+91 32109 87654",
    email: "laptopdoctor@example.com",
    priceRange: "₹300 – ₹6,000",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Rohit Kapoor", rating: 5, comment: "Recovered all my data and fixed my laptop." },
      { name: "Pooja Mishra", rating: 5, comment: "Very knowledgeable and honest technician." }
    ]
  },
  
  // Plumbing & Water System Technicians
  { 
    id: 31, 
    name: "Plumber Technician", 
    category: "plumbing", 
    description: "Leakage, fitting, tap, pipeline repair.", 
    rating: 4.6, 
    experience: "6 years", 
    location: "Mumbai", 
    availability: "Today",
    address: "505, Pipe Solutions, Powai, Mumbai - 400076",
    phone: "+91 21098 76543",
    email: "plumberexpert@example.com",
    priceRange: "₹149 – ₹1,500",
    image: "https://images.unsplash.com/photo-1616478305512-4414608369a5?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Manish Singh", rating: 5, comment: "Fixed the leak quickly and efficiently." },
      { name: "Sunita Rao", rating: 4, comment: "Good service, arrived on time." }
    ]
  },
  { 
    id: 32, 
    name: "Water Motor Technician", 
    category: "plumbing", 
    description: "Water pump repair & installation.", 
    rating: 4.5, 
    experience: "5 years", 
    location: "Delhi", 
    availability: "Within 48 hours",
    address: "606, Motor Care, Dwarka, Delhi - 110075",
    phone: "+91 10987 65432",
    email: "watermotorpro@example.com",
    priceRange: "₹199 – ₹2,500",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Vivek Choudhary", rating: 5, comment: "Fixed my water motor when no one else could." },
      { name: "Meena Shah", rating: 4, comment: "Professional and affordable service." }
    ]
  },
  
  // Furniture & Woodwork Technicians
  { 
    id: 41, 
    name: "Carpenter Technician", 
    category: "furniture", 
    description: "All types of wood works.", 
    rating: 4.7, 
    experience: "8 years", 
    location: "Mumbai", 
    availability: "Today",
    address: "707, Wood Crafters, Malad West, Mumbai - 400064",
    phone: "+91 99887 77665",
    email: "carpenterpro@example.com",
    priceRange: "₹199 – ₹3,000",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Kunal Patel", rating: 5, comment: "Excellent craftsmanship, very satisfied." },
      { name: "Divya Menon", rating: 5, comment: "Customized furniture exactly as I wanted." }
    ]
  },
  { 
    id: 42, 
    name: "Modular Kitchen Technician", 
    category: "furniture", 
    description: "Cabinet fitting, repair, design.", 
    rating: 4.9, 
    experience: "10 years", 
    location: "Delhi", 
    availability: "Within 48 hours",
    address: "808, Kitchen Designs, Vasant Kunj, Delhi - 110070",
    phone: "+91 88776 66554",
    email: "kitchenexpert@example.com",
    priceRange: "₹2,000 – ₹25,000",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { name: "Sameer Jain", rating: 5, comment: "Transformed my old kitchen completely." },
      { name: "Anita Deshmukh", rating: 5, comment: "Innovative designs and quality work." }
    ]
  },
];

const AD_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a4b2c?auto=format&fit=crop&w=800&q=80",
    title: "Premium Home Services",
    description: "Get 20% off on your first service",
    link: "#premium-services"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    title: "Emergency Repair",
    description: "24/7 service available now",
    link: "#emergency-repair"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    title: "Annual Maintenance",
    description: "Protect your appliances all year",
    link: "#maintenance"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80",
    title: "Smart Home Solutions",
    description: "Upgrade to smart appliances",
    link: "#smart-home"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    title: "Energy Efficient",
    description: "Save on electricity bills",
    link: "#energy-efficient"
  }
];

function simpleLocalAI(answers: Answers) {
  const { issue, urgency, budget, technicianType, technicianSubtype } = answers;

  const result = {
    name: "Expert Technician",
    eta: "Within 24 hrs",
    priceEstimate: "₹400 - ₹1200",
    rating: 4.7,
    reason: "Best match based on your issue",
  };

  if (!issue && !technicianType) return result;

  if (technicianSubtype) {
    const tech = TECHNICIAN_DATA.find(t => t.name.toLowerCase().includes(technicianSubtype.toLowerCase()));
    if (tech) {
      result.name = tech.name;
      result.priceEstimate = tech.priceRange;
      result.eta = tech.availability;
      result.rating = tech.rating;
      result.reason = "Selected by you";
    }
    return result;
  }

  if (technicianType) {
    const category = TECHNICIAN_CATEGORIES.find(c => c.id === technicianType);
    if (category) {
      const tech = category.technicians[0];
      result.name = tech.name;
      result.reason = `Best ${category.name.split(' ')[0]} technician`;
    }
  }

  if (issue?.toLowerCase().includes("ac")) {
    result.name = "AC Cooling Specialist";
    result.priceEstimate = budget === "Above ₹2000" ? "₹2000 - ₹3500" : "₹499 - ₹1499";
    result.eta = urgency === "Today" ? "Within 4 hrs" : "Same day";
  }

  if (issue?.toLowerCase().includes("water")) {
    result.name = "Plumber (Leak Expert)";
    result.priceEstimate = "₹200 - ₹900";
    result.eta = urgency === "Today" ? "Within 2 hrs" : "Same day";
  }

  if (issue?.toLowerCase().includes("elect")) {
    result.name = "Certified Electrician";
    result.priceEstimate = "₹150 - ₹700";
    result.eta = urgency === "This week" ? "Within 48 hrs" : "Today";
  }

  return result;
}

export default function SmartServiceFinder() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceResult, setVoiceResult] = useState<string>("");
  const [voiceAnalysis, setVoiceAnalysis] = useState<{
    category?: string;
    location?: string;
    time?: string;
    urgency?: string;
  }>({});
  const recognitionRef = useRef<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    minRating: 0,
    maxPrice: "",
    availability: ""
  });
  const [filteredTechnicians, setFilteredTechnicians] = useState(TECHNICIAN_DATA);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adPaused, setAdPaused] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "en-IN";
      recog.interimResults = true;
      recog.maxAlternatives = 1;
      recog.continuous = false;

      recog.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setVoiceResult(finalTranscript);
          analyzeVoiceCommand(finalTranscript);
          setMessages((prev) => [...prev, { from: "user", text: finalTranscript }]);
          setVoiceActive(false);
        } else {
          setVoiceResult(interimTranscript);
        }
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setVoiceActive(false);
      };

      recog.onend = () => {
        if (!voiceResult) {
          setVoiceActive(false);
        }
      };

      recognitionRef.current = recog;
    }
  }, []);

  useEffect(() => {
    // Apply filters when they change
    let result = TECHNICIAN_DATA;
    
    if (filters.location) {
      result = result.filter(tech => 
        tech.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minRating > 0) {
      result = result.filter(tech => tech.rating >= filters.minRating);
    }
    
    if (filters.availability) {
      result = result.filter(tech => 
        tech.availability.toLowerCase().includes(filters.availability.toLowerCase())
      );
    }
    
    setFilteredTechnicians(result);
  }, [filters]);

  useEffect(() => {
    // Auto-rotate ads every 5 seconds, but pause when hovered
    if (!adPaused) {
      const adInterval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % AD_IMAGES.length);
      }, 5000);
      
      return () => clearInterval(adInterval);
    }
  }, [adPaused]);

  const analyzeVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    const analysis: any = {};

    // Detect service category
    for (const category of TECHNICIAN_CATEGORIES) {
      for (const keyword of category.keywords) {
        if (lowerCommand.includes(keyword)) {
          analysis.category = category.id;
          break;
        }
      }
      if (analysis.category) break;
    }

    // Detect location type
    if (lowerCommand.includes("home") || lowerCommand.includes("house")) {
      analysis.location = "Home";
    } else if (lowerCommand.includes("shop") || lowerCommand.includes("store")) {
      analysis.location = "Shop";
    } else if (lowerCommand.includes("office")) {
      analysis.location = "Office";
    } else if (lowerCommand.includes("apartment") || lowerCommand.includes("flat")) {
      analysis.location = "Apartment";
    }

    // Detect time preference
    if (lowerCommand.includes("morning")) {
      analysis.time = "Morning (9AM-12PM)";
    } else if (lowerCommand.includes("afternoon")) {
      analysis.time = "Afternoon (12PM-4PM)";
    } else if (lowerCommand.includes("evening")) {
      analysis.time = "Evening (4PM-8PM)";
    }

    // Detect urgency
    if (lowerCommand.includes("today") || lowerCommand.includes("now") || lowerCommand.includes("urgent")) {
      analysis.urgency = "Today";
    } else if (lowerCommand.includes("tomorrow") || lowerCommand.includes("48 hours")) {
      analysis.urgency = "Within 48 hours";
    } else if (lowerCommand.includes("week")) {
      analysis.urgency = "This week";
    }

    setVoiceAnalysis(analysis);

    // Auto-fill the detected values
    const newAnswers: any = {};
    if (analysis.category) {
      newAnswers.technicianType = analysis.category;
      setSelectedCategory(analysis.category);
    }
    if (analysis.location) {
      newAnswers.locationType = analysis.location;
    }
    if (analysis.time) {
      newAnswers.preferredTime = analysis.time;
    }
    if (analysis.urgency) {
      newAnswers.urgency = analysis.urgency;
    }
    if (command) {
      newAnswers.issue = command;
    }

    setAnswers((prev) => ({ ...prev, ...newAnswers }));

    // Auto-navigate based on what was detected
    if (analysis.category) {
      setTimeout(() => setStep(2), 1000);
    }
  };

  const startVoice = () => {
    if (recognitionRef.current) {
      setVoiceActive(true);
      setVoiceResult("");
      setVoiceAnalysis({});
      recognitionRef.current.start();
    } else {
      alert("Voice input is not supported in this browser.");
    }
  };

  const handleSelect = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setAnswers((prev) => ({ ...prev, technicianType: categoryId }));
    setTimeout(() => setStep(2), 200);
  };

  const handleTechnicianSelect = (technicianId: string) => {
    setAnswers((prev) => ({ ...prev, technicianSubtype: technicianId }));
    setTimeout(() => setStep(3), 200);
  };

  const runAIMatch = async () => {
    setLoadingAI(true);
    setSuggestions([]);
    setSelectedSuggestion(null);

    try {
      // Get multiple suggestions based on the selected category
      const category = answers.technicianType || (answers.issue?.toLowerCase().includes("ac") ? "home-appliance" : 
                   answers.issue?.toLowerCase().includes("water") ? "plumbing" : 
                   answers.issue?.toLowerCase().includes("elect") ? "electrical" : "home-appliance");
      
      const categoryTechnicians = TECHNICIAN_DATA.filter(tech => tech.category === category);
      
      // Sort by rating and take top 3
      const sortedTechnicians = [...categoryTechnicians].sort((a, b) => b.rating - a.rating).slice(0, 3);
      
      setSuggestions(sortedTechnicians);
      
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `AI found ${sortedTechnicians.length} top technicians for your needs.`,
        },
      ]);
    } catch (error) {}

    setLoadingAI(false);
  };

  const handleBook = (technician: any) => {
    alert(`Booking Started for: ${technician.name}\nContact: ${technician.phone}\nAddress: ${technician.address}`);
  };

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleAdClick = (link: string) => {
    alert(`Redirecting to: ${link}`);
    // In a real app, you would use router.push(link) or window.location.href = link
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Smart Service Finder</h1>
          <p className="text-gray-600 mt-2">AI-powered technician matching with voice recognition</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm hover:bg-gray-50 transition-colors"
          >
            <MessageSquare size={18} /> Chat
          </button>

          <button
            onClick={startVoice}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
              voiceActive ? "bg-red-500 text-white animate-pulse" : "bg-white hover:bg-gray-50"
            }`}
          >
            <Mic size={16} />
            {voiceActive ? "Listening…" : "Voice Search"}
          </button>
        </div>
      </div>

      {/* Voice Command Display */}
      {voiceResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white rounded-xl p-4 border border-indigo-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <Mic size={16} className="text-indigo-600" />
            <span className="font-medium text-gray-800">Voice Command Detected:</span>
          </div>
          <p className="text-gray-700 mb-3">"{voiceResult}"</p>
          
          {Object.keys(voiceAnalysis).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {voiceAnalysis.category && (
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <span className="text-xs text-indigo-600">Category</span>
                  <p className="font-medium text-sm">
                    {TECHNICIAN_CATEGORIES.find(c => c.id === voiceAnalysis.category)?.name}
                  </p>
                </div>
              )}
              {voiceAnalysis.location && (
                <div className="bg-green-50 p-2 rounded-lg">
                  <span className="text-xs text-green-600">Location</span>
                  <p className="font-medium text-sm">{voiceAnalysis.location}</p>
                </div>
              )}
              {voiceAnalysis.time && (
                <div className="bg-blue-50 p-2 rounded-lg">
                  <span className="text-xs text-blue-600">Time</span>
                  <p className="font-medium text-sm">{voiceAnalysis.time}</p>
                </div>
              )}
              {voiceAnalysis.urgency && (
                <div className="bg-orange-50 p-2 rounded-lg">
                  <span className="text-xs text-orange-600">Urgency</span>
                  <p className="font-medium text-sm">{voiceAnalysis.urgency}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <motion.div
          className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-600"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-2">Step {step} of 4</div>
          </div>

          {/* Step 1 - Category Selection */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Select Service Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TECHNICIAN_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-5 rounded-xl border transition-all text-left group ${
                      selectedCategory === category.id
                        ? "border-indigo-300 bg-indigo-50 shadow-md"
                        : "bg-white hover:bg-indigo-50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <div className="font-semibold text-lg group-hover:text-indigo-700">{category.name}</div>
                        <div className="text-sm text-gray-600">{category.technicians.length} technicians available</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 - Technician Selection */}
          {step === 2 && selectedCategory && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Select {TECHNICIAN_CATEGORIES.find(c => c.id === selectedCategory)?.name.split(' ')[0]} Technician
              </h3>
              
              <div className="mb-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <Filter size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
              
              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full p-2 border rounded-lg"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={filters.minRating}
                      onChange={(e) => handleFilterChange("minRating", Number(e.target.value))}
                    >
                      <option value={0}>Any</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={filters.availability}
                      onChange={(e) => handleFilterChange("availability", e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="Today">Today</option>
                      <option value="Within 48 hours">Within 48 hours</option>
                      <option value="This week">This week</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ location: "", minRating: 0, maxPrice: "", availability: "" })}
                      className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredTechnicians
                  .filter(tech => tech.category === selectedCategory)
                  .map((technician) => (
                  <button
                    key={technician.id}
                    onClick={() => handleTechnicianSelect(technician.name)}
                    className="p-4 rounded-xl border bg-white hover:bg-indigo-50 transition-colors text-left group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg group-hover:text-indigo-700">{technician.name}</div>
                        <p className="text-sm text-gray-600 mt-1">{technician.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span>{technician.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{technician.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{technician.availability}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg text-sm font-medium">
                        {technician.priceRange}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button className="text-sm underline mt-4 text-gray-600" onClick={() => setStep(1)}>
                ← Back to Categories
              </button>
            </motion.div>
          )}

          {/* Step 3 - Additional Details */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Additional Details</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Where do you need service?</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SERVICE_OPTIONS.locationTypes.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect("locationType", item)}
                      className={`p-3 rounded-xl border transition-colors ${
                        answers.locationType === item 
                          ? "bg-indigo-100 border-indigo-300 text-indigo-700" 
                          : "bg-white hover:bg-indigo-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Select your budget</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SERVICE_OPTIONS.budgets.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect("budget", item)}
                      className={`p-3 rounded-xl border transition-colors ${
                        answers.budget === item 
                          ? "bg-indigo-100 border-indigo-300 text-indigo-700" 
                          : "bg-white hover:bg-indigo-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Urgency</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SERVICE_OPTIONS.urgency.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect("urgency", item)}
                      className={`p-3 rounded-xl border transition-colors ${
                        answers.urgency === item 
                          ? "bg-indigo-100 border-indigo-300 text-indigo-700" 
                          : "bg-white hover:bg-indigo-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Preferred Time</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SERVICE_OPTIONS.preferredTimes.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect("preferredTime", item)}
                      className={`p-3 rounded-xl border transition-colors ${
                        answers.preferredTime === item 
                          ? "bg-indigo-100 border-indigo-300 text-indigo-700" 
                          : "bg-white hover:bg-indigo-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Contact Number</h4>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    placeholder="Enter your contact number"
                    className="flex-1 p-3 border rounded-xl"
                    value={answers.contactNumber || ""}
                    onChange={(e) => handleSelect("contactNumber", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Additional Information</h4>
                <textarea
                  placeholder="Describe your issue in detail..."
                  className="w-full p-3 border rounded-xl h-24"
                  value={answers.additionalDetails || ""}
                  onChange={(e) => handleSelect("additionalDetails", e.target.value)}
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Continue to AI Match
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border bg-white hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 - AI Recommendation */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-4 mb-8">
                <Lottie
                  animationData={serviceRobotJson}
                  loop
                  autoplay
                  style={{ width: 100, height: 100 }}
                />

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">AI Recommendations</h3>
                  <p className="text-gray-600">
                    Our AI has found the best technicians for your needs
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={runAIMatch}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  {loadingAI ? "Matching…" : "Get AI Suggestions"}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl border bg-white hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800">Top Recommendations</h4>
                  
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-r ${
                        selectedSuggestion?.id === suggestion.id 
                          ? "from-indigo-50 to-purple-50 border-indigo-200" 
                          : "from-gray-50 to-white border-gray-200"
                      } border rounded-2xl p-6 shadow-sm cursor-pointer transition-all hover:shadow-md`}
                      onClick={() => setSelectedSuggestion(suggestion)}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <img 
                            src={suggestion.image} 
                            alt={suggestion.name}
                            className="w-full h-40 object-cover rounded-xl"
                          />
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-gray-800">{suggestion.name}</h4>
                            <div className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg">
                              <Star size={16} className="fill-current" />
                              <span>{suggestion.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{suggestion.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <MapPin size={14} />
                                <span>Address</span>
                              </div>
                              <div className="font-medium text-sm">{suggestion.address}</div>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Clock size={14} />
                                <span>Availability</span>
                              </div>
                              <div className="font-medium text-sm">{suggestion.availability}</div>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Phone size={14} />
                                <span>Contact</span>
                              </div>
                              <div className="font-medium text-sm">{suggestion.phone}</div>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <DollarSign size={14} />
                                <span>Price Range</span>
                              </div>
                              <div className="font-medium text-sm">{suggestion.priceRange}</div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-700 mb-2">Customer Reviews</h5>
                            <div className="space-y-2">
                              {suggestion.reviews.map((review: any, idx: number) => (
                                <div key={idx} className="bg-white p-3 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          size={12} 
                                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm font-medium">{review.name}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{review.comment}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBook(suggestion);
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition-opacity"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Lottie
            animationData={aiPulseJson}
            loop
            autoplay
            style={{ width: "100%", height: 240 }}
          />

          <div className="mt-6">
            <div className="font-semibold text-lg text-gray-800">Smart AI Matching</div>
            <p className="text-gray-600 mt-2">
              Our AI matches your issue with the best technician based on skills, location, and availability.
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-medium text-gray-800 mb-4">Special Offers</h4>
            <div 
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setAdPaused(true)}
              onMouseLeave={() => setAdPaused(false)}
              onClick={() => handleAdClick(AD_IMAGES[currentAdIndex].link)}
            >
              <img 
                src={AD_IMAGES[currentAdIndex].src} 
                alt={AD_IMAGES[currentAdIndex].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">{AD_IMAGES[currentAdIndex].title}</h3>
                <p className="text-white/90 text-sm mb-3">{AD_IMAGES[currentAdIndex].description}</p>
                <div className="flex items-center text-white text-sm font-medium">
                  <span>Click to learn more</span>
                  <ExternalLink size={14} className="ml-1" />
                </div>
              </div>
              
              {/* Ad Indicators */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {AD_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentAdIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAdIndex ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to ad ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">How it works</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal pl-5">
              <li>Select service category</li>
              <li>Choose specific technician</li>
              <li>Provide additional details</li>
              <li>Get AI recommendation</li>
              <li>Book your service</li>
            </ol>
          </div>
        </motion.div>
      </div>

      {/* CHAT WIDGET */}
      {chatOpen && (
        <div className="fixed right-6 bottom-6 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-50">
          <div className="p-4 border-b flex items-center justify-between bg-indigo-600 text-white">
            <h4 className="font-semibold">Smart Assistant</h4>
            <button onClick={() => setChatOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="p-4 h-64 overflow-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "user" ? "text-right mb-3" : "text-left mb-3"}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                    msg.from === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Try saying: "I need an AC technician at home today"</p>
                <p className="text-sm mt-2">or "Find a plumber for my office"</p>
              </div>
            )}
          </div>

          <ChatInput
            onSend={(txt) => {
              setMessages((m) => [...m, { from: "user", text: txt }]);
              setTimeout(() => {
                setMessages((m) => [
                  ...m,
                  {
                    from: "bot",
                    text: "Please use the voice search or service finder above to get the best technician match for your needs.",
                  },
                ]);
              }, 500);
            }}
          />
        </div>
      )}
    </section>
  );
}

function ChatInput({ onSend }: { onSend: (txt: string) => void }) {
  const [text, setText] = useState("");

  return (
    <div className="p-3 border-t flex gap-2 bg-white">
      <input
        className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && text.trim()) {
            onSend(text.trim());
            setText("");
          }
        }}
      />
      <button
        onClick={() => {
          if (text.trim()) {
            onSend(text.trim());
            setText("");
          }
        }}
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        <Check size={16} />
      </button>
    </div>
  );
}