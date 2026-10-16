"use client";

import React, { useState, useEffect } from 'react';
import DashboardStats from './DashboardStats';
import ProviderVerificationQueue from './ProviderVerificationQueue';
import RevenueChart from './RevenueChart';
import DisputeManagement from './DisputeManagement';
import SystemHealthMonitor from './SystemHealthMonitor';
import AdminAddCategory from './AdminAddCategory';
import AdminProfile from './AdminProfile'; // Import the Admin Profile component
import ManageCustomer from './ManageCustomers'; // New import for Manage Customer
import ManageLeads from './ManageLeads'; // New import for Manage Leads
import ManageListings from './ManageListings'; // New import for Manage Listings (assuming camelCase for component name)
import ManageLocations from './ManageLocations'; // New import for Manage Locations
import ManageNotifications from './ManageNotifications'; // New import for Manage Notifications
import ManagePlans from './ManagePlans'; // New import for Manage Plans
import ManageReviews from './ManageReviews'; // New import for Manage Reviews
import ServiceAdd from './ServiceAdd';
import Icon from '@/components/ui/AppIcon';

interface AdminDashboardInteractiveProps {
  className?: string;
}

const AdminDashboardInteractive = ({ className = '' }: AdminDashboardInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted mb-6"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'ChartBarIcon' },
    { id: 'providers', label: 'Providers', icon: 'UserGroupIcon' },
    { id: 'disputes', label: 'Disputes', icon: 'ExclamationTriangleIcon' },
    { id: 'system', label: 'System Health', icon: 'HeartIcon' },
    { id: 'add-category', label: 'Add Category', icon: 'PlusIcon' },
    { id: 'admin-profile', label: 'Admin Profile', icon: 'UserCircleIcon' },
    // New tabs added
    { id: 'managecustomer', label: 'Manage Customers', icon: 'UsersIcon' },
    { id: 'manageleads', label: 'Manage Leads', icon: 'UserPlusIcon' },
    { id: 'managelisting', label: 'Manage Listings', icon: 'ClipboardDocumentListIcon' },
    { id: 'managelocations', label: 'Manage Locations', icon: 'MapPinIcon' },
    { id: 'managenotifications', label: 'Manage Notifications', icon: 'BellIcon' },
    // Additional new tabs
    { id: 'manageplans', label: 'Manage Plans', icon: 'CreditCardIcon' },
    { id: 'managereviews', label: 'Manage Reviews', icon: 'StarIcon' },
    { id: 'serviceadd', label: 'Service Add', icon: 'StarIcon' }

  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Admin Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground">Admin Control Center</h1>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary">System Operational</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              >
                <Icon name="BellIcon" size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="UserIcon" size={16} className="text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-text-secondary">Super Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab.icon as any} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RevenueChart />
              <ProviderVerificationQueue />
            </div>
            
            <DisputeManagement />
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="space-y-8">
            <ProviderVerificationQueue />
            
            <div className="bg-card rounded-lg border border-border shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Provider Management</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors duration-200">
                  Add Provider
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Icon name="UserPlusIcon" size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <p className="text-sm text-text-secondary">Total Providers</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Icon name="CheckBadgeIcon" size={32} className="text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">2,753</p>
                  <p className="text-sm text-text-secondary">Verified Providers</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Icon name="ClockIcon" size={32} className="text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="text-sm text-text-secondary">Pending Verification</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="space-y-8">
            <DisputeManagement />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <Icon name="ExclamationCircleIcon" size={32} className="text-error mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-text-secondary">Active Disputes</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <Icon name="CheckCircleIcon" size={32} className="text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">142</p>
                <p className="text-sm text-text-secondary">Resolved This Month</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <Icon name="ClockIcon" size={32} className="text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">2.3</p>
                <p className="text-sm text-text-secondary">Avg Resolution Days</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <Icon name="ChartBarIcon" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">94.7%</p>
                <p className="text-sm text-text-secondary">Resolution Rate</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-8">
            <SystemHealthMonitor />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent System Events</h3>
                <div className="space-y-3">
                  {[
                    { time: '07:15 AM', event: 'Database backup completed successfully', type: 'success' },
                    { time: '06:45 AM', event: 'Server load increased to 67%', type: 'warning' },
                    { time: '06:30 AM', event: 'Payment gateway maintenance completed', type: 'info' },
                    { time: '05:20 AM', event: 'CDN cache refreshed globally', type: 'info' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === 'success' ? 'bg-success' : 
                        event.type === 'warning' ? 'bg-warning' : 'bg-primary'
                      }`}></div>
                      <span className="text-xs text-text-secondary">{event.time}</span>
                      <span className="text-sm text-foreground flex-1">{event.event}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'System Backup', icon: 'CloudArrowUpIcon' },
                    { label: 'Clear Cache', icon: 'TrashIcon' },
                    { label: 'Restart Services', icon: 'ArrowPathIcon' },
                    { label: 'View Logs', icon: 'DocumentTextIcon' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      <Icon name={action.icon as any} size={24} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-category' && (
          <div className="space-y-8">
            <AdminAddCategory />
          </div>
        )}

        {activeTab === 'admin-profile' && (
          <div className="space-y-8">
            <AdminProfile />
          </div>
        )}

        {/* New tab content sections */}
        {activeTab === 'managecustomer' && (
          <div className="space-y-8">
            <ManageCustomer />
          </div>
        )}

        {activeTab === 'manageleads' && (
          <div className="space-y-8">
            <ManageLeads />
          </div>
        )}

        {activeTab === 'managelisting' && (
          <div className="space-y-8">
            <ManageListings />
          </div>
        )}

        {activeTab === 'managelocations' && (
          <div className="space-y-8">
            <ManageLocations />
          </div>
        )}

        {activeTab === 'managenotifications' && (
          <div className="space-y-8">
            <ManageNotifications />
          </div>
        )}

        {/* Additional new tab content sections */}
        {activeTab === 'manageplans' && (
          <div className="space-y-8">
            <ManagePlans />
          </div>
        )}

        {activeTab === 'managereviews' && (
          <div className="space-y-8">
            <ManageReviews />
          </div>
        )}

        {activeTab === 'serviceadd' && (
          <div className="space-y-8">
            <ServiceAdd />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardInteractive;