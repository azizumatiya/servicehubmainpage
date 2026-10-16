'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// Server-driven types
interface ServiceCategory {
  _id: string;
  name: string;
  icon: string;        // icon name your AppIcon understands
  description: string;
}

interface BudgetRange {
  _id: string;
  value: string;
  label: string;
}

interface LocationData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface ServiceDetailsFormProps {
  onNext: (data: any) => void;
}

const ServiceDetailsForm = ({ onNext }: ServiceDetailsFormProps) => {
  // Server data
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ServiceCategory[]>([]);

  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showLocationForm, setShowLocationForm] = useState<boolean>(false);
  const [locationMethod, setLocationMethod] = useState<'manual' | 'current' | 'map'>('manual');

  const urgencyOptions = [
    { value: 'asap', label: 'ASAP (Same Day)', extra: '+$50 rush fee' },
    { value: 'within-week', label: 'Within a Week', extra: 'Standard rate' },
    { value: 'flexible', label: 'Flexible Timing', extra: '10% discount' }
  ];

  // Fetch MongoDB-backed categories and budgets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/services/get-categories', { method: 'GET' });
        const data = await res.json();
        if (data?.success) {
          setServiceCategories(data.categories || []);
          setBudgetRanges(data.budgets || []);
          setFilteredCategories(data.categories || []);
        } else {
          // Optional: fallback or toast
          console.warn('Failed to load categories/budgets');
        }
      } catch (err) {
        console.error('Error fetching categories/budgets:', err);
      }
    };
    fetchData();
  }, []);

  // Filter categories by search
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredCategories(serviceCategories);
      return;
    }
    const result = serviceCategories.filter(cat =>
      cat.name.toLowerCase().includes(term) ||
      (cat.description || '').toLowerCase().includes(term)
    );
    setFilteredCategories(result);
  }, [searchTerm, serviceCategories]);

  // Compose location text when locationData changes
  useEffect(() => {
    const { address, city, state, zipCode } = locationData;
    const parts = [address, city, state, zipCode].filter(Boolean);
    setLocation(parts.join(', '));
  }, [locationData]);

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Please enter your location manually.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData(prev => ({
          ...prev,
          latitude,
          longitude
        }));
        setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
        setShowLocationForm(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your current location. Please enter it manually.');
      }
    );
  };

  const handleLocationSubmit = () => {
    const { address, city, state, zipCode } = locationData;
    const parts = [address, city, state, zipCode].filter(Boolean);
    setLocation(parts.join(', '));
    setShowLocationForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && description && urgency && budget && location) {
      onNext({
        category: selectedCategory,
        description,
        urgency,
        budget,
        location,
        locationData
      });
    } else {
      // Optional: toast validation
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">What service do you need?</h2>
        <p className="text-text-secondary">Tell us about your project to find the right professional</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Search */}
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>

        {/* Active Search Filter */}
        {searchTerm && (
          <div className="flex items-center bg-muted px-3 py-1 rounded-full text-sm w-fit">
            <span>Searching: {searchTerm}</span>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        )}

  {/* Service Category Selection (from API) */}
<div>
  <label className="block text-sm font-semibold text-foreground mb-3">
    Select Service Category *
  </label>

  {filteredCategories.length === 0 ? (
    <div className="text-center py-8 text-muted-foreground">
      <Icon name="ExclamationTriangleIcon" size={24} className="mx-auto mb-2" />
      <p>No services found matching your search.</p>
      <button
        type="button"
        onClick={() => setSearchTerm('')}
        className="mt-2 text-primary hover:underline"
      >
        Clear search
      </button>
    </div>
  ) : (
    <div className="max-h-80 overflow-y-auto pr-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category._id}
            type="button"
            onClick={() => setSelectedCategory(category._id)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-md ${
              selectedCategory === category._id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon
                name={category.icon as any}
                size={20}
                className={selectedCategory === category._id ? 'text-primary' : 'text-text-secondary'}
              />
              <span className={`font-medium ${selectedCategory === category._id ? 'text-primary' : 'text-foreground'}`}>
                {category.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded-md">
              {category.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )}
</div>

        {/* Service Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
            Describe Your Project *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide details about what you need done, any specific requirements, and the scope of work..."
            className="input min-h-[120px] resize-none"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Be specific to get accurate quotes and find the right professional
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Service Location *
          </label>

          {!showLocationForm ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center">
                  <Icon name="MapPinIcon" size={20} className="text-muted-foreground mr-3" />
                  <div>
                    {location ? (
                      <p className="text-foreground">{location}</p>
                    ) : (
                      <p className="text-muted-foreground">No location selected</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLocationForm(true)}
                  className="text-primary hover:underline"
                >
                  {location ? 'Change' : 'Add Location'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-foreground">Enter Residential Address</h3>
                <button
                  type="button"
                  onClick={() => setShowLocationForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>

              {/* Location Method Selection */}
              <div className="flex space-x-2 mb-4">
                <button
                  type="button"
                  onClick={() => setLocationMethod('manual')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    locationMethod === 'manual'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Enter Address
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocationMethod('current');
                    getCurrentLocation();
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    locationMethod === 'current'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Use Current Location
                </button>
                <button
                  type="button"
                  onClick={() => setLocationMethod('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    locationMethod === 'map'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Select on Map
                </button>
              </div>

              {/* Location Form */}
              {locationMethod === 'manual' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={locationData.address}
                      onChange={(e) => setLocationData({ ...locationData, address: e.target.value })}
                      placeholder="123 Main St"
                      className="input w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={locationData.city}
                        onChange={(e) => setLocationData({ ...locationData, city: e.target.value })}
                        placeholder="New York"
                        className="input w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={locationData.state}
                        onChange={(e) => setLocationData({ ...locationData, state: e.target.value })}
                        placeholder="NY"
                        className="input w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={locationData.zipCode}
                        onChange={(e) => setLocationData({ ...locationData, zipCode: e.target.value })}
                        placeholder="10001"
                        className="input w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={locationData.country}
                        onChange={(e) => setLocationData({ ...locationData, country: e.target.value })}
                        className="input w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleLocationSubmit}
                      className="btn-primary px-4 py-2 rounded-md"
                    >
                      Save Location
                    </button>
                  </div>
                </div>
              )}

              {locationMethod === 'current' && (
                <div className="text-center py-4">
                  <Icon name="MapPinIcon" size={24} className="mx-auto text-primary mb-2" />
                  <p className="text-foreground mb-2">Getting your current location...</p>
                  <p className="text-sm text-muted-foreground">Please allow location access when prompted</p>
                </div>
              )}

              {locationMethod === 'map' && (
                <div className="text-center py-4">
                  <Icon name="MapIcon" size={24} className="mx-auto text-primary mb-2" />
                  <p className="text-foreground mb-2">Map Selection</p>
                  <p className="text-sm text-muted-foreground mb-4">In a real application, an interactive map would appear here</p>
                  <div className="bg-muted border border-border rounded-lg h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">Map Placeholder</p>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleLocationSubmit}
                      className="btn-primary px-4 py-2 rounded-md"
                    >
                      Confirm Location
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            When do you need this done? *
          </label>
          <div className="space-y-2">
            {urgencyOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={urgency === option.value}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.extra}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

      {/* Budget Range (from API) */}
<div>
  <label className="block text-sm font-semibold text-foreground mb-3">
    What’s your budget range? *
  </label>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {budgetRanges.map((range) => {
      const formattedLabel = range.label.startsWith("₹")
        ? range.label
        : `₹${range.label.replace(/[^0-9\-]/g, '')}`; // Adds ₹ and cleans numbers

      return (
        <button
          key={range._id}
          type="button"
          onClick={() => setBudget(range.value)}
          className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
            budget === range.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          {formattedLabel}
        </button>
      );
    })}
  </div>
</div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!selectedCategory || !description || !urgency || !budget || !location}
            className="w-full btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Find Matching Providers</span>
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceDetailsForm;
