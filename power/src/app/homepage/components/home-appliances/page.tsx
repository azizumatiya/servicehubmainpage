"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Wrench, Star, ArrowRight } from "lucide-react";

// ---------------------------
// DATA MODEL
// ---------------------------
interface Service {
  name: string;
  img: string;
  colorClass: string;
  slug: string;
  rating: number;
  category: string;
}

// ---------------------------
// STATIC DATA (Dynamic later possible)
// ---------------------------
const allServices: Service[] = [
  { name: "AC Technician", img: "/images/ac.jpg", colorClass: "text-blue-600", slug: "ac-repair", rating: 4.8, category: "cooling" },
  { name: "Fridge Repair", img: "/images/fridge.jpg", colorClass: "text-green-600", slug: "fridge-repair", rating: 4.7, category: "cooling" },
  { name: "Washing Machine Repair", img: "/images/washing.jpg", colorClass: "text-red-600", slug: "washing-machine-repair", rating: 4.9, category: "laundry" },
  { name: "Microwave Repair", img: "/images/micro.jpg", colorClass: "text-yellow-600", slug: "microwave-repair", rating: 4.5, category: "kitchen" },
  { name: "Geyser Repair", img: "/images/geyser.jpg", colorClass: "text-orange-600", slug: "geyser-repair", rating: 4.6, category: "heating" },
  { name: "Water Purifier Service", img: "/images/water_purifier.jpg", colorClass: "text-cyan-600", slug: "water-purifier-service", rating: 4.4, category: "kitchen" },
  { name: "Chimney Cleaning", img: "/images/chimney.jpg", colorClass: "text-purple-600", slug: "chimney-cleaning", rating: 4.7, category: "kitchen" },
  { name: "Dishwasher Repair", img: "/images/dishwasher.jpg", colorClass: "text-pink-600", slug: "dishwasher-repair", rating: 4.5, category: "kitchen" },
];

// ---------------------------
// FILTER OPTIONS
// ---------------------------
const categories = [
  { id: "all", name: "All" },
  { id: "cooling", name: "Cooling" },
  { id: "heating", name: "Heating" },
  { id: "kitchen", name: "Kitchen" },
  { id: "laundry", name: "Laundry" },
];

// ---------------------------
// SERVICE CARD
// ---------------------------
const ServiceCard = ({ name, img, slug, rating, colorClass }: Service) => (
  <Link href={`/service/${slug}`} className="group block rounded-xl bg-white shadow hover:shadow-xl border border-gray-100 transition-all">
    <div className="h-40 overflow-hidden rounded-t-xl">
      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
    </div>

    <div className="p-4 flex flex-col">
      <h3 className={`text-lg font-bold ${colorClass}`}>{name}</h3>
      <div className="flex items-center text-amber-500 mt-1">
        <Star className="w-4 h-4 fill-amber-500" /> 
        <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
      </div>

      <span className="mt-3 text-indigo-600 text-sm font-medium flex items-center group-hover:underline">
        View Details <ArrowRight className="w-4 h-4 ml-1" />
      </span>
    </div>
  </Link>
);

// ---------------------------
// MAIN PAGE
// ---------------------------
export default function HomeTechPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // ---------------------------
  // FILTER + SORT (Optimized with useMemo)
  // ---------------------------
  const filteredServices = useMemo(() => {
    let result = [...allServices];

    if (selectedCategory !== "all") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      
      {/* HEADER */}
      <div className="bg-indigo-600 py-14 mb-10 text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-3">
          <Wrench className="w-10 h-10" />
          <h1 className="text-4xl font-extrabold">Appliance Technicians</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">

        {/* -------- FILTER BUTTONS (NEW MODERN STYLE) -------- */}
        <div className="flex items-center justify-between mb-6">

          {/* CATEGORY FILTER SCROLLABLE TAGS */}
          <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all 
                  ${selectedCategory === cat.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300"}
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* SORT SELECT */}
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white text-gray-700 text-sm"
          >
            <option value="rating">Highest Rating</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* -------- SERVICE GRID -------- */}
        {filteredServices.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((srv, i) => (
              <ServiceCard key={i} {...srv} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">No services found</p>
        )}

      </div>
    </main>
  );
}
