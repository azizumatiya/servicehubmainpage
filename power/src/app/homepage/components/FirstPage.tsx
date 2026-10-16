"use client";

import { Searchbar } from "@/components/common/Searchbar";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row gap-12 items-center">

        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Find Trusted Technicians Near You
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Connect with verified professionals for all your home service needs.
            Fast, reliable, and affordable solutions.
          </p>

          {/* Searchbar */}
          <div className="mt-6">
            <Searchbar />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md">
              Hire Technician
            </button>

            <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 shadow-md">
              Become Technician
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12"
            className="rounded-2xl shadow-xl"
            alt="Technician"
          />
        </div>
      </div>
    </section>
  );
}
