"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, DollarSign } from "lucide-react"; 

interface Service {
  name: string;
  description: string;
  priceRange: string;
  img: string; 
  slug: string;
}

const services: Service[] = [
  { name: "TV Repair Technician", description: "Display, sound, motherboard repair.", priceRange: "₹299 – ₹5,000", img: "/images/tv_repair.jpg", slug: "tv-repair-technician" },
  { name: "Laptop Technician", description: "OS, keyboard, screen, motherboard fix.", priceRange: "₹300 – ₹6,000", img: "/images/laptop_repair.jpg", slug: "laptop-technician" },
  { name: "Desktop Technician", description: "CPU assembly, repair, cleaning.", priceRange: "₹250 – ₹3,000", img: "/images/desktop_repair.jpg", slug: "desktop-technician" },
  { name: "Printer Technician", description: "Inkjet/laser repair, cartridge cleaning.", priceRange: "₹200 – ₹2,500", img: "/images/printer_repair.jpg", slug: "printer-technician" },
  // ... બાકીની સર્વિસિસ કાઢી નાખવામાં આવી છે
];

export default function ElectronicsPreview() {
  const categoryName = "Top Electronics Repair";
  const categoryLink = "/technicians/electronics";

  return (
    <div className="bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER + SEE ALL */}
        <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <Cpu className="w-7 h-7 text-red-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryName}
            </h2>
          </div>
          <Link
            href={categoryLink}
            className="flex items-center text-md font-semibold text-red-600 hover:text-red-700 transition-colors duration-200 group"
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
                           transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:border-red-400"
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

                <div className="p-4 bg-red-50 border-t border-red-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-red-600 flex items-center">
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