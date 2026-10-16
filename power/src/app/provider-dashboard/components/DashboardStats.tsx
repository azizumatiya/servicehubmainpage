import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface DashboardStatsProps {
  className?: string;
}

const StatsCard = ({ title, value, change, changeType, icon }: StatsCardProps) => {
  const changeColor = changeType === 'positive' ? 'text-success' : 
                     changeType === 'negative' ? 'text-error' : 'text-text-secondary';
  
  const changeIcon = changeType === 'positive' ? 'ArrowUpIcon' : 
                    changeType === 'negative' ? 'ArrowDownIcon' : 'MinusIcon';

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center mt-2">
            <Icon name={changeIcon as any} size={16} className={`${changeColor} mr-1`} />
            <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
            <span className="text-sm text-text-secondary ml-1">vs last month</span>
          </div>
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon as any} size={24} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ className = '' }: DashboardStatsProps) => {
  const statsData = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+15.2%",
      changeType: "positive" as const,
      icon: "CurrencyDollarIcon"
    },
    {
      title: "Active Jobs",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: "BriefcaseIcon"
    },
    {
      title: "Customer Rating",
      value: "4.9",
      change: "+0.1",
      changeType: "positive" as const,
      icon: "StarIcon"
    },
    {
      title: "Response Rate",
      value: "98%",
      change: "-1%",
      changeType: "negative" as const,
      icon: "ClockIcon"
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${className}`}>
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;