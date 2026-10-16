'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

interface QuickActionsSectionProps {
  actions: QuickAction[];
}

const QuickActionsSection = ({ actions }: QuickActionsSectionProps) => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <Icon name="BoltIcon" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group block p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon as any} size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection;