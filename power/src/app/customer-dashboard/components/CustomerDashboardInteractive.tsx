'use client';

import React, { useState, useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import ActiveBookingsWidget from './ActiveBookingsWidget';
import BookingHistorySection from './BookingHistorySection';
import FavoriteProvidersSection from './FavoriteProvidersSection';
import PaymentMethodsSection from './PaymentMethodsSection';
import ReviewManagementSection from './ReviewManagementSection';
import ProfileManagementSection from './ProfileManagementSection';
import QuickActionsSection from './QuickActionsSection';

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

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  bankName?: string;
  isDefault: boolean;
}

interface PendingReview {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  completedDate: string;
  amount: number;
}

interface SubmittedReview {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  rating: number;
  comment: string;
  submittedDate: string;
  isPublic: boolean;
}

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profileImage: string;
  profileImageAlt: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const CustomerDashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock data
  const customerProfile: CustomerProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
    profileImageAlt: "Professional headshot of woman with shoulder-length brown hair smiling at camera",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true
  };

  const activeBookings: ActiveBooking[] = [
  {
    id: "1",
    serviceName: "Kitchen Plumbing Repair",
    providerName: "Mike's Plumbing Services",
    providerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa94b1b4-1762273621709.png",
    providerImageAlt: "Professional headshot of middle-aged man with gray beard in work uniform",
    scheduledDate: "Nov 10, 2024 at 2:00 PM",
    status: "confirmed",
    estimatedDuration: "2-3 hours",
    address: "123 Oak Street, San Francisco"
  },
  {
    id: "2",
    serviceName: "House Cleaning Service",
    providerName: "Sparkle Clean Co.",
    providerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png",
    providerImageAlt: "Professional headshot of woman with dark hair in cleaning service uniform",
    scheduledDate: "Nov 12, 2024 at 10:00 AM",
    status: "in-progress",
    estimatedDuration: "3-4 hours",
    address: "123 Oak Street, San Francisco"
  }];


  const bookingHistory: BookingHistory[] = [
  {
    id: "1",
    serviceName: "Electrical Outlet Installation",
    providerName: "PowerPro Electric",
    providerImage: "https://images.unsplash.com/photo-1595856619767-ab739fa7daae",
    providerImageAlt: "Professional headshot of electrician with safety helmet and work vest",
    completedDate: "Oct 28, 2024",
    amount: 150,
    rating: 5,
    status: "completed",
    category: "electrical"
  },
  {
    id: "2",
    serviceName: "Garden Landscaping",
    providerName: "Green Thumb Landscaping",
    providerImage: "https://images.unsplash.com/photo-1733055249088-679d26e44e01",
    providerImageAlt: "Professional headshot of landscaper wearing gardening gloves and sun hat",
    completedDate: "Oct 15, 2024",
    amount: 320,
    rating: 4,
    status: "completed",
    category: "landscaping"
  },
  {
    id: "3",
    serviceName: "Bathroom Deep Cleaning",
    providerName: "Sparkle Clean Co.",
    providerImage: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    providerImageAlt: "Professional headshot of woman with dark hair in cleaning service uniform",
    completedDate: "Oct 5, 2024",
    amount: 85,
    rating: 5,
    status: "completed",
    category: "cleaning"
  }];


  const favoriteProviders: FavoriteProvider[] = [
  {
    id: "1",
    name: "Mike's Plumbing Services",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa94b1b4-1762273621709.png",
    imageAlt: "Professional headshot of middle-aged man with gray beard in work uniform",
    category: "Plumbing",
    rating: 5,
    completedJobs: 127,
    responseTime: "15 minutes",
    isAvailable: true,
    specialties: ["Emergency Repairs", "Kitchen Plumbing", "Bathroom Fixtures"]
  },
  {
    id: "2",
    name: "PowerPro Electric",
    image: "https://images.unsplash.com/photo-1595856619767-ab739fa7daae",
    imageAlt: "Professional headshot of electrician with safety helmet and work vest",
    category: "Electrical",
    rating: 5,
    completedJobs: 89,
    responseTime: "30 minutes",
    isAvailable: true,
    specialties: ["Outlet Installation", "Lighting", "Panel Upgrades"]
  },
  {
    id: "3",
    name: "Sparkle Clean Co.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png",
    imageAlt: "Professional headshot of woman with dark hair in cleaning service uniform",
    category: "Cleaning",
    rating: 4,
    completedJobs: 203,
    responseTime: "1 hour",
    isAvailable: false,
    specialties: ["Deep Cleaning", "Move-in/out", "Regular Maintenance"]
  }];


  const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true
  },
  {
    id: "2",
    type: "card",
    last4: "8888",
    brand: "mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  },
  {
    id: "3",
    type: "paypal",
    email: "sarah.johnson@email.com",
    isDefault: false
  }];


  const pendingReviews: PendingReview[] = [
  {
    id: "1",
    serviceName: "Kitchen Plumbing Repair",
    providerName: "Mike's Plumbing Services",
    providerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa94b1b4-1762273621709.png",
    providerImageAlt: "Professional headshot of middle-aged man with gray beard in work uniform",
    completedDate: "Nov 8, 2024",
    amount: 180
  }];


  const submittedReviews: SubmittedReview[] = [
  {
    id: "1",
    serviceName: "Electrical Outlet Installation",
    providerName: "PowerPro Electric",
    providerImage: "https://images.unsplash.com/photo-1595856619767-ab739fa7daae",
    providerImageAlt: "Professional headshot of electrician with safety helmet and work vest",
    rating: 5,
    comment: "Excellent work! The electrician was professional, punctual, and cleaned up after the job. Highly recommend for any electrical work.",
    submittedDate: "Oct 29, 2024",
    isPublic: true
  },
  {
    id: "2",
    serviceName: "Garden Landscaping",
    providerName: "Green Thumb Landscaping",
    providerImage: "https://images.unsplash.com/photo-1733055249088-679d26e44e01",
    providerImageAlt: "Professional headshot of landscaper wearing gardening gloves and sun hat",
    rating: 4,
    comment: "Great landscaping work. The team transformed our backyard beautifully. Only minor issue was they finished a day later than expected.",
    submittedDate: "Oct 16, 2024",
    isPublic: true
  }];


  const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Book Service",
    description: "Find and book a new service",
    icon: "PlusCircleIcon",
    href: "/service-booking-flow",
    color: "bg-primary"
  },
  {
    id: "2",
    title: "Emergency Service",
    description: "Get immediate help",
    icon: "ExclamationTriangleIcon",
    href: "/service-booking-flow?emergency=true",
    color: "bg-red-500"
  },
  {
    id: "3",
    title: "Browse Providers",
    description: "Explore service providers",
    icon: "UserGroupIcon",
    href: "/provider-profiles",
    color: "bg-secondary"
  },
  {
    id: "4",
    title: "Help Center",
    description: "Get support and answers",
    icon: "QuestionMarkCircleIcon",
    href: "/help",
    color: "bg-accent"
  }];


  // Event handlers
  const handleBookNow = (providerId: string) => {
    if (!isHydrated) return;
    console.log('Booking provider:', providerId);
    // Navigate to booking flow with provider pre-selected
  };

  const handleRemoveFavorite = (providerId: string) => {
    if (!isHydrated) return;
    console.log('Removing favorite provider:', providerId);
    // Remove provider from favorites
  };

  const handleAddPaymentMethod = () => {
    if (!isHydrated) return;
    console.log('Adding payment method');
    // Open payment method form
  };

  const handleSetDefaultPayment = (methodId: string) => {
    if (!isHydrated) return;
    console.log('Setting default payment method:', methodId);
    // Update default payment method
  };

  const handleRemovePaymentMethod = (methodId: string) => {
    if (!isHydrated) return;
    console.log('Removing payment method:', methodId);
    // Remove payment method
  };

  const handleSubmitReview = (reviewId: string, rating: number, comment: string) => {
    if (!isHydrated) return;
    console.log('Submitting review:', { reviewId, rating, comment });
    // Submit review
  };

  const handleEditReview = (reviewId: string, rating: number, comment: string) => {
    if (!isHydrated) return;
    console.log('Editing review:', { reviewId, rating, comment });
    // Edit existing review
  };

  const handleUpdateProfile = (profile: CustomerProfile) => {
    if (!isHydrated) return;
    console.log('Updating profile:', profile);
    // Update customer profile
  };

  const handleChangePassword = () => {
    if (!isHydrated) return;
    console.log('Changing password');
    // Open password change form
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <WelcomeSection
            customerName={customerProfile.name}
            totalBookings={bookingHistory.length + activeBookings.length}
            activeBookings={activeBookings.length}
            favoriteProviders={favoriteProviders.length} />


          {/* Quick Actions */}
          <QuickActionsSection actions={quickActions} />

          {/* Active Bookings and Favorites */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActiveBookingsWidget bookings={activeBookings} />
            <FavoriteProvidersSection
              providers={favoriteProviders}
              onBookNow={handleBookNow}
              onRemoveFavorite={handleRemoveFavorite} />

          </div>

          {/* Booking History */}
          <BookingHistorySection bookings={bookingHistory} />

          {/* Payment Methods and Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PaymentMethodsSection
              paymentMethods={paymentMethods}
              onAddPaymentMethod={handleAddPaymentMethod}
              onSetDefault={handleSetDefaultPayment}
              onRemoveMethod={handleRemovePaymentMethod} />

            <ReviewManagementSection
              pendingReviews={pendingReviews}
              submittedReviews={submittedReviews}
              onSubmitReview={handleSubmitReview}
              onEditReview={handleEditReview} />

          </div>

          {/* Profile Management */}
          <ProfileManagementSection
            profile={customerProfile}
            onUpdateProfile={handleUpdateProfile}
            onChangePassword={handleChangePassword} />

        </div>
      </div>
    </div>);

};

export default CustomerDashboardInteractive;