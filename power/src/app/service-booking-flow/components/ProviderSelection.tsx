'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Provider {
  id: string;
  name: string;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  responseTime: string;
  distance: string;
  hourlyRate: number;
  specialties: string[];
  specializations: string[]; // Added this field
  isVerified: boolean;
  isOnline: boolean;
  badges: string[];
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    district?: string;
    taluka?: string;
    area?: string;
  };
  yearsOfExperience: number;
  insuranceAccepted: string[];
}

interface ProviderSelectionProps {
  onNext: (providerId: string) => void;
  onBack: () => void;
}

const ProviderSelection = ({ onNext, onBack }: ProviderSelectionProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Location filter states
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedTaluka, setSelectedTaluka] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  
  // Filter states
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  
  // Mobile detection states
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);
  const [hasSeenMobileModal, setHasSeenMobileModal] = useState<boolean>(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [providersPerPage] = useState<number>(10);

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price', label: 'Lowest Price' },
    { value: 'distance', label: 'Closest to You' },
    { value: 'experience', label: 'Most Experience' },
    { value: 'response', label: 'Fastest Response' }
  ];

  const radiusOptions = [
    { value: 5, label: '5 miles' },
    { value: 10, label: '10 miles' },
    { value: 25, label: '25 miles' },
    { value: 50, label: '50 miles' }
  ];

  const priceRangeOptions = [
    { value: [0, 50], label: 'Under $50/hr' },
    { value: [50, 100], label: '$50 - $100/hr' },
    { value: [100, 150], label: '$100 - $150/hr' },
    { value: [150, 200], label: '$150 - $200/hr' },
    { value: [200, 500], label: 'Over $200/hr' }
  ];

  const ratingOptions = [
    { value: 0, label: 'Any Rating' },
    { value: 4, label: '4+ Stars' },
    { value: 4.5, label: '4.5+ Stars' },
    { value: 4.8, label: '4.8+ Stars' }
  ];

  // Gujarat location data
  const gujaratData = {
    state: 'Gujarat',
    districts: [
      {
        name: 'Ahmedabad',
        talukas: ['Daskroi', 'Dholka', 'Sanand', 'Viramgam'],
        areas: ['Navrangpura', 'Maninagar', 'Satellite', 'Gota', 'Bodakdev', 'Vastrapur']
      },
      {
        name: 'Mahesana',
        talukas: ['Mahesana', 'Visnagar', 'Kadi', 'Unjha'],
        areas: ['Nagar Palika', 'Modasa', 'Sidhpur', 'Vadnagar']
      },
      {
        name: 'Sabarkantha',
        talukas: ['Himatnagar', 'Idar', 'Prantij', 'Khedbrahma'],
        areas: ['Modasa', 'Idar', 'Himatnagar', 'Vijaynagar']
      },
       {
        name: 'Banaskantha',
        talukas: ['danta', 'palanpur', 'vadgam', 'disa'],
        areas: ['navanas', 'danta', 'vadgam', 'palanpur']
      },
      {
        name: 'Surat',
        talukas: ['Surat City', 'Choryasi', 'Palsana', 'Kamrej'],
        areas: ['Adajan', 'Piplod', 'Rander', 'Athwa', 'Varachha']
      },
      {
        name: 'Vadodara',
        talukas: ['Vadodara City', 'Savli', 'Waghodia', 'Padra'],
        areas: ['Alkapuri', 'Sayajigunj', 'Manjalpur', 'Fatehgunj']
      },
      {
        name: 'Rajkot',
        talukas: ['Rajkot', 'Gondal', 'Jetpur', 'Dhoraji'],
        areas: ['Sadargate', 'Mavdi', 'Kalawad', 'Yagnik Road']
      },
      {
        name: 'Bhavnagar',
        talukas: ['Bhavnagar', 'Gariadhar', 'Sihor', 'Palitana'],
        areas: ['Wala', 'Sardarnagar', 'Ghodhado', 'Krishnanagar']
      },
      {
        name: 'Jamnagar',
        talukas: ['Jamnagar', 'Lalpur', 'Digvijaygram', 'Kalavad'],
        areas: ['Gulabnagar', 'Park Colony', 'Jodiya', 'Khambhalia']
      },
      {
        name: 'Gandhinagar',
        talukas: ['Gandhinagar', 'Dehgam', 'Mansa', 'Kalol'],
        areas: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4']
      },
      {
        name: 'Junagadh',
        talukas: ['Junagadh', 'Mangrol', 'Veraval', 'Keshod'],
        areas: ['Girnar', 'Mendarda', 'Bhesan', 'Vanthali']
      }
    ]
  };

  // Mock data for fallback when API fails
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Rajesh Patel',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      alt: 'Rajesh Patel profile',
      rating: 4.8,
      reviewCount: 124,
      completedJobs: 89,
      responseTime: '1 hour',
      distance: '2.5 miles',
      hourlyRate: 85,
      specialties: ['Electrical', 'Plumbing', 'AC Repair'],
      specializations: ['Electrical', 'Plumbing', 'AC Repair'], // Added this field
      isVerified: true,
      isOnline: true,
      badges: ['Top Rated', 'Quick Response'],
      description: 'Experienced technician with 10+ years in electrical and plumbing services. Available 24/7 for emergency repairs.',
      location: {
        address: '123 Main Street, Ahmedabad',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zipCode: '380001',
        latitude: 23.0225,
        longitude: 72.5714,
        district: 'Ahmedabad',
        taluka: 'Daskroi',
        area: 'Navrangpura'
      },
      yearsOfExperience: 10,
      insuranceAccepted: ['Home Insurance', 'Apartment Insurance']
    },
    {
      id: '2',
      name: 'Amit Sharma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      alt: 'Amit Sharma profile',
      rating: 4.6,
      reviewCount: 89,
      completedJobs: 67,
      responseTime: '2 hours',
      distance: '3.8 miles',
      hourlyRate: 75,
      specialties: ['Carpentry', 'Painting', 'Home Renovation'],
      specializations: ['Carpentry', 'Painting', 'Home Renovation'], // Added this field
      isVerified: true,
      isOnline: true,
      badges: ['Verified Pro'],
      description: 'Specialized in home renovation and carpentry work. Quality service with attention to detail.',
      location: {
        address: '456 Park Avenue, Vadodara',
        city: 'Vadodara',
        state: 'Gujarat',
        zipCode: '390001',
        latitude: 22.3072,
        longitude: 73.1812,
        district: 'Vadodara',
        taluka: 'Vadodara City',
        area: 'Alkapuri'
      },
      yearsOfExperience: 8,
      insuranceAccepted: ['Home Insurance']
    }
  ];

  // Fetch providers from MongoDB
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/providers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match the Provider interface
        const transformedProviders: Provider[] = data.data.map((provider: any) => ({
          id: provider._id || provider.id,
          name: provider.fullName || provider.name,
          image: provider.profileImage || provider.image || "https://images.unsplash.com/photo-1659353591742-9fa64d94738e",
          alt: `${provider.fullName || provider.name} profile`,
          rating: provider.rating || 4.5,
          reviewCount: provider.reviewCount || 0,
          completedJobs: provider.completedJobs || 0,
          responseTime: provider.responseTime || '2 hours',
          distance: provider.distance || '5 miles',
          hourlyRate: provider.pricing && provider.pricing.length > 0 ? provider.pricing[0].price : 75,
          specialties: provider.services || [],
          specializations: provider.specializations || provider.services || [], // Use specializations if available, otherwise fallback to services
          isVerified: provider.verified || false,
          isOnline: provider.online || false,
          badges: provider.badges || [],
          description: provider.bio || '',
          location: {
            address: provider.address?.fullAddress || '',
            city: provider.address?.city || '',
            state: provider.address?.state || 'Gujarat',
            zipCode: provider.address?.pincode || '',
            latitude: provider.address?.lat || 23.0225,
            longitude: provider.address?.lng || 72.5714,
            district: provider.address?.district || '',
            taluka: provider.address?.taluka || '',
            area: provider.address?.area || ''
          },
          yearsOfExperience: provider.experience ? parseInt(provider.experience) : 5,
          insuranceAccepted: provider.insuranceAccepted || []
        }));
        
        setProviders(transformedProviders);
        setFilteredProviders(transformedProviders);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Failed to fetch providers from server. Using sample data instead.');
        
        // Fallback to mock data if API fails
        setProviders(mockProviders);
        setFilteredProviders(mockProviders);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Calculate distance between two coordinates in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Check if device is mobile
  const checkIsMobile = () => {
    return window.innerWidth <= 768;
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      
      // Show modal when resizing to mobile if not already shown
      if (mobile && !hasSeenMobileModal) {
        setShowMobileModal(true);
        setHasSeenMobileModal(true);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasSeenMobileModal]);

  // Show modal on initial load if mobile
  useEffect(() => {
    if (isMobile && !hasSeenMobileModal) {
      setShowMobileModal(true);
      setHasSeenMobileModal(true);
    }
  }, [isMobile, hasSeenMobileModal]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          applyFilters(latitude, longitude, searchRadius);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please enter a location manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Apply all filters
  const applyFilters = (lat?: number, lng?: number, radius?: number) => {
    let result = [...providers];
    
    // State filter
    if (selectedState) {
      result = result.filter(provider => 
        provider.location.state.toLowerCase() === selectedState.toLowerCase()
      );
    }
    
    // District filter
    if (selectedDistrict) {
      result = result.filter(provider => 
        provider.location.district?.toLowerCase() === selectedDistrict.toLowerCase()
      );
    }
    
    // Taluka filter
    if (selectedTaluka) {
      result = result.filter(provider => 
        provider.location.taluka?.toLowerCase() === selectedTaluka.toLowerCase()
      );
    }
    
    // Area filter
    if (selectedArea) {
      result = result.filter(provider => 
        provider.location.area?.toLowerCase() === selectedArea.toLowerCase()
      );
    }
    
    // Location filter (if coordinates are provided)
    if (lat && lng && radius) {
      result = result.filter(provider => {
        const distance = calculateDistance(lat, lng, provider.location.latitude, provider.location.longitude);
        return distance <= radius;
      });
      
      // Update distance display for filtered providers
      result = result.map(provider => {
        const distance = calculateDistance(lat, lng, provider.location.latitude, provider.location.longitude);
        return {
          ...provider,
          distance: `${distance.toFixed(1)} miles`
        };
      });
    }
    
    // Price range filter
    result = result.filter(provider => 
      provider.hourlyRate >= priceRange[0] && provider.hourlyRate <= priceRange[1]
    );
    
    // Rating filter
    result = result.filter(provider => provider.rating >= minRating);
    
    // Verified only filter
    if (verifiedOnly) {
      result = result.filter(provider => provider.isVerified);
    }
    
    // Online only filter
    if (onlineOnly) {
      result = result.filter(provider => provider.isOnline);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'distance':
        result.sort((a, b) => {
          const distA = parseFloat(a.distance);
          const distB = parseFloat(b.distance);
          return distA - distB;
        });
        break;
      case 'experience':
        result.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
        break;
      case 'response':
        // Simple sort by response time (not perfect but works for demo)
        result.sort((a, b) => {
          const timeA = a.responseTime.includes('<') ? 0 : parseInt(a.responseTime);
          const timeB = b.responseTime.includes('<') ? 0 : parseInt(b.responseTime);
          return timeA - timeB;
        });
        break;
    }
    
    setFilteredProviders(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // Handle location search
  const handleLocationSearch = () => {
    if (!locationSearch.trim()) return;
    
    // In a real app, you would use a geocoding service to convert address to coordinates
    // For demo, we'll use a mock geocoding function
    const mockGeocode = (address: string): {lat: number, lng: number} | null => {
      // Simple mock that returns coordinates for Gujarat cities
      if (address.toLowerCase().includes('ahmedabad')) {
        return { lat: 23.0225, lng: 72.5714 };
      } else if (address.toLowerCase().includes('mahesana')) {
        return { lat: 23.5980, lng: 72.3730 };
      } else if (address.toLowerCase().includes('sabarkantha')) {
        return { lat: 23.6210, lng: 73.0420 };
      } else if (address.toLowerCase().includes('surat')) {
        return { lat: 21.1702, lng: 72.8311 };
      } else if (address.toLowerCase().includes('vadodara')) {
        return { lat: 22.3072, lng: 73.1812 };
      }
      return null;
    };
    
    const coords = mockGeocode(locationSearch);
    if (coords) {
      setUserLocation(coords);
      applyFilters(coords.lat, coords.lng, searchRadius);
    } else {
      alert('Location not found. Please try a different search term.');
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 200]);
    setMinRating(0);
    setVerifiedOnly(false);
    setOnlineOnly(false);
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluka('');
    setSelectedArea('');
    
    if (userLocation) {
      applyFilters(userLocation.lat, userLocation.lng, searchRadius);
    } else {
      applyFilters();
    }
  };

  // Initialize filtered providers
  useEffect(() => {
    if (providers.length > 0) {
      applyFilters();
    }
  }, [providers]);

  // Update filtered providers when filters change
  useEffect(() => {
    if (providers.length > 0) {
      if (userLocation) {
        applyFilters(userLocation.lat, userLocation.lng, searchRadius);
      } else {
        applyFilters();
      }
    }
  }, [sortBy, priceRange, minRating, verifiedOnly, onlineOnly, 
      selectedState, selectedDistrict, selectedTaluka, selectedArea]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleContinue = () => {
    if (selectedProvider) {
      onNext(selectedProvider);
    }
  };

  // Get available districts based on selected state
  const getAvailableDistricts = () => {
    if (!selectedState) return [];
    return gujaratData.districts.map(district => district.name);
  };

  // Get available talukas based on selected district
  const getAvailableTalukas = () => {
    if (!selectedDistrict) return [];
    const district = gujaratData.districts.find(d => d.name === selectedDistrict);
    return district ? district.talukas : [];
  };

  // Get available areas based on selected district
  const getAvailableAreas = () => {
    if (!selectedDistrict) return [];
    const district = gujaratData.districts.find(d => d.name === selectedDistrict);
    return district ? district.areas : [];
  };

  // Reset dependent filters when a parent filter changes
  useEffect(() => {
    if (selectedState) {
      setSelectedDistrict('');
      setSelectedTaluka('');
      setSelectedArea('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedTaluka('');
      setSelectedArea('');
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedTaluka) {
      setSelectedArea('');
    }
  }, [selectedTaluka]);

  // Pagination logic
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider);
  const totalPages = Math.ceil(filteredProviders.length / providersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Facebook-style Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-blue-600 font-bold text-2xl">ProviderConnect</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search providers..."
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-medium">My Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Mobile Modal */}
        {showMobileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowMobileModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="DevicePhoneMobileIcon" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mobile Experience</h3>
                <p className="text-muted-foreground mb-4">
                  You're viewing our app on a mobile device. Enjoy our optimized mobile experience!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <Icon name="MapPinIcon" size={20} className="text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-foreground">Location-Based Search</h4>
                    <p className="text-sm text-muted-foreground">Find providers near you</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <Icon name="StarIcon" size={20} className="text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-foreground">Provider Ratings</h4>
                    <p className="text-sm text-muted-foreground">See reviews and ratings</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <Icon name="ClockIcon" size={20} className="text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-foreground">Quick Booking</h4>
                    <p className="text-sm text-muted-foreground">Book services in taps</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowMobileModal(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Provider</h2>
          <p className="text-gray-600">Select from verified professionals in your area</p>
          
          {/* Error message */}
          {error && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Using sample data</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location Search */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Icon name="MapPinIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Enter your location to find nearby providers..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
              />
            </div>
            <button
              onClick={handleLocationSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Search
            </button>
            <button
              onClick={getCurrentLocation}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium flex items-center space-x-2"
            >
              <Icon name="MapPinIcon" size={16} />
              <span>Use My Location</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Search Radius:</span>
            <div className="flex space-x-2">
              {radiusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSearchRadius(option.value);
                    if (userLocation) {
                      applyFilters(userLocation.lat, userLocation.lng, option.value);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    searchRadius === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {userLocation && (
            <div className="mt-3 text-sm text-gray-600">
              Showing providers within {searchRadius} miles of your location
            </div>
          )}
        </div>

        {/* Location Filters */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Filter by Location</h3>
            <p className="text-sm text-gray-600">Find providers in specific regions of Gujarat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              >
                <option value="">All States</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
            
            {/* District Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={!selectedState}
              >
                <option value="">All Districts</option>
                {getAvailableDistricts().map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Taluka Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Taluka
              </label>
              <select
                value={selectedTaluka}
                onChange={(e) => setSelectedTaluka(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={!selectedDistrict}
              >
                <option value="">All Talukas</option>
                {getAvailableTalukas().map((taluka) => (
                  <option key={taluka} value={taluka}>
                    {taluka}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Area Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Area
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={!selectedDistrict}
              >
                <option value="">All Areas</option>
                {getAvailableAreas().map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-900"
              >
                <Icon name="FunnelIcon" size={16} />
                <span>Filters</span>
                <Icon 
                  name={showFilters ? "ChevronUpIcon" : "ChevronDownIcon"} 
                  size={16} 
                />
              </button>
              
              {/* Active filter indicators */}
              {(priceRange[0] > 0 || priceRange[1] < 200 || minRating > 0 || 
               verifiedOnly || onlineOnly || selectedState || selectedDistrict || 
               selectedTaluka || selectedArea) && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  <div className="flex flex-wrap gap-1">
                    {priceRange[0] > 0 || priceRange[1] < 200 ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        ${priceRange[0]}-${priceRange[1]}/hr
                      </span>
                    ) : null}
                    {minRating > 0 ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {minRating}+ stars
                      </span>
                    ) : null}
                    {verifiedOnly ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Verified
                      </span>
                    ) : null}
                    {onlineOnly ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Online
                      </span>
                    ) : null}
                    {selectedState && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {selectedState}
                      </span>
                    )}
                    {selectedDistrict && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {selectedDistrict}
                      </span>
                    )}
                    {selectedTaluka && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {selectedTaluka}
                      </span>
                    )}
                    {selectedArea && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {selectedArea}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="FunnelIcon" size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price Range
                  </label>
                  <select
                    value={`${priceRange[0]}-${priceRange[1]}`}
                    onChange={(e) => {
                      const [min, max] = e.target.value.split('-').map(Number);
                      setPriceRange([min, max]);
                    }}
                    className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  >
                    {priceRangeOptions.map((option) => (
                      <option key={`${option.value[0]}-${option.value[1]}`} value={`${option.value[0]}-${option.value[1]}`}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full bg-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  >
                    {ratingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Toggle Filters */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Verified Only</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Online Now</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlineOnly}
                        onChange={(e) => setOnlineOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 text-sm text-center border border-gray-300 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {loading ? 'Loading providers...' : `${filteredProviders.length} providers available`}
          </div>
        </div>

        {/* Provider List */}
        <div className="space-y-4 mb-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading providers...</p>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <Icon name="ExclamationTriangleIcon" size={24} className="mx-auto mb-2 text-yellow-500" />
              <p className="text-gray-600">No providers found matching your criteria. Try adjusting your filters or search parameters.</p>
            </div>
          ) : (
            <>
              {currentProviders.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProvider === provider.id
                      ? 'border-2 border-blue-500'
                      : 'border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                    {/* Provider Image and Basic Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <AppImage
                          src={provider.image}
                          alt={provider.alt}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {provider.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                          {provider.isVerified && (
                            <Icon name="CheckBadgeIcon" size={16} className="text-blue-600" />
                          )}
                          
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Icon name="StarIcon" size={14} className="text-yellow-500 fill-current" />
                            <span>{provider.rating}</span>
                            <span>({provider.reviewCount})</span>
                          </div>
                          <span>•</span>
                          <span>{provider.completedJobs} jobs</span>
                          <span>•</span>
                          <span>{provider.distance}</span>
                        </div>
                        <div className="text-sm text-gray-900">
                          {provider.location.city}, {provider.location.state}
                        </div>
                      </div>
                    </div>

                    {/* Specializations Section */}
                    <div className="flex-1 lg:ml-4">
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Specializations</h4>
                        {provider.specializations && provider.specializations.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {provider.specializations.slice(0, 3).map((specialization, index) => (
                              <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                              >
                                {specialization}
                              </span>
                            ))}
                            {provider.specializations.length > 3 && (
                              <span className="text-sm text-gray-500">
                                +{provider.specializations.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No specializations added yet</p>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {provider.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {provider.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Provider Details */}
                    <div className="flex-1 lg:ml-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Hourly Rate:</span>
                            <span className="font-semibold text-gray-900">${provider.hourlyRate}/hr</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Experience:</span>
                            <span className="text-sm text-gray-900">{provider.yearsOfExperience} years</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Response Time:</span>
                            <span className="text-sm text-gray-900">{provider.responseTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`text-sm font-medium ${provider.isOnline ? 'text-green-600' : 'text-yellow-600'}`}>
                              {provider.isOnline ? 'Available Now' : 'Busy'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedProvider === provider.id
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedProvider === provider.id && (
                          <Icon name="CheckIcon" size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name="ArrowLeftIcon" size={16} />
                    </button>
                    
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-2 rounded-md ${
                          currentPage === number
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name="ArrowRightIcon" size={16} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeftIcon" size={20} />
            <span>Back to Details</span>
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedProvider}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Continue to Scheduling</span>
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderSelection;