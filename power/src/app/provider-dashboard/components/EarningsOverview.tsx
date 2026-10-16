import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface EarningsData {
  month: string;
  earnings: number;
  jobs: number;
}

interface PaymentHistoryItem {
  id: string;
  date: string;
  customer: string;
  service: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing';
}

interface EarningsOverviewProps {
  className?: string;
}

const EarningsOverview = ({ className = '' }: EarningsOverviewProps) => {
  const earningsData: EarningsData[] = [
    { month: 'Jan', earnings: 8500, jobs: 12 },
    { month: 'Feb', earnings: 9200, jobs: 15 },
    { month: 'Mar', earnings: 7800, jobs: 11 },
    { month: 'Apr', earnings: 10500, jobs: 18 },
    { month: 'May', earnings: 11200, jobs: 20 },
    { month: 'Jun', earnings: 12450, jobs: 22 }
  ];

  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: "1",
      date: "Nov 7, 2024",
      customer: "Sarah Johnson",
      service: "Kitchen Plumbing Repair",
      amount: 285,
      status: "Completed"
    },
    {
      id: "2",
      date: "Nov 6, 2024",
      customer: "Michael Chen",
      service: "Electrical Installation",
      amount: 450,
      status: "Processing"
    },
    {
      id: "3",
      date: "Nov 5, 2024",
      customer: "Emily Rodriguez",
      service: "HVAC Maintenance",
      amount: 180,
      status: "Completed"
    },
    {
      id: "4",
      date: "Nov 4, 2024",
      customer: "David Wilson",
      service: "Bathroom Fixture Install",
      amount: 320,
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 text-success';
      case 'Processing':
        return 'bg-warning/10 text-warning';
      case 'Pending':
        return 'bg-muted text-text-secondary';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Earnings Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Earnings Overview</h3>
            <p className="text-sm text-text-secondary">Monthly earnings and job completion trends</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-md">
              6 Months
            </button>
            <button className="px-3 py-1 text-sm font-medium text-text-secondary hover:bg-muted rounded-md transition-colors duration-200">
              1 Year
            </button>
          </div>
        </div>

        <div className="w-full h-64" aria-label="Monthly Earnings Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name === 'earnings' ? 'Earnings' : 'Jobs']}
                labelStyle={{ color: '#1F2937' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="earnings" fill="#1E40AF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment History */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
            <p className="text-sm text-text-secondary">Your latest payment transactions</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Service</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-200">
                  <td className="py-3 px-4 text-sm text-foreground">{payment.date}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{payment.customer}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{payment.service}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground text-right">
                    ${payment.amount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
            View All Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview;