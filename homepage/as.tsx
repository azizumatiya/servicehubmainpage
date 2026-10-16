"use client";

import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon"; // keep your AppIcon component

type Category = {
  id: string;
  title: string;
  icon: string;
  technicians: { name: string; img?: string }[];
};

export default function ServiceBoxesWithImages() {
  const [openBox, setOpenBox] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "appliance",
      title: "Home Appliances Technicians",
      icon: "HomeModernIcon",
      technicians: [
        { name: "AC Technician", img: "/images/appliance/ac.jpg" },
        { name: "Fridge / Refrigerator Technician", img: "/images/appliance/fridge.jpg" },
        { name: "Washing Machine Repair", img: "/images/appliance/washing.jpg" },
        { name: "Microwave Repair", img: "/images/appliance/microwave.jpg" },
        { name: "Water Purifier (RO) Technician", img: "/images/appliance/ro.jpg" },
        { name: "Geyser Repair", img: "/images/appliance/geyser.jpg" },
        { name: "Chimney Repair", img: "/images/appliance/chimney.jpg" },
        { name: "Dishwasher Repair", img: "/images/appliance/dishwasher.jpg" },
      ],
    },
    {
      id: "electrical",
      title: "Electrical Technicians",
      icon: "BoltIcon",
      technicians: [
        { name: "Residential Electrician", img: "/images/electrical/residential.jpg" },
        { name: "Commercial Electrician", img: "/images/electrical/commercial.jpg" },
        { name: "Meter / Fuse Repair", img: "/images/electrical/meter.jpg" },
        { name: "Fan / Light / Switchboard Installation", img: "/images/electrical/fan.jpg" },
        { name: "Inverter Installation & Repair", img: "/images/electrical/inverter.jpg" },
      ],
    },
    {
      id: "it",
      title: "Electronics & IT Technicians",
      icon: "ComputerDesktopIcon",
      technicians: [
        { name: "Computer Repair (Laptop/Desktop)", img: "/images/it/computer.jpg" },
        { name: "CCTV Technician", img: "/images/it/cctv.jpg" },
        { name: "WiFi / Router Technician", img: "/images/it/wifi.jpg" },
        { name: "Printer Technician", img: "/images/it/printer.jpg" },
        { name: "Biometric Attendance Technician", img: "/images/it/biometric.jpg" },
      ],
    },
    {
      id: "mechanical",
      title: "Mechanical & Machine Technicians",
      icon: "WrenchScrewdriverIcon",
      technicians: [
        { name: "Motor Repair Technician", img: "/images/mechanical/motor.jpg" },
        { name: "Pump Technician", img: "/images/mechanical/pump.jpg" },
        { name: "Generator Technician", img: "/images/mechanical/generator.jpg" },
        { name: "Industrial Machine Technician", img: "/images/mechanical/industrial.jpg" },
      ],
    },
  ];

  const toggleBox = (id: string) => {
    setOpenBox(openBox === id ? null : id);
  };

  const fallbackImg = "/images/placeholder.png"; // fallback if an image is missing

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 py-8">
      {categories.map((cat) => {
        const isOpen = openBox === cat.id;
        const previewItems = cat.technicians.slice(0, 4);
        const remainingItems = cat.technicians.slice(4);

        return (
          <div key={cat.id} className="bg-white border rounded-xl shadow-sm p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Icon name={cat.icon} size={24} className="text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{cat.title}</h2>
                  <div className="text-sm text-gray-500">{cat.technicians.length} Technicians</div>
                </div>
              </div>

              <button
                onClick={() => toggleBox(cat.id)}
                className="text-teal-600 font-semibold"
                aria-expanded={isOpen}
              >
                {isOpen ? "Show Less" : `See All →`}
              </button>
            </div>

            {/* PREVIEW (4 items) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {previewItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={item.img ?? fallbackImg}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-teal-600" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FULL LIST (when expanded) */}
            {isOpen && remainingItems.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                {remainingItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      <img
                        src={item.img ?? fallbackImg}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircleIcon" size={16} className="text-teal-600" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TOTAL COUNT */}
            <div className="mt-4 text-gray-500 text-sm">Total: {cat.technicians.length} Technicians</div>
          </div>
        );
      })}
    </div>
  );
}
