"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench, DollarSign } from "lucide-react"; 

interface Service {
  name: string;
  description: string;
  priceRange: string;
  img: string; 
  slug: string;
}

const services: Service[] = [
  { name: "AC Technician", description: "AC servicing, gas filling, repair, installation.", priceRange: "₹299 – ₹3,500", img: "/images/ac.jpg", slug: "ac-technician" },
  { name: "Refrigerator Technician", description: "Cooling issues, gas charging, compressor repair.", priceRange: "₹300 – ₹4,000", img: "/images/fridge.jpg", slug: "refrigerator-technician" },
  { name: "Washing Machine Technician", description: "Front/Top load repair, drum issues, motor service.", priceRange: "₹299 – ₹3,000", img: "/images/washing.jpg", slug: "washing-machine-technician" },
  { name: "Microwave Oven Technician", description: "Heating issue, touchpad, magnetron repair.", priceRange: "₹249 – ₹2,500", img: "/images/micro.jpg", slug: "microwave-oven-technician" },
  // ... બાકીની સર્વિસિસ અહીંથી કાઢી નાખવામાં આવી છે
];

export default function HomeAppliancesPreview() {
  const categoryName = "Top Home Appliance Services ";
  const categoryLink = "/technicians/home-appliances";
  
  

  return (
    <div className=" bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER + SEE ALL */}
        <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <Wrench className="w-7 h-7 text-indigo-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryName}
            </h2>
          </div>
          <Link
            href={categoryLink}
            className="flex items-center text-md font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 group"
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
                           transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:border-indigo-400"
              >
                {/* Image Container */}
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content Section */}
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 leading-snug">
                    {s.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                </div>

                {/* Price Range Box */}
                <div className="p-4 bg-indigo-50 border-t border-indigo-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-indigo-600 flex items-center">
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