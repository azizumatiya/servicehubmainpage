'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import SearchSection from './SearchSection';
import ServiceCategories from './ServiceCategories';
import FeaturedProviders from './FeaturedProviders';
import TestimonialCarousel from './TestimonialCarousel';
import TrustBadges from './TrustBadges';
import CallToAction from './CallToAction';

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  providerCount: number;
  averagePrice: string;
}

interface Provider {
  id: string;
  name: string;
  business: string;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  responseTime: string;
  completedJobs: number;
  isVerified: boolean;
  location: string;
}

const HomepageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSearchClick = () => {
    if (!isHydrated) return;
    setIsSearchVisible(true);
  };

  const handleSearchClose = () => {
    if (!isHydrated) return;
    setIsSearchVisible(false);
  };

  const handleCategoryClick = (category: ServiceCategory) => {
    if (!isHydrated) return;
    console.log('Category clicked:', category.name);
    // Navigate to service booking flow with category
  };

  const handleProviderClick = (provider: Provider) => {
    if (!isHydrated) return;
    console.log('Provider clicked:', provider.name);
    // Navigate to provider profile
  };

  const handleGetStartedClick = () => {
    if (!isHydrated) return;
    console.log('Get started clicked');
    // Navigate to service booking flow
  };

  const handleJoinProviderClick = () => {
    if (!isHydrated) return;
    console.log('Join provider clicked');
    // Navigate to provider registration
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-96 bg-muted"></div>
          <div className="p-8 space-y-4">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <HeroSection onSearchClick={handleSearchClick} /> */}
      
      <SearchSection 
        isVisible={isSearchVisible} 
        onClose={handleSearchClose} 
      />
      
      <ServiceCategories onCategoryClick={handleCategoryClick} />
      
      <FeaturedProviders onProviderClick={handleProviderClick} />
      
      <TestimonialCarousel />
      
      <TrustBadges />
      
      <CallToAction 
        onGetStartedClick={handleGetStartedClick}
        onJoinProviderClick={handleJoinProviderClick}
      />
    </div>
  );
};

export default HomepageInteractive;