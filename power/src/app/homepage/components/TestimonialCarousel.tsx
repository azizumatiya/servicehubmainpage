'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  service: string;
  review: string;
  date: string;
  providerName: string;
}

const TestimonialCarousel = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Walsh',
    location: 'Manhattan, NY',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17e878dda-1762273600612.png",
    alt: 'Professional woman with blonde hair in business attire smiling at camera',
    rating: 5,
    service: 'House Cleaning',
    review: 'Sarah and her team did an absolutely amazing job cleaning our apartment. They were thorough, professional, and left everything spotless. I\'ve already booked them for monthly service!',
    date: '2025-10-15',
    providerName: 'Sarah Chen'
  },
  {
    id: '2',
    name: 'Robert Kim',
    location: 'Brooklyn, NY',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1207b8843-1762274250386.png",
    alt: 'Asian man in casual shirt smiling outdoors with city background',
    rating: 5,
    service: 'Plumbing Repair',
    review: 'Michael responded within an hour of my emergency call and fixed our burst pipe quickly and efficiently. His pricing was fair and he explained everything clearly. Highly recommend!',
    date: '2025-10-28',
    providerName: 'Michael Rodriguez'
  },
  {
    id: '3',
    name: 'Lisa Thompson',
    location: 'Queens, NY',
    image: "https://images.unsplash.com/photo-1589332911105-a6b59f2e4c4b",
    alt: 'Woman with curly hair wearing glasses and casual sweater in home setting',
    rating: 5,
    service: 'Electrical Work',
    review: 'David installed smart switches throughout our home and upgraded our electrical panel. His work was meticulous and he made sure everything was up to code. Excellent service!',
    date: '2025-11-02',
    providerName: 'David Thompson'
  },
  {
    id: '4',
    name: 'Carlos Martinez',
    location: 'Bronx, NY',
    image: "https://images.unsplash.com/photo-1655882752624-7c01aa90fa27",
    alt: 'Hispanic man with beard in casual clothing smiling in outdoor garden setting',
    rating: 5,
    service: 'Landscaping',
    review: 'Maria transformed our backyard into a beautiful garden oasis. Her design skills and attention to detail are exceptional. Our neighbors keep asking who did the work!',
    date: '2025-10-20',
    providerName: 'Maria Santos'
  }];


  const nextTestimonial = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="StarIcon"
      size={16}
      variant="solid"
      className="text-accent" />

    );
  };

  if (!isHydrated) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-8 bg-muted rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-muted rounded animate-pulse mb-8 max-w-md mx-auto"></div>
            <div className="card p-8">
              <div className="h-32 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-text-secondary">
            Real reviews from satisfied customers across the platform
          </p>
        </div>
        
        {/* Testimonial Card */}
        <div className="relative">
          <div className="card p-8 md:p-12 text-center">
            {/* Quote Icon */}
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-primary" />
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-center mb-6">
              {renderStars(currentTestimonial.rating)}
            </div>
            
            {/* Review Text */}
            <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              "{currentTestimonial.review}"
            </blockquote>
            
            {/* Customer Info */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <AppImage
                  src={currentTestimonial.image}
                  alt={currentTestimonial.alt}
                  className="w-full h-full object-cover" />

              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-text-secondary">
                  {currentTestimonial.location}
                </div>
              </div>
            </div>
            
            {/* Service Info */}
            <div className="text-sm text-text-secondary">
              <span className="font-medium">{currentTestimonial.service}</span> by {currentTestimonial.providerName}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card hover:bg-muted border border-border rounded-full flex items-center justify-center transition-all duration-200 shadow-md">

            <Icon name="ChevronLeftIcon" size={20} className="text-text-secondary" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card hover:bg-muted border border-border rounded-full flex items-center justify-center transition-all duration-200 shadow-md">

            <Icon name="ChevronRightIcon" size={20} className="text-text-secondary" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {testimonials.map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === currentIndex ? 'bg-primary' : 'bg-muted'}`
            } />

          )}
        </div>
      </div>
    </section>);

};

export default TestimonialCarousel;