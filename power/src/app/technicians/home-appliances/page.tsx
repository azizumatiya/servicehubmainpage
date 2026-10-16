"use client";

import Link from "next/link";
import { Wrench, ArrowRight, Star, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";

// 1. Service Interface
interface Service {
  name: string;
  img: string;
  colorClass: string;
  slug: string;
  rating: number;
  category: string;
}

// 2. Static Data (you can replace with dynamic API later)
const allServices: Service[] = [
  { name: "AC Technician", img: "data:image/jpeg;base64,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", colorClass: "text-cyan-600", slug: "ac-repair", rating: 4.8, category: "cooling" },
  { name: "Fridge Repair", img: "/images/fridge.jpg", colorClass: "text-cyan-600", slug: "fridge-repair", rating: 4.7, category: "cooling" },
  { name: "Washing Machine Repair", img: "/images/washing.jpg", colorClass: "text-cyan-600", slug: "washing-machine-repair", rating: 4.9, category: "laundry" },
  { name: "Microwave Repair", img: "/images/micro.jpg", colorClass: "text-cyan-600", slug: "microwave-repair", rating: 4.5, category: "kitchen" },
  { name: "Geyser Repair", img: "/images/geyser.jpg", colorClass: "text-cyan-600", slug: "geyser-repair", rating: 4.6, category: "heating" },
  { name: "Water Purifier Service", img: "/images/water_purifier.jpg", colorClass: "text-cyan-600", slug: "water-purifier-service", rating: 4.4, category: "kitchen" },
  { name: "Chimney Cleaning", img: "/images/chimney.jpg", colorClass: "text-cyan-600", slug: "chimney-cleaning", rating: 4.7, category: "kitchen" },
  { name: "Dishwasher Repair", img: "/images/dishwasher.jpg", colorClass: "text-cyan-600", slug: "dishwasher-repair", rating: 4.5, category: "kitchen" },
];

// 3. Categories for filtering
const categories = [
  { id: "all", name: "All Services" },
  { id: "cooling", name: "Cooling Appliances" },
  { id: "heating", name: "Heating Appliances" },
  { id: "kitchen", name: "Kitchen Appliances" },
  { id: "laundry", name: "Laundry Appliances" },
];

// ⭐⭐ 4. Service Card (box animation removed, image zoom enabled)
const ServiceCard: React.FC<Service> = ({ name, img, colorClass, slug, rating }) => (
  <Link href={`/service/${slug}`} className="block h-full">
    <div
      className="bg-white border border-gray-100 rounded-xl shadow-md 
                 transition-all duration-300 overflow-hidden h-full flex flex-col hover:shadow-lg"
    >
      {/* Image zoom only */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`text-xl font-bold text-gray-800 ${colorClass} mb-1`}>
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-2 flex-grow">
          Find top-rated experts for {name.toLowerCase()} and service.
        </p>

        {/* Rating & View button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-center text-sm font-semibold text-amber-500">
            <Star className="w-4 h-4 fill-amber-500 mr-1" />
            {rating.toFixed(1)} Rating
          </div>
          <span className="text-indigo-600 text-sm font-medium flex items-center">
            View Details <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// ⭐⭐ 5. Main Page
export default function AllTechniciansPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [filteredServices, setFilteredServices] = useState<Service[]>(allServices);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtering Logic
  useEffect(() => {
    let result = [...allServices];

    if (selectedCategory !== "all") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredServices(result);
  }, [selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-indigo-600 py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="flex items-center space-x-4">
            <Wrench className="w-10 h-10" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Explore All Home Appliance Technicians
            </h1>
          </div>
          <p className="mt-3 text-xl opacity-90">
            Trusted professionals for every appliance repair and service need.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTER */}
        <div className={`${isFilterOpen ? "block absolute inset-0 bg-white z-10 p-6" : "hidden"} md:block md:w-64`}>
          
          <div className="bg-white rounded-xl shadow-md p-4 sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Filter className="w-5 h-5 mr-2" /> Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* CATEGORY FILTER */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsFilterOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                  selectedCategory === cat.id
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="flex-1">
          {/* MOBILE FILTER BUTTON */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center w-full py-3 bg-white rounded-lg shadow-md text-gray-700 font-medium"
            >
              <Filter className="w-5 h-5 mr-2" /> Filters
            </button>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Available Services ({filteredServices.length})
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
