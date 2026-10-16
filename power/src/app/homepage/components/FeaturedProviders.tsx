import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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

interface FeaturedProvidersProps {
  onProviderClick: (provider: Provider) => void;
}

const FeaturedProviders = ({ onProviderClick }: FeaturedProvidersProps) => {
  const providers: Provider[] = [
  {
    id: '1',
    name: 'Michael Rodriguez',
    business: 'Rodriguez Plumbing Solutions',
    image: "https://images.unsplash.com/photo-1659353591742-9fa64d94738e",
    alt: 'Professional Hispanic plumber in blue uniform holding wrench in modern bathroom',
    rating: 4.9,
    reviewCount: 247,
    specialties: ['Emergency Repairs', 'Pipe Installation', 'Water Heaters'],
    responseTime: '< 2 hours',
    completedJobs: 1250,
    isVerified: true,
    location: 'Brooklyn, NY'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    business: 'Sparkle Clean Services',
    image: "https://images.unsplash.com/photo-1680631626569-d163da98ff40",
    alt: 'Asian woman in professional cleaning uniform smiling while holding cleaning supplies',
    rating: 4.8,
    reviewCount: 189,
    specialties: ['Deep Cleaning', 'Move-in/out', 'Office Cleaning'],
    responseTime: '< 4 hours',
    completedJobs: 890,
    isVerified: true,
    location: 'Manhattan, NY'
  },
  {
    id: '3',
    name: 'David Thompson',
    business: 'Thompson Electric Co.',
    image: "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14",
    alt: 'Caucasian electrician in safety gear working on electrical panel with tools',
    rating: 4.9,
    reviewCount: 156,
    specialties: ['Wiring', 'Panel Upgrades', 'Smart Home'],
    responseTime: '< 3 hours',
    completedJobs: 675,
    isVerified: true,
    location: 'Queens, NY'
  },
  {
    id: '4',
    name: 'Maria Santos',
    business: 'Green Thumb Landscaping',
    image: "https://images.unsplash.com/photo-1480184110207-3fb7adc7d1c3",
    alt: 'Latina woman in gardening attire kneeling beside colorful flower bed with pruning shears',
    rating: 4.7,
    reviewCount: 203,
    specialties: ['Garden Design', 'Lawn Care', 'Tree Service'],
    responseTime: '< 6 hours',
    completedJobs: 520,
    isVerified: true,
    location: 'Bronx, NY'
  }];


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="StarIcon"
      size={16}
      variant={index < Math.floor(rating) ? 'solid' : 'outline'}
      className={index < Math.floor(rating) ? 'text-accent' : 'text-gray-300'} />

    );
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Service Providers
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Meet our top-rated professionals who consistently deliver exceptional service
          </p>
        </div>
        
        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) =>
          <div
            key={provider.id}
            onClick={() => onProviderClick(provider)}
            className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">

              {/* Provider Image */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <AppImage
                  src={provider.image}
                  alt={provider.alt}
                  className="w-full h-full object-cover" />

                </div>
                {provider.isVerified &&
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="CheckIcon" size={14} className="text-white" />
                  </div>
              }
              </div>
              
              {/* Provider Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {provider.name}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {provider.business}
                </p>
                <p className="text-xs text-text-secondary flex items-center justify-center">
                  <Icon name="MapPinIcon" size={12} className="mr-1" />
                  {provider.location}
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center mr-2">
                  {renderStars(provider.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {provider.rating}
                </span>
                <span className="text-sm text-text-secondary ml-1">
                  ({provider.reviewCount})
                </span>
              </div>
              
              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {provider.specialties.slice(0, 2).map((specialty, index) =>
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">

                      {specialty}
                    </span>
                )}
                  {provider.specialties.length > 2 &&
                <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                      +{provider.specialties.length - 2}
                    </span>
                }
                </div>
              </div>
              
              {/* Stats */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Response Time:</span>
                  <span className="font-medium text-success">{provider.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Jobs Completed:</span>
                  <span className="font-medium text-foreground">{provider.completedJobs.toLocaleString()}</span>
                </div>
              </div>
              
              {/* View Profile Button */}
              <button className="w-full mt-4 bg-primary/10 hover:bg-primary hover:text-white text-primary py-2 rounded-md text-sm font-medium transition-all duration-300">
                View Profile
              </button>
            </div>
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
            Browse All Providers
          </button>
        </div>
      </div>
    </section>);

};

export default FeaturedProviders;