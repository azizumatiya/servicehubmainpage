import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ActiveBooking {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  scheduledDate: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  estimatedDuration: string;
  address: string;
}

interface ActiveBookingsWidgetProps {
  bookings: ActiveBooking[];
}

const ActiveBookingsWidget = ({ bookings }: ActiveBookingsWidgetProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircleIcon';
      case 'in-progress':
        return 'ClockIcon';
      case 'completed':
        return 'CheckBadgeIcon';
      case 'cancelled':
        return 'XCircleIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Active Bookings</h2>
        <Icon name="CalendarIcon" size={24} className="text-primary" />
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CalendarDaysIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No active bookings at the moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <AppImage
                    src={booking.providerImage}
                    alt={booking.providerImageAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{booking.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">by {booking.providerName}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  <Icon name={getStatusIcon(booking.status) as any} size={12} className="mr-1" />
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="CalendarIcon" size={16} className="mr-2" />
                  {booking.scheduledDate}
                </div>
                <div className="flex items-center">
                  <Icon name="ClockIcon" size={16} className="mr-2" />
                  {booking.estimatedDuration}
                </div>
                <div className="flex items-center">
                  <Icon name="MapPinIcon" size={16} className="mr-2" />
                  {booking.address}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveBookingsWidget;