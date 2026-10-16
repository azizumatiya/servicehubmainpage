'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FavoriteProvider {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  category: string;
  rating: number;
  completedJobs: number;
  responseTime: string;
  isAvailable: boolean;
  specialties: string[];
}

interface FavoriteProvidersSectionProps {
  providers: FavoriteProvider[];
  onBookNow: (providerId: string) => void;
  onRemoveFavorite: (providerId: string) => void;
}

const FavoriteProvidersSection = ({ providers, onBookNow, onRemoveFavorite }: FavoriteProvidersSectionProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        size={14}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        variant={index < rating ? 'solid' : 'outline'}
      />
    ));
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Favorite Providers</h2>
        <Icon name="HeartIcon" size={24} className="text-red-500" variant="solid" />
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="HeartIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No favorite providers yet</p>
          <p className="text-sm text-muted-foreground mt-2">Add providers to favorites for quick rebooking</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <div key={provider.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <AppImage
                      src={provider.image}
                      alt={provider.imageAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{provider.name}</h3>
                    <p className="text-xs text-muted-foreground">{provider.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFavorite(provider.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Icon name="HeartIcon" size={20} variant="solid" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(provider.rating)}
                    <span className="text-xs text-muted-foreground ml-1">({provider.rating})</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{provider.completedJobs} jobs</span>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="ClockIcon" size={12} className="mr-1" />
                  Responds in {provider.responseTime}
                </div>

                <div className="flex flex-wrap gap-1">
                  {provider.specialties.slice(0, 2).map((specialty, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                      {specialty}
                    </span>
                  ))}
                  {provider.specialties.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{provider.specialties.length - 2} more</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onBookNow(provider.id)}
                disabled={!provider.isAvailable}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  provider.isAvailable
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {provider.isAvailable ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProvidersSection;