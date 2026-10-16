import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CallToActionProps {
  onGetStartedClick: () => void;
  onJoinProviderClick: () => void;
}

const CallToAction = ({ onGetStartedClick, onJoinProviderClick }: CallToActionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-brand-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ServiceHub Pro for all their service needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStartedClick}
              className="bg-accent hover:bg-accent/90 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Find Services Now
            </button>
            <button
              onClick={onJoinProviderClick}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30"
            >
              Become a Provider
            </button>
          </div>
        </div>
        
        {/* Dual CTA Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Customers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="UserIcon" size={32} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Customers</h3>
            <ul className="space-y-3 text-white/90 mb-6">
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Instant access to verified professionals
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Transparent pricing and reviews
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                24/7 customer support
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Satisfaction guarantee
              </li>
            </ul>
            <button
              onClick={onGetStartedClick}
              className="w-full bg-accent hover:bg-accent/90 text-gray-800 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Get Started Today
            </button>
          </div>
          
          {/* For Providers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="BriefcaseIcon" size={32} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Service Providers</h3>
            <ul className="space-y-3 text-white/90 mb-6">
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Steady stream of qualified leads
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Flexible scheduling and pricing
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Fast, secure payments
              </li>
              <li className="flex items-center">
                <Icon name="CheckIcon" size={16} className="text-accent mr-3 flex-shrink-0" />
                Business growth tools
              </li>
            </ul>
            <button
              onClick={onJoinProviderClick}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300 border border-white/30"
            >
              Join Our Network
            </button>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-white/80 mb-4">
            Questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center">
              <Icon name="PhoneIcon" size={20} className="text-accent mr-2" />
              <span>1-800-SERVICE</span>
            </div>
            <div className="flex items-center">
              <Icon name="EnvelopeIcon" size={20} className="text-accent mr-2" />
              <span>support@servicehubpro.com</span>
            </div>
            <div className="flex items-center">
              <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-accent mr-2" />
              <span>Live Chat Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;