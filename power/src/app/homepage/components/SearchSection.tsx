'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchSectionProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchSection = ({ isVisible, onClose }: SearchSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const popularServices = [
    'House Cleaning', 'Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Handyman'
  ];

  const handleSearch = () => {
    if (!isHydrated) return;
    // Mock search functionality
    console.log('Searching for:', { searchQuery, location, selectedCategory });
  };

  const handleLocationDetect = () => {
    if (!isHydrated) return;
    setLocation('New York, NY');
  };

  if (!isHydrated) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Find Your Service</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={24} className="text-text-secondary" />
          </button>
        </div>
        
        {/* Search Form */}
        <div className="p-6 space-y-6">
          {/* Service Search */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              What service do you need?
            </label>
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., House cleaning, Plumbing repair..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Icon name="MapPinIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your address or zip code"
                  className="input pl-10 w-full"
                />
              </div>
              <button
                onClick={handleLocationDetect}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 flex items-center"
              >
                <Icon name="MapIcon" size={16} className="text-primary" />
              </button>
            </div>
          </div>
          
          {/* Popular Services */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Popular Services
            </label>
            <div className="flex flex-wrap gap-2">
              {popularServices.map((service) => (
                <button
                  key={service}
                  onClick={() => setSearchQuery(service)}
                  className="px-4 py-2 bg-muted hover:bg-primary hover:text-white text-sm rounded-full transition-all duration-200"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            Search Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;