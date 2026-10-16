"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, MapPinIcon, PhoneIcon, BriefcaseIcon, StarIcon, CalendarIcon, ClockIcon, UsersIcon, LinkIcon, PhotoIcon, DocumentTextIcon, CurrencyRupeeIcon, BuildingLibraryIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export default function ProviderAddCard() {
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const p =
          localStorage.getItem("providerUser") ||
          localStorage.getItem("currentUser");

        if (!p) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(p);
        const providerId = user._id || user.id;

        const res = await fetch(`/api/providers/${providerId}`);
        const data = await res.json();

        if (data.success) setProvider(data.provider);
        else setProvider(user);

      } catch (err) {
        console.error("Error loading provider data", err);
      } finally {
        setLoading(false);
      }
    };

    loadProvider();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!provider) return <NoProviderCard />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Facebook-style Header */}
      
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                Edit Cover
              </button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-end">
              {/* Profile Picture */}
              <div className="relative -mt-24 mb-4 md:mb-0 md:mr-6">
                <img
                  src={
                    provider.profileImage ||
                    `https://ui-avatars.com/api/?name=${provider.fullName}`
                  }
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{provider.fullName}</h1>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-600">{provider.services?.join(", ") || "Service Provider"}</span>
                      {provider.verified && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                      Edit Profile
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium">
                      Settings
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="h-5 w-5 mr-1" />
                    <span>{provider.experience || "0"} years experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-1" />
                    <span>{provider.address?.city || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PhoneIcon className="h-5 w-5 mr-1" />
                    <span>{provider.phone || "No phone number"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${provider.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className={provider.online ? 'text-green-600' : 'text-gray-600'}>
                      {provider.online ? 'Online now' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mt-6">
              <nav className="flex space-x-8">
                {['about', 'services', 'gallery', 'reviews', 'more'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">About</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">
                {provider.bio || "No bio available"}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <PhoneIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{provider.phone || "No phone number"}</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        {provider.address?.fullAddress || "Address not specified"}
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Service Radius: {provider.address?.radiusKm || 0} Km</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{provider.experience || "0"} years experience</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <StarIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        {provider.rating || "0"} rating ({provider.reviewCount || "0"} reviews)
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Joined {new Date().getFullYear()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Services</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Service
                </button>
              </div>
              
              {provider.services?.length ? (
                <div className="flex flex-wrap gap-2">
                  {provider.services.map((service: string, i: number) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No services added yet</p>
              )}
            </div>
            
            {/* Specializations Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Specializations</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Specialization
                </button>
              </div>
              
              {provider.specializations?.length ? (
                <div className="flex flex-wrap gap-2">
                  {provider.specializations.map((spec: string, i: number) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No specializations added yet</p>
              )}
            </div>
            
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Skills</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Skill
                </button>
              </div>
              
              {provider.skills?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.skills.map((skill: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            skill.level === 'beginner' ? 'bg-yellow-500 w-1/4' :
                            skill.level === 'intermediate' ? 'bg-blue-500 w-2/4' :
                            skill.level === 'advanced' ? 'bg-green-500 w-3/4' :
                            'bg-purple-500 w-full'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
            
            {/* Qualifications Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Qualifications</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Qualification
                </button>
              </div>
              
              {provider.qualifications?.length ? (
                <div className="space-y-3">
                  {provider.qualifications.map((qual: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{qual.name}</h3>
                          <p className="text-gray-600">{qual.institution}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {qual.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No qualifications added yet</p>
              )}
            </div>
            
            {/* Pricing Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Pricing</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Price
                </button>
              </div>
              
              {provider.pricing?.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left">Service</th>
                        <th className="border p-3">Price</th>
                        <th className="border p-3 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provider.pricing.map((price: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="border p-3 font-medium">{price.service}</td>
                          <td className="border p-3 text-center font-semibold text-green-700">
                            ₹{price.price}
                          </td>
                          <td className="border p-3">{price.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No pricing information added yet</p>
              )}
            </div>
            
            {/* Working Hours Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Working Hours</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit Hours
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(provider.workingHours || {}).map((day) => (
                  <div key={day} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold capitalize">{day}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        provider.workingHours[day].active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {provider.workingHours[day].active ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    {provider.workingHours[day].active && (
                      <div className="text-gray-600 mt-1">
                        {provider.workingHours[day].start} - {provider.workingHours[day].end}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gallery Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gallery</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Photos
                </button>
              </div>
              
              {provider.gallery?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {provider.gallery.map((img: string, i: number) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        className="rounded-lg object-cover h-32 w-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No photos added yet</p>
              )}
            </div>
            
            {/* Certificates Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Certificates</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Certificate
                </button>
              </div>
              
              {provider.certificates?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.certificates.map((cert: string, i: number) => (
                    <div key={i} className="border rounded-lg p-4 flex items-center hover:bg-gray-50">
                      <DocumentTextIcon className="h-10 w-10 text-blue-500 mr-3" />
                      <div>
                        <a 
                          href={cert} 
                          className="text-blue-600 hover:underline font-medium truncate block"
                          target="_blank"
                        >
                          Certificate {i + 1}
                        </a>
                        <p className="text-gray-500 text-sm truncate">{cert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No certificates added yet</p>
              )}
            </div>
            
            {/* Team Members Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Team Members</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Member
                </button>
              </div>
              
              {provider.teamMembers?.length ? (
                <div className="space-y-4">
                  {provider.teamMembers.map((member: any, i: number) => (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                        <UserGroupIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{member.name}</h3>
                        <p className="text-gray-600">{member.phone}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(member.skills || []).map((skill: string, idx: number) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No team members added yet</p>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Introduction Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to your provider profile! Here you can manage your services, update your information, and connect with customers.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                Edit Profile
              </button>
            </div>
            
            {/* Photos Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Photos</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  See All
                </button>
              </div>
              
              {provider.gallery?.length ? (
                <div className="grid grid-cols-3 gap-2">
                  {provider.gallery.slice(0, 6).map((img: string, i: number) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden">
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No photos yet</p>
                </div>
              )}
            </div>
            
            {/* Bank Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <BuildingLibraryIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Account Holder</p>
                    <p className="font-medium">{provider.bankDetails?.accountName || "Not added"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CurrencyRupeeIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Account Number</p>
                    <p className="font-medium">{provider.bankDetails?.accountNumber || "Not added"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">IFSC Code</p>
                    <p className="font-medium">{provider.bankDetails?.ifsc || "Not added"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">UPI ID</p>
                    <p className="font-medium">{provider.bankDetails?.upiId || "Not added"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tools Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tools & Equipment</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add Tool
                </button>
              </div>
              
              {provider.tools?.length ? (
                <ul className="space-y-3">
                  {provider.tools.map((tool: any, i: number) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium">{tool.name}</p>
                        <p className="text-gray-600 text-sm">{tool.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No tools added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NoProviderCard = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white p-10 rounded-xl shadow text-center max-w-md">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-3">No Provider Found</h2>
      <p className="mb-6 text-gray-600">Please login to view provider details.</p>
      <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-medium inline-block">
        Go to Login
      </a>
    </div>
  </div>
);