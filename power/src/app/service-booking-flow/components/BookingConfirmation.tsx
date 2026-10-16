'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface BookingConfirmationProps {
  bookingData: any;
}

const BookingConfirmation = ({ bookingData }: BookingConfirmationProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const bookingInfo = {
    bookingId: 'SHP-2024-001127',
    status: 'Confirmed',
    provider: {
      name: 'Mike Johnson Plumbing',
      image: "https://images.unsplash.com/photo-1659353591742-9fa64d94738e",
      alt: 'Professional plumber Mike Johnson in blue work uniform smiling at camera',
      phone: '(555) 123-4567',
      email: 'mike@johnsonplumbing.com',
      rating: 4.9,
      responseTime: '< 1 hour'
    },
    service: {
      category: 'Plumbing',
      description: 'Kitchen sink leak repair and faucet replacement',
      date: '2024-11-15',
      time: '10:00 AM',
      duration: '2 hours',
      address: '123 Main Street, Anytown, ST 12345'
    },
    payment: {
      method: 'Visa ending in 4242',
      amount: 180.28,
      transactionId: 'TXN-789456123'
    }
  };

  const nextSteps = [
  {
    icon: 'ClockIcon',
    title: 'Provider Confirmation',
    description: 'Mike will confirm your appointment within 1 hour',
    status: 'pending'
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Pre-Service Contact',
    description: 'You\'ll receive a call 30 minutes before arrival',
    status: 'scheduled'
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Service Completion',
    description: 'Service will be performed on November 15th at 10:00 AM',
    status: 'scheduled'
  },
  {
    icon: 'StarIcon',
    title: 'Review & Payment',
    description: 'Rate your experience and payment will be released',
    status: 'scheduled'
  }];


  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckIcon" size={32} className="text-success-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-text-secondary text-lg">Your service has been successfully scheduled</p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
          <Icon name="ShieldCheckIcon" size={16} />
          <span className="text-sm font-medium">Payment Secured with Escrow Protection</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Service Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Service Details</h3>
            <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
              {bookingInfo.status}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="CalendarDaysIcon" size={20} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">
                  {new Date(bookingInfo.service.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {bookingInfo.service.time} • {bookingInfo.service.duration}
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="MapPinIcon" size={20} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Service Location</div>
                <div className="text-sm text-muted-foreground">{bookingInfo.service.address}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="WrenchScrewdriverIcon" size={20} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">{bookingInfo.service.category}</div>
                <div className="text-sm text-muted-foreground">{bookingInfo.service.description}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="IdentificationIcon" size={20} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Booking ID</div>
                <div className="text-sm text-muted-foreground font-mono">{bookingInfo.bookingId}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your Provider</h3>
          
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <AppImage
              src={bookingInfo.provider.image}
              alt={bookingInfo.provider.alt}
              className="w-16 h-16 rounded-full object-cover" />

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-foreground">{bookingInfo.provider.name}</h4>
                <Icon name="CheckBadgeIcon" size={16} className="text-primary" />
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="StarIcon" size={14} className="text-warning fill-current" />
                  <span>{bookingInfo.provider.rating}</span>
                </div>
                <span>•</span>
                <span>Responds in {bookingInfo.provider.responseTime}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="PhoneIcon" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Call Provider</span>
              </div>
              <a
                href={`tel:${bookingInfo.provider.phone}`}
                className="text-primary hover:text-primary/80 font-medium">

                {bookingInfo.provider.phone}
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Send Message</span>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium">
                Open Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next</h3>
        <div className="space-y-4">
          {nextSteps.map((step, index) =>
          <div key={index} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step.status === 'pending' ? 'bg-warning text-warning-foreground' : 'bg-muted text-muted-foreground'}`
            }>
                <Icon name={step.icon as any} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {step.status === 'pending' &&
            <div className="flex items-center space-x-1 text-warning text-sm">
                  <Icon name="ClockIcon" size={14} />
                  <span>Pending</span>
                </div>
            }
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-8">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">

          <h3 className="text-lg font-semibold text-foreground">Payment Summary</h3>
          <Icon
            name={showDetails ? "ChevronUpIcon" : "ChevronDownIcon"}
            size={20}
            className="text-muted-foreground" />

        </button>
        
        {showDetails &&
        <div className="mt-4 p-4 bg-background border border-border rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="text-foreground">{bookingInfo.payment.method}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="text-foreground font-mono">{bookingInfo.payment.transactionId}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
              <span className="text-foreground">Total Paid:</span>
              <span className="text-foreground">${bookingInfo.payment.amount}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <Icon name="InformationCircleIcon" size={14} className="inline mr-1" />
              Payment will be released to provider after service completion and your approval
            </div>
          </div>
        }
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="btn-primary px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
          <Icon name="CalendarDaysIcon" size={20} />
          <span>Add to Calendar</span>
        </button>
        
        <button className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors duration-200 flex items-center justify-center space-x-2">
          <Icon name="ShareIcon" size={20} />
          <span>Share Details</span>
        </button>
        
        <button className="btn-secondary px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
          <Icon name="HomeIcon" size={20} />
          <span>Go to Dashboard</span>
        </button>
      </div>

      {/* Support Information */}
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="QuestionMarkCircleIcon" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Our support team is available 24/7 to assist with your booking
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <a href="tel:1-800-SERVICE" className="text-primary hover:text-primary/80 font-medium">
                Call: 1-800-SERVICE
              </a>
              <a href="mailto:support@servicehubpro.com" className="text-primary hover:text-primary/80 font-medium">
                Email: support@servicehubpro.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default BookingConfirmation;