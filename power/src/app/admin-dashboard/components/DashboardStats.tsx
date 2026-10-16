import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

interface DashboardStatsProps {
  className?: string;
}

const StatCard = ({ title, value, change, changeType, icon, color }: StatCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return 'ArrowUpIcon';
      case 'decrease':
        return 'ArrowDownIcon';
      default:
        return 'MinusIcon';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
    <div className="flex items-center justify-between">
        <div className="flex-1">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        <div className="flex items-center mt-2">
            <Icon 
            name={getChangeIcon() as any} 
            size={16} 
            className={getChangeColor()} 
            />
            <span className={`text-sm font-medium ml-1 ${getChangeColor()}`}>
            {change}
            </span>
            <span className="text-sm text-text-secondary ml-1">vs last month</span>
        </div>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
        <Icon name={icon as any} size={24} className="text-white" />
        </div>
    </div>
    </div>
  );
};

const DashboardStats = ({ className = '' }: DashboardStatsProps) => {
  const stats = [
    {
      title: 'Total Providers',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: 'UserGroupIcon',
      color: 'bg-primary'
    },
    {
      title: 'Active Customers',
      value: '18,432',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: 'UsersIcon',
      color: 'bg-secondary'
    },
    {
      title: 'Monthly Revenue',
      value: '$284,750',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: 'CurrencyDollarIcon',
      color: 'bg-success'
    },
    {
      title: 'Pending Verifications',
      value: '47',
      change: '-23.1%',
      changeType: 'decrease' as const,
      icon: 'ClockIcon',
      color: 'bg-warning'
    },
    {
      title: 'Completed Services',
      value: '12,847',
      change: '+18.7%',
      changeType: 'increase' as const,
      icon: 'CheckCircleIcon',
      color: 'bg-brand-primary'
    },
    {
      title: 'Active Disputes',
      value: '8',
      change: '-12.5%',
      changeType: 'decrease' as const,
      icon: 'ExclamationTriangleIcon',
      color: 'bg-error'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;