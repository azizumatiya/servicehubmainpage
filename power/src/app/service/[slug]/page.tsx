"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Wrench, Star, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// 1. Provider Interface
interface Provider {
  id: number;
  name: string;
  bio: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  image: string;
  specializations: string[];
  services: string[];
}

// 2. Static Data (you can replace with dynamic API later)
const providersData: { [key: string]: Provider[] } = {
  "ac-repair": [
    {
      id: 1,
      name: "Rajesh Kumar",
      bio: "Experienced AC technician with over 10 years of expertise in all brands and models.",
      experience: "10+ years",
      rating: 4.8,
      reviews: 124,
      location: "Ahmedabad, Gujarat",
      availability: "Mon-Sat, 9AM-7PM",
      image: "/images/provider1.jpg",
      specializations: ["Split AC", "Window AC", "Central AC", "AC Gas Filling"],
      services: ["Installation", "Repair", "Annual Maintenance", "Gas Refilling"]
    },
    {
      id: 2,
      name: "Amit Patel",
      bio: "Certified AC specialist providing fast and reliable service at affordable prices.",
      experience: "7 years",
      rating: 4.6,
      reviews: 89,
      location: "Gandhinagar, Gujarat",
      availability: "Mon-Sun, 8AM-8PM",
      image: "/images/provider2.jpg",
      specializations: ["Split AC", "Window AC", "AC Gas Filling"],
      services: ["Installation", "Repair", "Gas Refilling"]
    }
  ],
  "fridge-repair": [
    {
      id: 3,
      name: "Sanjay Sharma",
      bio: "Expert in all types of refrigerator repair with deep knowledge of cooling systems.",
      experience: "8 years",
      rating: 4.7,
      reviews: 102,
      location: "Surat, Gujarat",
      availability: "Mon-Sat, 10AM-6PM",
      image: "/images/provider3.jpg",
      specializations: ["Single Door", "Double Door", "Side by Side", "Commercial Fridges"],
      services: ["Cooling Issues", "Gas Charging", "Compressor Repair", "General Service"]
    }
  ],
  "washing-machine-repair": [
    {
      id: 4,
      name: "Vikram Singh",
      bio: "Specialized in washing machine repair for all major brands with quick turnaround time.",
      experience: "6 years",
      rating: 4.9,
      reviews: 156,
      location: "Vadodara, Gujarat",
      availability: "Mon-Sun, 9AM-7PM",
      image: "/images/provider4.jpg",
      specializations: ["Front Load", "Top Load", "Semi-Automatic", "Fully-Automatic"],
      services: ["Drum Repair", "Motor Replacement", "Installation", "General Service"]
    }
  ],
  "microwave-repair": [
    {
      id: 5,
      name: "Anil Kumar",
      bio: "Microwave oven specialist with expertise in all types of heating issues.",
      experience: "5 years",
      rating: 4.5,
      reviews: 78,
      location: "Rajkot, Gujarat",
      availability: "Mon-Sat, 10AM-7PM",
      image: "/images/provider5.jpg",
      specializations: ["Solo Microwave", "Grill Microwave", "Convection Microwave"],
      services: ["Heating Issues", "Magnetron Replacement", "Turntable Repair", "General Service"]
    }
  ],
  "geyser-repair": [
    {
      id: 6,
      name: "Rohit Verma",
      bio: "Geyser repair expert with knowledge of all brands and types of water heaters.",
      experience: "7 years",
      rating: 4.6,
      reviews: 92,
      location: "Jamnagar, Gujarat",
      availability: "Mon-Sun, 8AM-8PM",
      image: "/images/provider6.jpg",
      specializations: ["Instant Geyser", "Storage Geyser", "Gas Geyser"],
      services: ["Heating Element Replacement", "Thermostat Repair", "Installation", "General Service"]
    }
  ],
  "water-purifier-service": [
    {
      id: 7,
      name: "Manish Jain",
      bio: "Water purifier specialist with expertise in all types of purification systems.",
      experience: "6 years",
      rating: 4.7,
      reviews: 110,
      location: "Bhavnagar, Gujarat",
      availability: "Mon-Sat, 9AM-6PM",
      image: "/images/provider7.jpg",
      specializations: ["RO System", "UV Purifier", "Gravity Purifier"],
      services: ["Filter Replacement", "Membrane Cleaning", "Installation", "Annual Maintenance"]
    }
  ],
  "chimney-cleaning": [
    {
      id: 8,
      name: "Deepak Kumar",
      bio: "Kitchen chimney cleaning expert with thorough knowledge of all brands.",
      experience: "5 years",
      rating: 4.8,
      reviews: 95,
      location: "Anand, Gujarat",
      availability: "Mon-Sun, 10AM-7PM",
      image: "/images/provider8.jpg",
      specializations: ["Auto Clean Chimney", "Ductless Chimney", "Pipe Chimney"],
      services: ["Deep Cleaning", "Filter Replacement", "Installation", "Oil Collection Service"]
    }
  ],
  "dishwasher-repair": [
    {
      id: 9,
      name: "Nitin Sharma",
      bio: "Dishwasher repair specialist with expertise in all major brands and models.",
      experience: "4 years",
      rating: 4.5,
      reviews: 67,
      location: "Mehsana, Gujarat",
      availability: "Mon-Sat, 9AM-7PM",
      image: "/images/provider9.jpg",
      specializations: ["Built-in Dishwasher", "Countertop Dishwasher", "Portable Dishwasher"],
      services: ["Spray Arm Repair", "Pump Replacement", "Installation", "General Service"]
    }
  ]
};

// 3. Service names mapping
const serviceNames: { [key: string]: string } = {
  "ac-repair": "AC Repair",
  "fridge-repair": "Fridge Repair",
  "washing-machine-repair": "Washing Machine Repair",
  "microwave-repair": "Microwave Repair",
  "geyser-repair": "Geyser Repair",
  "water-purifier-service": "Water Purifier Service",
  "chimney-cleaning": "Chimney Cleaning",
  "dishwasher-repair": "Dishwasher Repair"
};

// 4. Provider Card Component
const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="md:flex">
      <div className="md:w-1/3">
        <img
          src={provider.image}
          alt={provider.name}
          className="h-48 w-full object-cover md:h-full"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
          <div className="flex items-center text-sm font-semibold text-amber-500">
            <Star className="w-4 h-4 fill-amber-500 mr-1" />
            {provider.rating.toFixed(1)} ({provider.reviews} reviews)
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{provider.bio}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
            {provider.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-indigo-600" />
            {provider.availability}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Wrench className="w-4 h-4 mr-2 text-indigo-600" />
            {provider.experience} experience
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {provider.specializations.map((spec, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {service}
              </span>
            ))}
          </div>
        </div>
        
        <Link
          href={`/booking/${provider.id}`}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Book Now <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  </div>
);

// 5. Main Page Component
export default function ServiceDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [serviceName, setServiceName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (slug && providersData[slug]) {
        setProviders(providersData[slug]);
        setServiceName(serviceNames[slug] || "Service");
      } else {
        setProviders([]);
        setServiceName("Service Not Found");
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading service providers...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-indigo-600 py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="flex items-center space-x-4">
            <Wrench className="w-10 h-10" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {serviceName} Providers
            </h1>
          </div>
          <p className="mt-3 text-xl opacity-90">
            Find trusted professionals for your {serviceName.toLowerCase()} needs.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {providers.length > 0 ? (
          <div className="space-y-8">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Providers Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find any providers for this service. Please check back later.</p>
            <Link
              href="/technicians/home-appliances"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}