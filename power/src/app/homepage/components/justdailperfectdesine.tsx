"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Mic, 
  ChevronRight, 
  Smartphone, 
  TrendingUp,
  Building2,
  Stethoscope,
  Wrench,
  Package
} from 'lucide-react';

export default function JustdialPlatform() {
  const [location, setLocation] = useState('Danta, Banaskantha');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* ================= HEADER / SEARCH SECTION ================= */}
      <header className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Top Title & Download App Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Search across <span className="text-blue-600">'4.9 Crore+'</span> Businesses
          </h1>
          
          <button className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-1.5 hover:bg-slate-50 transition shadow-sm group">
            <span className="text-sm font-semibold text-slate-700">Download App</span>
            <div className="h-8 w-5 border border-slate-400 rounded-sm flex flex-col justify-between items-center py-0.5 group-hover:border-blue-500 transition-colors">
               <div className="w-2 h-0.5 bg-slate-400 group-hover:bg-blue-500"></div>
               <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-blue-500"></div>
            </div>
            <span className="text-orange-500 font-bold text-lg">Jd</span>
          </button>
        </div>

        {/* Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-3 shadow-md border border-gray-200 p-2 rounded-lg bg-white">
          
          Location Input
          <div className="relative flex-shrink-0 md:w-1/4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full h-12 pl-10 pr-3 text-base text-gray-900 bg-gray-50 border-r border-gray-200 rounded-l-md focus:ring-0 focus:outline-none placeholder-gray-500"
              placeholder="Enter location"
            />
          </div>

          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full h-12 pl-4 pr-24 text-base text-gray-900 bg-white focus:ring-0 focus:outline-none placeholder-gray-400"
              placeholder="Search for Spa & Salons"
            />
            
            {/* Mic & Search Buttons inside input */}
            <div className="absolute inset-y-0 right-1 flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <Mic className="h-5 w-5" />
              </button>
              <button className="h-10 w-12 bg-orange-600 hover:bg-orange-700 rounded-md flex items-center justify-center text-white shadow-sm transition-all active:scale-95">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* ================= MAIN HERO GRID ================= */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT: PROMOTIONAL BANNER (Span 5 cols) --- */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-[#5D1688] text-white shadow-xl min-h-[340px] flex flex-col justify-center px-8 py-10 group">
            
            {/* Background Pattern/Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            
            <div className="relative z-10 max-w-xs">
              <h2 className="text-3xl font-extrabold leading-tight mb-2">
                Boost Your Visibility <br/> on <span className="text-yellow-400">Justdial!</span>
              </h2>
              <p className="text-purple-100 mb-8 text-sm md:text-base leading-relaxed">
                Complete your business profile to rank higher in search
              </p>
              
              <button className="bg-[#FFD700] hover:bg-[#F4C430] text-purple-900 font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl flex items-center gap-2">
                Update Your Info Now
              </button>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-8 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
            </div>

            {/* Image: Man + Phone Overlay (Simulated with CSS/Img) */}
            <div className="absolute bottom-0 right-0 w-1/2 h-[90%] pointer-events-none">
              {/* Man Image */}
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                alt="Happy Businessman"
                className="absolute bottom-0 right-0 h-full object-cover object-top mask-image-gradient" 
                style={{maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'}}
              />
              
              {/* Floating Phone Card UI */}
              <div className="absolute bottom-4 left-0 bg-white rounded-xl shadow-2xl p-3 w-40 text-slate-800 transform rotate-[-5deg] border border-gray-100 animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-bold text-green-600">
                    62%
                  </div>
                  <div className="text-[10px] leading-tight font-semibold text-gray-500">
                    Increase Business Profile Score
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[62%]"></div>
                </div>
              </div>
            </div>
          </div>


          {/* --- RIGHT: CATEGORY CARDS (Span 7 cols) --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Card 1: B2B */}
            <CategoryCard 
              color="bg-[#0076D7]" 
              title="B2B" 
              subtitle="Quick Quotes"
              image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=300"
              icon={<Package className="w-5 h-5" />}
            />

            {/* Card 2: Repairs */}
            <CategoryCard 
              color="bg-[#284893]" 
              title="REPAIRS & SERVICES" 
              subtitle="Get Nearest Vendor"
              image="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=300"
              icon={<Wrench className="w-5 h-5" />}
              isLongTitle
            />

            {/* Card 3: Real Estate */}
            <CategoryCard 
              color="bg-[#6863CE]" 
              title="REAL ESTATE" 
              subtitle="Finest Agents"
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300"
              icon={<Building2 className="w-5 h-5" />}
            />

            {/* Card 4: Doctors */}
            <CategoryCard 
              color="bg-[#008F53]" 
              title="DOCTORS" 
              subtitle="Book Now"
              image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
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
      `}</style>
    </div>
  );
}


// --- Sub-Component: Category Card ---
function CategoryCard({ 
  color, 
  title, 
  subtitle, 
  image, 
  icon,
  isLongTitle = false 
}: { 
  color: string, 
  title: string, 
  subtitle: string, 
  image: string,
  icon: React.ReactNode,
  isLongTitle?: boolean
}) {
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
         <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
         />
         {/* Gradient Overlay to blend image with card color */}
         <div className={`absolute inset-0 bg-gradient-to-t ${color.replace('bg-', 'from-')} to-transparent opacity-30`}></div>
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