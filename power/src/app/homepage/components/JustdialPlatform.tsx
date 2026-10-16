"use client";

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Mic, 
  ChevronRight, 
  ChevronLeft,
  Package,
  Wrench,
  Building2,
  Stethoscope,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

// =================== SUB-COMPONENT: Category Card with Auto-Image Change ===================
/**
 * Category Card Component that cycles through multiple images automatically.
 */
function CategoryCard({ 
  color, 
  title, 
  subtitle, 
  images, // Array of image URLs now
  icon,
  isLongTitle = false 
}: { 
  color: string, 
  title: string, 
  subtitle: string, 
  images: string[],
  icon: React.ReactNode,
  isLongTitle?: boolean
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-scroll logic for images
  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds (3000ms)
      return () => clearInterval(timer);
    }
  }, [images.length]);

  return (
    <div className={`${color} rounded-xl relative overflow-hidden shadow-lg group cursor-pointer h-[340px] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
      
      {/* Text Content */}
      <div className="p-5 z-20 text-white">
        <h3 className={`font-extrabold leading-tight mb-1 ${isLongTitle ? 'text-lg' : 'text-xl'}`}>
          {title}
        </h3>
        <p className="text-white/90 text-sm font-medium">
          {subtitle}
        </p>
      </div>

      {/* Image Container (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[65%] z-10">
          {images.map((image, index) => (
              <img 
                  key={index}
                  src={image} 
                  alt={`${title} visual ${index + 1}`} 
                  // Opacity transition for smooth fade effect
                  className={`absolute w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} transform group-hover:scale-110`}
              />
          ))}
          {/* Gradient Overlay to blend image with card color */}
          <div className={`absolute inset-0 bg-gradient-to-t ${color.replace('bg-', 'from-')} to-transparent opacity-50`}></div>
      </div>

      {/* Action Button (Arrow) */}
      <div className="absolute bottom-4 left-4 z-30">
        <div className="w-8 h-8 rounded-md bg-black/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors group-hover:bg-white group-hover:text-black">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
      
      {/* Decorative Icon (Top Right) */}
      <div className="absolute top-4 right-4 text-white/20 z-0">
          {React.cloneElement(icon as React.ReactElement, { size: 40 })}
      </div>

    </div>
  );
}


// =================== SUB-COMPONENT: Promotional Carousel (No changes made here) ===================
function PromotionalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bg: "bg-[#5D1688]",
      accent: "text-yellow-400",
      btnBg: "bg-[#FFD700] hover:bg-[#F4C430] text-purple-900",
      title: <>Boost Your Visibility <br/> on <span className="text-yellow-400">Justdial!</span></>,
      desc: "Complete your business profile to rank higher in search",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      visual: (
        <div className="absolute bottom-4 left-0 bg-white rounded-xl shadow-2xl p-3 w-40 text-slate-800 transform rotate-[-5deg] border border-gray-100 animate-float z-20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-bold text-green-600">62%</div>
            <div className="text-[10px] leading-tight font-semibold text-gray-500">Business Profile Score</div>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 w-[62%]"></div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      bg: "bg-slate-900",
      accent: "text-cyan-400",
      btnBg: "bg-cyan-500 hover:bg-cyan-400 text-slate-900",
      title: <>Get Your <span className="text-cyan-400">Verified</span> <br/> Badge Today</>,
      desc: "Build trust with millions of customers instantly.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      visual: (
        <div className="absolute bottom-8 left-4 bg-slate-800/90 backdrop-blur-md rounded-xl shadow-2xl p-4 w-44 text-white transform rotate-[3deg] border border-cyan-500/30 animate-float-reverse z-20">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-10 h-10 text-cyan-400" />
             <div>
               <div className="text-xs text-gray-400">Status</div>
               <div className="font-bold text-cyan-400">VERIFIED</div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      bg: "bg-gradient-to-br from-indigo-600 to-blue-700",
      accent: "text-white",
      btnBg: "bg-white hover:bg-gray-100 text-indigo-700",
      title: <>Track Your <span className="text-green-300">Growth</span> <br/> & Analytics</>,
      desc: "See who is viewing your profile in real-time.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
      visual: (
        <div className="absolute top-20 left-0 bg-white rounded-lg shadow-xl p-3 w-36 animate-float z-20">
             <div className="flex justify-between items-end h-12 gap-1">
               <div className="w-1/5 bg-indigo-200 rounded-t h-[40%]"></div>
               <div className="w-1/5 bg-indigo-300 rounded-t h-[60%]"></div>
               <div className="w-1/5 bg-indigo-400 rounded-t h-[30%]"></div>
               <div className="w-1/5 bg-indigo-500 rounded-t h-[80%]"></div>
               <div className="w-1/5 bg-green-400 rounded-t h-[100%]"></div>
             </div>
             <div className="text-[10px] text-center mt-2 font-bold text-gray-600 flex items-center justify-center gap-1">
               <TrendingUp className="w-3 h-3 text-green-500" /> +128% Leads
             </div>
        </div>
      )
    }
  ];

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-full">
      
      {/* Slides Container */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
           <div 
             key={slide.id}
             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bg}`}
           >
             {/* Content Layer */}
             <div className="relative z-20 h-full flex flex-col justify-center px-8 py-10 max-w-lg">
               <h2 className="text-3xl font-extrabold leading-tight mb-2 text-white">
                 {slide.title}
               </h2>
               <p className="text-white/80 mb-8 text-sm md:text-base leading-relaxed max-w-xs">
                 {slide.desc}
               </p>
               
               <button className={`${slide.btnBg} font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 w-fit`}>
                 Check Now <ChevronRight className="w-4 h-4" />
               </button>
             </div>

             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"></div>

             {/* Dynamic Visual Elements (Floater + Image) */}
             <div className="absolute bottom-0 right-0 w-1/2 h-[90%] pointer-events-none">
                <img 
                  src={slide.image} 
                  alt="Banner Visual"
                  className="absolute bottom-0 right-0 h-full object-cover object-top mask-image-gradient" 
                />
                {slide.visual}
             </div>
           </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-8 z-30 flex items-center gap-4">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
        
        {/* Arrows (Hidden on mobile, visible on hover) */}
        <div className="hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button onClick={prevSlide} className="p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm">
             <ChevronLeft className="w-4 h-4" />
           </button>
           <button onClick={nextSlide} className="p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm">
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

    </div>
  );
}


// =================== MAIN COMPONENT ===================
export default function JustdialPlatform() {
  const [location, setLocation] = useState('Danta, Banaskantha');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Image Data Arrays for Auto-Change ---
  const b2bImages = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=300", // Original
    "https://images.unsplash.com/photo-1534670051280-5a3d42cc8e90?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300",
  ];

  const repairImages = [
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=300", // Original
    "https://images.unsplash.com/photo-1503428593551-7c93674686b2?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1627914848386-8f85f34177c9?auto=format&fit=crop&q=80&w=300",
  ];

  const realEstateImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300", // Original
    "https://images.unsplash.com/photo-1501183638710-841cd1557b2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1560518883-ef488d682498?auto=format&fit=crop&q=80&w=300",
  ];

  const doctorsImages = [
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300", // Original
    "https://images.unsplash.com/photo-1582750433449-648fdce66c34?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash-com/photo-1537368910025-700350fe4602?auto=format&fit=crop&q=80&w=300",
  ];


  return (
    <div className="">
      
      {/* ================= HEADER / SEARCH SECTION ================= */}
      <header className="">
        
        {/* Top Title & Download App Button */}
        <div className="">
          
{/*           
          <button className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-1.5 hover:bg-slate-50 transition shadow-sm group">
            <span className="text-sm font-semibold text-slate-700">Download App</span>
            <div className="h-8 w-5 border border-slate-400 rounded-sm flex flex-col justify-between items-center py-0.5 group-hover:border-blue-500 transition-colors">
               <div className="w-2 h-0.5 bg-slate-400 group-hover:bg-blue-500"></div>
               <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-blue-500"></div>
            </div>
            <span className="text-orange-500 font-bold text-lg">Jd</span>
          </button> */}
        </div>

      </header>


      {/* ================= MAIN HERO GRID ================= */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT: NEW ADVANCED SLIDER BANNER (Span 5 cols) --- */}
          <div className="lg:col-span-5 h-[340px] rounded-2xl overflow-hidden shadow-xl relative group">
              <PromotionalCarousel />
          </div>


          {/* --- RIGHT: CATEGORY CARDS (Span 7 cols) --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Card 1: B2B */}
            <CategoryCard 
              color="bg-[#0076D7]" 
              title="B2B" 
              subtitle="Quick Quotes"
              images={b2bImages}
              icon={<Package className="w-5 h-5" />}
            />

            {/* Card 2: Repairs */}
            <CategoryCard 
              color="bg-[#284893]" 
              title="REPAIRS & SERVICES" 
              subtitle="Get Nearest Vendor"
              images={repairImages}
              icon={<Wrench className="w-5 h-5" />}
              isLongTitle
            />

            {/* Card 3: Real Estate */}
            <CategoryCard 
              color="bg-[#6863CE]" 
              title="REAL ESTATE" 
              subtitle="Finest Agents"
              images={realEstateImages}
              icon={<Building2 className="w-5 h-5" />}
            />

            {/* Card 4: Doctors */}
            <CategoryCard 
              color="bg-[#008F53]" 
              title="DOCTORS" 
              subtitle="Book Now"
              images={doctorsImages}
              icon={<Stethoscope className="w-5 h-5" />}
            />

          </div>
        </div>
      </main>

      {/* Decorative CSS for Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(10px) rotate(5deg); }
        }
        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to left, black 60%, transparent 100%);
        }
      `}</style>
    </div>
  );
}