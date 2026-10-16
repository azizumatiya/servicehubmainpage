'use client';

import { useState, useEffect } from 'react';
import BookingSteps from './BookingSteps';
import ServiceDetailsForm from './ServiceDetailsForm';
import ProviderSelection from './ProviderSelection';
import SchedulingCalendar from './SchedulingCalendar';
import PaymentForm from './PaymentForm';
import BookingConfirmation from './BookingConfirmation';

interface BookingData {
  serviceDetails?: any;
  selectedProvider?: string;
  schedulingData?: any;
  paymentData?: any;
}

const BookingFlowInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleStepNext = (stepData: any) => {
    switch (currentStep) {
      case 1:
        setBookingData(prev => ({ ...prev, serviceDetails: stepData }));
        setCurrentStep(2);
        break;
      case 2:
        setBookingData(prev => ({ ...prev, selectedProvider: stepData }));
        setCurrentStep(3);
        break;
      case 3:
        setBookingData(prev => ({ ...prev, schedulingData: stepData }));
        setCurrentStep(4);
        break;
      case 4:
        setBookingData(prev => ({ ...prev, paymentData: stepData }));
        setCurrentStep(5);
        break;
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceDetailsForm onNext={handleStepNext} />;
      case 2:
        return (
          <ProviderSelection 
            onNext={handleStepNext} 
            onBack={handleStepBack}
          />
        );
      case 3:
        return (
          <SchedulingCalendar 
            onNext={handleStepNext} 
            onBack={handleStepBack}
          />
        );
      case 4:
        return (
          <PaymentForm 
            onNext={handleStepNext} 
            onBack={handleStepBack}
          />
        );
      case 5:
        return <BookingConfirmation bookingData={bookingData} />;
      default:
        return <ServiceDetailsForm onNext={handleStepNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Service</h1>
          <p className="text-text-secondary text-lg">
            Find and book verified professionals for your home and business needs
          </p>
        </div>

        {/* Progress Steps */}
        <BookingSteps currentStep={currentStep} />

        {/* Current Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default BookingFlowInteractive;