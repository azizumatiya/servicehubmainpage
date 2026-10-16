import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Lead {
  id: string;
  customerName: string;
  customerImage: string;
  customerImageAlt: string;
  serviceType: string;
  location: string;
  budget: string;
  urgency: 'Low' | 'Medium' | 'High';
  description: string;
  postedTime: string;
  qualityScore: number;
}

interface LeadCardProps {
  lead: Lead;
}

interface LeadManagementProps {
  className?: string;
}

const LeadCard = ({ lead }: LeadCardProps) => {
  const urgencyColors = {
    Low: 'bg-success/10 text-success',
    Medium: 'bg-warning/10 text-warning',
    High: 'bg-error/10 text-error'
  };

  const qualityScoreColor = lead.qualityScore >= 80 ? 'text-success' :
  lead.qualityScore >= 60 ? 'text-warning' : 'text-error';

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <AppImage
            src={lead.customerImage}
            alt={lead.customerImageAlt}
            className="w-12 h-12 rounded-full object-cover" />

          <div>
            <h3 className="font-semibold text-foreground">{lead.customerName}</h3>
            <p className="text-sm text-text-secondary">{lead.serviceType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[lead.urgency]}`}>
            {lead.urgency}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="StarIcon" size={16} className={qualityScoreColor} />
            <span className={`text-sm font-medium ${qualityScoreColor}`}>{lead.qualityScore}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="MapPinIcon" size={16} />
          <span>{lead.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="CurrencyDollarIcon" size={16} />
          <span>Budget: {lead.budget}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="ClockIcon" size={16} />
          <span>{lead.postedTime}</span>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{lead.description}</p>

      <div className="flex space-x-3">
        <button className="flex-1 btn-primary px-4 py-2 rounded-md text-sm font-medium">
          Send Quote
        </button>
        <button className="px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>);

};

const LeadManagement = ({ className = '' }: LeadManagementProps) => {
  const leads: Lead[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerImage: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
    customerImageAlt: "Professional woman with shoulder-length brown hair wearing navy blazer",
    serviceType: "Plumbing Repair",
    location: "Downtown, Seattle",
    budget: "$200 - $400",
    urgency: "High",
    description: "Kitchen sink is completely blocked and water is backing up. Need immediate repair as we have guests coming this weekend.",
    postedTime: "2 hours ago",
    qualityScore: 92
  },
  {
    id: "2",
    customerName: "Michael Chen",
    customerImage: "https://images.unsplash.com/photo-1599182002081-60947de0356b",
    customerImageAlt: "Asian man in white dress shirt smiling at camera in office setting",
    serviceType: "Electrical Work",
    location: "Bellevue, WA",
    budget: "$300 - $600",
    urgency: "Medium",
    description: "Need to install new ceiling fans in three bedrooms and update some old outlets to GFCI in the bathrooms.",
    postedTime: "4 hours ago",
    qualityScore: 85
  },
  {
    id: "3",
    customerName: "Emily Rodriguez",
    customerImage: "https://images.unsplash.com/photo-1599148018825-dab245bb2528",
    customerImageAlt: "Hispanic woman with curly hair wearing casual blue sweater outdoors",
    serviceType: "HVAC Maintenance",
    location: "Redmond, WA",
    budget: "$150 - $250",
    urgency: "Low",
    description: "Annual HVAC system maintenance and filter replacement. System is working fine but due for routine service.",
    postedTime: "1 day ago",
    qualityScore: 78
  }];


  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">New Leads</h2>
          <p className="text-sm text-text-secondary mt-1">
            {leads.length} opportunities available in your area
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
          <Icon name="AdjustmentsHorizontalIcon" size={16} />
          <span>Filter Leads</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {leads.map((lead) =>
        <LeadCard key={lead.id} lead={lead} />
        )}
      </div>

      <div className="text-center">
        <button className="px-6 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
          Load More Leads
        </button>
      </div>
    </div>);

};

export default LeadManagement;