import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ProviderApplication {
  id: string;
  name: string;
  businessName: string;
  serviceCategory: string;
  submittedDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documentsCount: number;
  profileImage: string;
  alt: string;
  priority: 'high' | 'medium' | 'low';
}

interface ProviderVerificationQueueProps {
  className?: string;
}

const ProviderVerificationQueue = ({ className = '' }: ProviderVerificationQueueProps) => {
  const applications: ProviderApplication[] = [
  {
    id: 'PV001',
    name: 'Michael Rodriguez',
    businessName: 'Rodriguez Plumbing Services',
    serviceCategory: 'Plumbing',
    submittedDate: '2025-11-07',
    status: 'pending',
    documentsCount: 5,
    profileImage: "https://images.unsplash.com/photo-1659353591742-9fa64d94738e",
    alt: 'Professional Hispanic plumber in blue uniform holding wrench in workshop',
    priority: 'high'
  },
  {
    id: 'PV002',
    name: 'Sarah Chen',
    businessName: 'Elite Cleaning Solutions',
    serviceCategory: 'House Cleaning',
    submittedDate: '2025-11-06',
    status: 'under_review',
    documentsCount: 4,
    profileImage: "https://images.unsplash.com/photo-1680631626569-d163da98ff40",
    alt: 'Asian woman in professional cleaning uniform smiling with cleaning supplies',
    priority: 'medium'
  },
  {
    id: 'PV003',
    name: 'David Thompson',
    businessName: 'Thompson Electrical',
    serviceCategory: 'Electrical',
    submittedDate: '2025-11-05',
    status: 'pending',
    documentsCount: 6,
    profileImage: "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14",
    alt: 'Caucasian electrician in safety vest working with electrical panel',
    priority: 'high'
  },
  {
    id: 'PV004',
    name: 'Lisa Johnson',
    businessName: 'Garden Paradise Landscaping',
    serviceCategory: 'Landscaping',
    submittedDate: '2025-11-04',
    status: 'approved',
    documentsCount: 3,
    profileImage: "https://images.unsplash.com/photo-1706092378404-fce3060a2cb2",
    alt: 'African American woman landscaper kneeling in garden with plants and tools',
    priority: 'low'
  },
  {
    id: 'PV005',
    name: 'Robert Kim',
    businessName: 'Kim HVAC Solutions',
    serviceCategory: 'HVAC',
    submittedDate: '2025-11-03',
    status: 'rejected',
    documentsCount: 2,
    profileImage: "https://images.unsplash.com/photo-1669110300431-997298584446",
    alt: 'Asian HVAC technician in work uniform examining air conditioning unit',
    priority: 'medium'
  }];


  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending Review' },
      under_review: { color: 'bg-primary text-primary-foreground', label: 'Under Review' },
      approved: { color: 'bg-success text-success-foreground', label: 'Approved' },
      rejected: { color: 'bg-error text-error-foreground', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>);

  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Icon name="ExclamationCircleIcon" size={16} className="text-error" />;
      case 'medium':
        return <Icon name="ClockIcon" size={16} className="text-warning" />;
      default:
        return <Icon name="InformationCircleIcon" size={16} className="text-primary" />;
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="UserGroupIcon" size={24} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Provider Verification Queue</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
              View All
            </button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors duration-200">
              Bulk Actions
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Service Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {applications.map((application) =>
            <tr key={application.id} className="hover:bg-muted/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <AppImage
                      src={application.profileImage}
                      alt={application.alt}
                      className="w-10 h-10 rounded-full object-cover" />

                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground">{application.name}</p>
                        {getPriorityIcon(application.priority)}
                      </div>
                      <p className="text-sm text-text-secondary">{application.businessName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{application.serviceCategory}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(application.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name="DocumentTextIcon" size={16} className="text-text-secondary" />
                    <span className="text-sm text-foreground">{application.documentsCount} files</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {new Date(application.submittedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                      <Icon name="EyeIcon" size={16} />
                    </button>
                    <button className="p-1.5 text-success hover:bg-success/10 rounded-md transition-colors duration-200">
                      <Icon name="CheckIcon" size={16} />
                    </button>
                    <button className="p-1.5 text-error hover:bg-error/10 rounded-md transition-colors duration-200">
                      <Icon name="XMarkIcon" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

};

export default ProviderVerificationQueue;