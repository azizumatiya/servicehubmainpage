"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Droplet, DollarSign } from "lucide-react"; 

interface Service {
  name: string;
  description: string;
  priceRange: string;
  img: string; 
  slug: string;
}

const services: Service[] = [
  { name: "Plumber Technician", description: "Leakage, fitting, tap, pipeline repair.", priceRange: "₹149 – ₹1,500", img: "/images/plumber.jpg", slug: "plumber-technician" },
  { name: "Water Motor Technician", description: "Water pump repair & installation.", priceRange: "₹199 – ₹2,500", img: "/images/water_motor.jpg", slug: "water-motor-technician" },
  { name: "Borewell Technician", description: "Borewell repair, motor fitting.", priceRange: "₹700 – ₹5,000", img: "/images/borewell.jpg", slug: "borewell-technician" },
  { name: "Water Tank Cleaning", description: "Manual/chemical cleaning.", priceRange: "₹499 – ₹2,000", img: "/images/tank_cleaning.jpg", slug: "water-tank-cleaning" },
  // ... બાકીની સર્વિસિસ કાઢી નાખવામાં આવી છે
];

export default function PlumbingPreview() {
  const categoryName = "Top Plumbing & Water System ";
  const categoryLink = "/technicians/plumbing";

  return (
    <div className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER + SEE ALL */}
        <div className="flex items-end justify-between mb-8 border-b border-gray-300 pb-4">
          <div className="flex items-center space-x-3">
            <Droplet className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryName}
            </h2>
          </div>
          <Link
            href={categoryLink}
            className="flex items-center text-md font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
          >
            Explore All <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link
              key={i}
              href={`/service/${s.slug}`}
              className="group block"
            >
              <div
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl 
                           transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:border-blue-400"
              >
                <div className="w-full h-32 overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 leading-snug">
                    {s.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                </div>

                <div className="p-4 bg-blue-50 border-t border-blue-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-600 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1"/> {s.priceRange}
                    </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}