
'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ProfileSection {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

interface ProfileProgressProps {
  className?: string;
}

const ProfileProgress = ({ className = '' }: ProfileProgressProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const profileSections: ProfileSection[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Complete your business name, contact details, and service areas",
    completed: true,
    icon: "UserIcon"
  },
  {
    id: "credentials",
    title: "Credentials & Licenses",
    description: "Upload your professional licenses, certifications, and insurance documents",
    completed: true,
    icon: "DocumentCheckIcon"
  },
  {
    id: "portfolio",
    title: "Portfolio & Gallery",
    description: "Add photos of your completed work to showcase your expertise",
    completed: false,
    icon: "PhotoIcon"
  },
  {
    id: "pricing",
    title: "Service Pricing",
    description: "Set your rates and pricing structure for different services",
    completed: false,
    icon: "CurrencyDollarIcon"
  },
  {
    id: "availability",
    title: "Availability Settings",
    description: "Configure your working hours and availability preferences",
    completed: true,
    icon: "CalendarIcon"
  }];


  const completedSections = profileSections.filter((section) => section.completed).length;
  const completionPercentage = Math.round(completedSections / profileSections.length * 100);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Completion</h3>
          <p className="text-sm text-text-secondary">
            {completedSections} of {profileSections.length} sections completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
          <div className="text-xs text-text-secondary">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="space-y-3">
        {profileSections.map((section) =>
        <div key={section.id} className="border border-border rounded-lg overflow-hidden">
            <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors duration-200">

              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              section.completed ? 'bg-success text-white' : 'bg-muted text-text-secondary'}`
              }>
                  {section.completed ?
                <Icon name="CheckIcon" size={16} /> :

                <Icon name={section.icon as any} size={16} />
                }
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-foreground">{section.title}</h4>
                  <p className="text-sm text-text-secondary">{section.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {section.completed &&
              <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                    Complete
                  </span>
              }
                <Icon
                name={expandedSection === section.id ? "ChevronUpIcon" : "ChevronDownIcon"}
                size={16}
                className="text-text-secondary" />

              </div>
            </button>

            {expandedSection === section.id &&
          <div className="px-4 pb-4 border-t border-border bg-muted/30">
                <div className="pt-4">
                  {section.id === "basic-info" &&
              <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <AppImage
                    src="https://images.unsplash.com/photo-1622612017516-54223966d2cd"
                    alt="Professional contractor headshot with hard hat and safety vest"
                    className="w-12 h-12 rounded-full object-cover" />

                        <div>
                          <p className="font-medium text-foreground">Mike's Professional Services</p>
                          <p className="text-sm text-text-secondary">Licensed Plumber & Electrician</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">Edit Profile</button>
                    </div>
              }

                  {section.id === "credentials" &&
              <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="CheckCircleIcon" size={16} className="text-success" />
                          <span className="text-foreground">Plumbing License</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="CheckCircleIcon" size={16} className="text-success" />
                          <span className="text-foreground">Insurance Certificate</span>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">Manage Documents</button>
                    </div>
              }

                  {section.id === "portfolio" && !section.completed &&
              <div className="space-y-3">
                      <p className="text-sm text-text-secondary">
                        Add photos of your best work to attract more customers
                      </p>
                      <button className="btn-primary px-4 py-2 rounded-md text-sm font-medium">
                        Upload Photos
                      </button>
                    </div>
              }

                  {section.id === "pricing" && !section.completed &&
              <div className="space-y-3">
                      <p className="text-sm text-text-secondary">
                        Set competitive rates for your services to get more bookings
                      </p>
                      <button className="btn-primary px-4 py-2 rounded-md text-sm font-medium">
                        Set Pricing
                      </button>
                    </div>
              }

                  {section.id === "availability" &&
              <div className="space-y-3">
                      <div className="text-sm">
                        <p className="text-foreground font-medium">Current Schedule:</p>
                        <p className="text-text-secondary">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-text-secondary">Saturday: 9:00 AM - 4:00 PM</p>
                      </div>
                      <button className="text-sm text-primary hover:underline">Update Schedule</button>
                    </div>
              }
                </div>
              </div>
          }
          </div>
        )}
      </div>

      {completionPercentage < 100 &&
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="LightBulbIcon" size={20} className="text-primary mt-0.5" />
            <div>
              <h5 className="font-medium text-foreground mb-1">Complete your profile to get more leads!</h5>
              <p className="text-sm text-text-secondary">
                Providers with complete profiles receive 3x more customer inquiries.
              </p>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ProfileProgress;