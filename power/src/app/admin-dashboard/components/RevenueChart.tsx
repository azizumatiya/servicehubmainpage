import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface ChartData {
  month: string;
  revenue: number;
  transactions: number;
  growth: number;
}

interface RevenueChartProps {
  className?: string;
}

const RevenueChart = ({ className = '' }: RevenueChartProps) => {
  const chartData: ChartData[] = [
    { month: 'Jan', revenue: 185000, transactions: 1240, growth: 8.2 },
    { month: 'Feb', revenue: 198000, transactions: 1380, growth: 7.1 },
    { month: 'Mar', revenue: 215000, transactions: 1520, growth: 8.6 },
    { month: 'Apr', revenue: 232000, transactions: 1680, growth: 7.9 },
    { month: 'May', revenue: 248000, transactions: 1820, growth: 6.9 },
    { month: 'Jun', revenue: 265000, transactions: 1950, growth: 6.9 },
    { month: 'Jul', revenue: 278000, transactions: 2080, growth: 4.9 },
    { month: 'Aug', revenue: 295000, transactions: 2240, growth: 6.1 },
    { month: 'Sep', revenue: 312000, transactions: 2380, growth: 5.8 },
    { month: 'Oct', revenue: 328000, transactions: 2520, growth: 5.1 },
    { month: 'Nov', revenue: 345000, transactions: 2680, growth: 5.2 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-modal p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`${label} 2025`}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">
              Revenue: ${payload[0].value.toLocaleString()}
            </p>
            <p className="text-sm text-secondary">
              Transactions: {payload[1]?.value.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="ChartBarIcon" size={24} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Revenue Analytics</h2>
              <p className="text-sm text-text-secondary">Monthly performance overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
            <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors duration-200">
              <Icon name="ArrowDownTrayIcon" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$2.84M</p>
                <div className="flex items-center mt-1">
                  <Icon name="ArrowUpIcon" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success ml-1">+15.3%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <Icon name="CurrencyDollarIcon" size={20} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Avg. Transaction</p>
                <p className="text-2xl font-bold text-foreground">$127</p>
                <div className="flex items-center mt-1">
                  <Icon name="ArrowUpIcon" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success ml-1">+3.2%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="CreditCardIcon" size={20} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Commission Rate</p>
                <p className="text-2xl font-bold text-foreground">8.5%</p>
                <div className="flex items-center mt-1">
                  <Icon name="MinusIcon" size={14} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-secondary ml-1">No change</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Icon name="PercentBadgeIcon" size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-80" aria-label="Monthly Revenue Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#1E40AF" 
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;