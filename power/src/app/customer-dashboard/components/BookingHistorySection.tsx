'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface BookingHistory {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  completedDate: string;
  amount: number;
  rating: number;
  status: 'completed' | 'cancelled';
  category: string;
}

interface BookingHistorySectionProps {
  bookings: BookingHistory[];
}

const BookingHistorySection = ({ bookings }: BookingHistorySectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['all', 'plumbing', 'electrical', 'cleaning', 'handyman', 'landscaping'];

  const filteredBookings = bookings
    .filter(booking => 
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(booking => filterCategory === 'all' || booking.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        size={16}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        variant={index < rating ? 'solid' : 'outline'}
      />
    ));
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Booking History</h2>
        <Icon name="ClockIcon" size={24} className="text-primary" />
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input w-full lg:w-48"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input w-full lg:w-48"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Booking List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No bookings found matching your criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <AppImage
                    src={booking.providerImage}
                    alt={booking.providerImageAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{booking.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">by {booking.providerName}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-2">
                        {renderStars(booking.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">({booking.rating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-foreground">${booking.amount}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="CalendarIcon" size={16} className="mr-1" />
                    {booking.completedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistorySection;