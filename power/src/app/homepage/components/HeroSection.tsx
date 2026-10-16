"use client";

import { MapPinIcon, MicrophoneIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HeroSection() {

  const [location, setLocation] = useState("");

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Searchbar Patti */}
        <div className="w-full flex justify-center">
          <div
            className="
            w-full 
            bg-white 
            shadow-lg 
            rounded-xl 
            flex 
            items-center 
            px-4 
            py-3 
            gap-4
            border 
            border-gray-100
          "
          >

            {/* LEFT LOCATION INPUT */}
            <div
              className="
                flex 
                items-center 
                gap-2 
                bg-gray-50 
                px-4 
                py-3 
                rounded-lg 
                flex-shrink-0
                border-r 
                border-gray-200
                w-64
              "
            >
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                  bg-transparent
                  outline-none 
                  text-gray-700 
                  w-full 
                  placeholder:text-gray-400
                "
              />
            </div>

            {/* SEARCH INPUT MAIN */}
            <input
              type="text"
              placeholder="Search for Spa & Salons, AC Repair, Doctors..."
              className="
                w-full 
                outline-none 
                text-gray-600 
                text-base
                placeholder:text-gray-400
              "
            />

            {/* MIC ICON */}
            <MicrophoneIcon className="w-5 h-5 text-gray-400 cursor-pointer" />

            {/* SEARCH BUTTON */}
            <button
              className="
                bg-orange-500 
                hover:bg-orange-600 
                text-white 
                p-3 
                rounded-lg 
                flex 
                items-center 
                justify-center
              "
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
