"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react"; // વ્યવસાયિક આયકન ઉમેર્યા

interface Service {
  name: string;
  img: string;
  // હવે colorClass નો ઉપયોગ નથી, પરંતુ ડેટા સ્ટ્રક્ચર જાળવી શકાય છે
  colorClass: string; 
}

export default function HomeAppliancesPreview() {
  const services: Service[] = [
    { name: "AC Technician", img: "/images/ac.jpg", colorClass: "text-blue-600" },
    { name: "Fridge Repair", img: "/images/fridge.jpg", colorClass: "text-green-600" },
    { name: "Washing Machine Repair", img: "/images/washing.jpg", colorClass: "text-red-600" },
    { name: "Microwave Repair", img: "/images/micro.jpg", colorClass: "text-yellow-600" },
  ];

  return (
    // કન્ટેનરને વધુ સ્પષ્ટ દેખાવ આપવા માટે બેકગ્રાઉન્ડ ઉમેર્યો
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER + SEE ALL - Modern Typography and Alignment */}
        <div className="flex items-end justify-between mb-10 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <Wrench className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Top Home Appliance Services
            </h2>
          </div>

          <Link
            href="/technicians/home-appliances"
            // 'See All' ને બટન જેવો પ્રોફેશનલ દેખાવ આપ્યો
            className="flex items-center text-lg font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 group"
          >
            Explore All Technicians
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 CARDS GRID - Enhanced Design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <Link
              key={i}
              href={`/service/${s.name.toLowerCase().replace(/ /g, '-')}`} // ક્લિક કરવા પર સર્વિસ પેજ પર જવા માટે
              className="group block" // Link ને block લેવલ બનાવીને હોવર ઇફેક્ટ સમગ્ર કાર્ડ પર લાગુ કરી
            >
              <div
                className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl 
                           transition-all duration-300 overflow-hidden transform group-hover:scale-[1.03] 
                           group-hover:border-indigo-300"
              >
                {/* Image Container - Slightly taller for better view */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    // હોવર પર ઈમેજને ઝૂમ (Zoom) કરવા માટે
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Title Section */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 text-center"> 
                    {/* અહીંથી colorClass દૂર કર્યો છે */}
                    {s.name}
                  </h3>
                  {/* સુસંગતતા માટે એક નાનો સબટેક્સ્ટ ઉમેર્યો */}
                  <p className="text-sm text-gray-500 text-center mt-1">Book certified expert</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}