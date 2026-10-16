import React from 'react';
import Icon from '@/components/ui/AppIcon';

const TrustBadges = () => {
  const trustMetrics = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Background Verified',
      description: 'All providers undergo comprehensive background checks',
      stat: '100%'
    },
    {
      icon: 'DocumentCheckIcon',
      title: 'Licensed & Insured',
      description: 'Verified licensing and insurance coverage',
      stat: '5K+'
    },
    {
      icon: 'StarIcon',
      title: 'Customer Satisfaction',
      description: 'Average rating across all completed services',
      stat: '4.9/5'
    },
    {
      icon: 'ClockIcon',
      title: 'On-Time Service',
      description: 'Services completed on schedule',
      stat: '98%'
    }
  ];

  const certifications = [
    {
      name: 'Better Business Bureau',
      rating: 'A+',
      description: 'Accredited Business'
    },
    {
      name: 'TrustPilot',
      rating: '4.8/5',
      description: 'Excellent Rating'
    },
    {
      name: 'Google Reviews',
      rating: '4.9/5',
      description: '10K+ Reviews'
    },
    {
      name: 'Angie\'s List',
      rating: 'Super Service',
      description: 'Award Winner'
    }
  ];

  return (
    <section className="py-16 bg-card border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={metric.icon as any} size={32} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {metric.stat}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {metric.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="border-t border-border pt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Trusted & Certified
            </h3>
            <p className="text-text-secondary">
              Recognized by leading industry organizations
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-primary mb-1">
                  {cert.rating}
                </div>
                <div className="font-semibold text-foreground text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {cert.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Security Features */}
        <div className="border-t border-border pt-12 mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Your Safety is Our Priority
            </h3>
            <p className="text-text-secondary">
              Comprehensive protection for every service interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4 p-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="LockClosedIcon" size={24} className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Secure Payments</h4>
                <p className="text-sm text-text-secondary">
                  All transactions protected with bank-level encryption and fraud monitoring
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="ExclamationTriangleIcon" size={24} className="text-warning" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Dispute Resolution</h4>
                <p className="text-sm text-text-secondary">
                  24/7 support team ready to resolve any service-related issues quickly
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="PhoneIcon" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Emergency Support</h4>
                <p className="text-sm text-text-secondary">
                  Immediate assistance available for urgent service needs and emergencies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;