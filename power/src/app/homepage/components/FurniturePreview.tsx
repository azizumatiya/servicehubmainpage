"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Hammer, DollarSign } from "lucide-react"; 

interface Service {
  name: string;
  description: string;
  priceRange: string;
  img: string; 
  slug: string;
}

const services: Service[] = [
  { name: "Carpenter Technician", description: "All types of wood works.", priceRange: "₹199 – ₹3,000", img: "/images/carpenter.jpg", slug: "carpenter-technician" },
  { name: "Modular Kitchen Technician", description: "Cabinet fitting, repair, design.", priceRange: "₹2,000 – ₹25,000", img: "/images/modular_kitchen.jpg", slug: "modular-kitchen-technician" },
  { name: "Sofa Repair Technician", description: "Fabric change, cushion repair.", priceRange: "₹500 – ₹6,000", img: "/images/sofa_repair.jpg", slug: "sofa-repair-technician" },
  { name: "Door Installation Technician", description: "Door fitting & lock installation.", priceRange: "₹300 – ₹2,500", img: "/images/door_install.jpg", slug: "door-installation-technician" },
  // ... બાકીની સર્વિસિસ કાઢી નાખવામાં આવી છે
];

export default function FurniturePreview() {
  const categoryName = "Top Furniture & Woodwork ";
  const categoryLink = "/technicians/furniture";

  return (
    <div className="bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER + SEE ALL */}
        <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <Hammer className="w-7 h-7 text-orange-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryName}
            </h2>
          </div>
          <Link
            href={categoryLink}
            className="flex items-center text-md font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 group"
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
                           transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:border-orange-400"
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

                <div className="p-4 bg-orange-50 border-t border-orange-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-orange-600 flex items-center">
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