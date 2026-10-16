import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  description: string;
  lastChecked: string;
  icon: string;
}

interface SystemHealthMonitorProps {
  className?: string;
}

const SystemHealthMonitor = ({ className = '' }: SystemHealthMonitorProps) => {
  const systemMetrics: SystemMetric[] = [
    {
      name: 'API Response Time',
      value: '245ms',
      status: 'healthy',
      description: 'Average response time across all endpoints',
      lastChecked: '2025-11-08T07:19:00Z',
      icon: 'BoltIcon'
    },
    {
      name: 'Database Performance',
      value: '98.7%',
      status: 'healthy',
      description: 'Query execution success rate',
      lastChecked: '2025-11-08T07:18:30Z',
      icon: 'CircleStackIcon'
    },
    {
      name: 'Payment Gateway',
      value: '99.2%',
      status: 'healthy',
      description: 'Transaction processing uptime',
      lastChecked: '2025-11-08T07:17:45Z',
      icon: 'CreditCardIcon'
    },
    {
      name: 'Server Load',
      value: '67%',
      status: 'warning',
      description: 'Current CPU and memory utilization',
      lastChecked: '2025-11-08T07:20:00Z',
      icon: 'ServerIcon'
    },
    {
      name: 'Email Service',
      value: '100%',
      status: 'healthy',
      description: 'Notification delivery success rate',
      lastChecked: '2025-11-08T07:16:20Z',
      icon: 'EnvelopeIcon'
    },
    {
      name: 'CDN Performance',
      value: '156ms',
      status: 'healthy',
      description: 'Global content delivery latency',
      lastChecked: '2025-11-08T07:19:15Z',
      icon: 'GlobeAltIcon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircleIcon';
      case 'warning':
        return 'ExclamationTriangleIcon';
      case 'critical':
        return 'XCircleIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      healthy: { color: 'bg-success/10 text-success border-success/20', label: 'Healthy' },
      warning: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Warning' },
      critical: { color: 'bg-error/10 text-error border-error/20', label: 'Critical' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
        <Icon name={getStatusIcon(status) as any} size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const formatLastChecked = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const overallHealth = systemMetrics.filter(m => m.status === 'healthy').length / systemMetrics.length * 100;

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="HeartIcon" size={24} className="text-success" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">System Health Monitor</h2>
              <p className="text-sm text-text-secondary">Real-time platform status overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-success">{overallHealth.toFixed(1)}%</p>
              <p className="text-xs text-text-secondary">Overall Health</p>
            </div>
            <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors duration-200">
              <Icon name="ArrowPathIcon" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={metric.icon as any} size={20} className={getStatusColor(metric.status)} />
                  <h3 className="text-sm font-medium text-foreground">{metric.name}</h3>
                </div>
                {getStatusBadge(metric.status)}
              </div>

              <div className="mb-3">
                <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                <p className="text-xs text-text-secondary">{metric.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon name="ClockIcon" size={12} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">
                    {formatLastChecked(metric.lastChecked)}
                  </span>
                </div>
                <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="ChartBarIcon" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="InformationCircleIcon" size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">System Status</p>
                <p className="text-xs text-text-secondary">All critical systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                View Details
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;