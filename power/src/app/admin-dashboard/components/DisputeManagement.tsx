import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Dispute {
  id: string;
  caseNumber: string;
  customer: {
    name: string;
    image: string;
    alt: string;
  };
  provider: {
    name: string;
    businessName: string;
    image: string;
    alt: string;
  };
  service: string;
  amount: number;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  priority: 'high' | 'medium' | 'low';
  createdDate: string;
  lastUpdate: string;
  description: string;
}

interface DisputeManagementProps {
  className?: string;
}

const DisputeManagement = ({ className = '' }: DisputeManagementProps) => {
  const disputes: Dispute[] = [
  {
    id: 'DSP001',
    caseNumber: 'CASE-2025-1108-001',
    customer: {
      name: 'Jennifer Martinez',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17fb1ec34-1762274177283.png",
      alt: 'Professional Hispanic woman with long dark hair in business attire smiling'
    },
    provider: {
      name: 'Mike Johnson',
      businessName: 'Johnson Plumbing Co.',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_19ace8de8-1762273894433.png",
      alt: 'Middle-aged Caucasian plumber in work uniform with tools'
    },
    service: 'Emergency Plumbing Repair',
    amount: 485,
    status: 'investigating',
    priority: 'high',
    createdDate: '2025-11-06',
    lastUpdate: '2025-11-08',
    description: 'Customer claims work was incomplete and caused additional damage'
  },
  {
    id: 'DSP002',
    caseNumber: 'CASE-2025-1107-002',
    customer: {
      name: 'Robert Chen',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ed14a690-1762273796947.png",
      alt: 'Asian businessman with beard in dark suit looking professional'
    },
    provider: {
      name: 'Sarah Williams',
      businessName: 'Elite House Cleaning',
      image: "https://images.unsplash.com/photo-1722461080801-bd76c01db48c",
      alt: 'African American woman in cleaning uniform holding spray bottle and cloth'
    },
    service: 'Deep House Cleaning',
    amount: 225,
    status: 'open',
    priority: 'medium',
    createdDate: '2025-11-05',
    lastUpdate: '2025-11-07',
    description: 'Payment dispute - customer claims service was not as described'
  },
  {
    id: 'DSP003',
    caseNumber: 'CASE-2025-1104-003',
    customer: {
      name: 'Lisa Thompson',
      image: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
      alt: 'Young Caucasian woman with blonde hair smiling in casual attire'
    },
    provider: {
      name: 'Carlos Rodriguez',
      businessName: 'Rodriguez Landscaping',
      image: "https://images.unsplash.com/photo-1556606884-cdcaacdbe3c0",
      alt: 'Hispanic landscaper in work clothes kneeling in garden with plants'
    },
    service: 'Lawn Maintenance',
    amount: 150,
    status: 'resolved',
    priority: 'low',
    createdDate: '2025-11-02',
    lastUpdate: '2025-11-06',
    description: 'Scheduling conflict resolved through mediation'
  }];


  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { color: 'bg-error text-error-foreground', label: 'Open', icon: 'ExclamationCircleIcon' },
      investigating: { color: 'bg-warning text-warning-foreground', label: 'Investigating', icon: 'MagnifyingGlassIcon' },
      resolved: { color: 'bg-success text-success-foreground', label: 'Resolved', icon: 'CheckCircleIcon' },
      escalated: { color: 'bg-destructive text-destructive-foreground', label: 'Escalated', icon: 'ArrowUpIcon' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon as any} size={12} className="mr-1" />
        {config.label}
      </span>);

  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: 'bg-error/10 text-error border-error/20', label: 'High Priority' },
      medium: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Medium Priority' },
      low: { color: 'bg-muted text-text-secondary border-border', label: 'Low Priority' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>);

  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="ExclamationTriangleIcon" size={24} className="text-warning" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Dispute Management</h2>
              <p className="text-sm text-text-secondary">Active cases requiring attention</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
              Export Report
            </button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors duration-200">
              Create Case
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {disputes.map((dispute) =>
          <div key={dispute.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(dispute.status)}
                    {getPriorityBadge(dispute.priority)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">${dispute.amount}</p>
                  <p className="text-xs text-text-secondary">{dispute.caseNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-3">
                  <AppImage
                  src={dispute.customer.image}
                  alt={dispute.customer.alt}
                  className="w-10 h-10 rounded-full object-cover" />

                  <div>
                    <p className="text-sm font-medium text-foreground">Customer</p>
                    <p className="text-sm text-text-secondary">{dispute.customer.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <AppImage
                  src={dispute.provider.image}
                  alt={dispute.provider.alt}
                  className="w-10 h-10 rounded-full object-cover" />

                  <div>
                    <p className="text-sm font-medium text-foreground">Provider</p>
                    <p className="text-sm text-text-secondary">{dispute.provider.name}</p>
                    <p className="text-xs text-text-secondary">{dispute.provider.businessName}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-foreground mb-1">Service: {dispute.service}</p>
                <p className="text-sm text-text-secondary">{dispute.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Created: {new Date(dispute.createdDate).toLocaleDateString()}</span>
                  <span>Updated: {new Date(dispute.lastUpdate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                    <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  </button>
                  <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                    <Icon name="DocumentTextIcon" size={16} />
                  </button>
                  <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                    <Icon name="EyeIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-text-secondary">Showing 3 of 8 active disputes</p>
          <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
            View All Disputes
          </button>
        </div>
      </div>
    </div>);

};

export default DisputeManagement;