'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: string;
  type: 'lead' | 'message' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter = ({ className = '' }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "lead",
      title: "New Lead Available",
      message: "Sarah Johnson is looking for plumbing services in your area. Budget: $200-$400",
      time: "5 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "message",
      title: "Customer Message",
      message: "Michael Chen sent you a message about the electrical work quote",
      time: "1 hour ago",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "You received $285 for Kitchen Plumbing Repair from Sarah Johnson",
      time: "2 hours ago",
      read: true,
      priority: "medium"
    },
    {
      id: "4",
      type: "review",
      title: "New Review",
      message: "Emily Rodriguez left you a 5-star review for HVAC maintenance service",
      time: "1 day ago",
      read: true,
      priority: "low"
    },
    {
      id: "5",
      type: "system",
      title: "Profile Update Required",
      message: "Your insurance certificate expires in 30 days. Please update your documents",
      time: "2 days ago",
      read: false,
      priority: "high"
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return 'BriefcaseIcon';
      case 'message':
        return 'ChatBubbleLeftIcon';
      case 'payment':
        return 'CurrencyDollarIcon';
      case 'review':
        return 'StarIcon';
      case 'system':
        return 'ExclamationTriangleIcon';
      default:
        return 'BellIcon';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-error';
    if (type === 'payment') return 'text-success';
    if (type === 'review') return 'text-warning';
    return 'text-primary';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-error text-white text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              filter === 'all' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-muted'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              filter === 'unread' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-muted'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {unreadCount > 0 && (
        <div className="mb-4">
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="BellIcon" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                notification.read 
                  ? 'border-border bg-card' :'border-primary/20 bg-primary/5'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification.read ? 'bg-muted' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={getNotificationIcon(notification.type) as any} 
                    size={16} 
                    className={getNotificationColor(notification.type, notification.priority)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${
                      notification.read ? 'text-text-secondary' : 'text-foreground'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm mb-2 ${
                    notification.read ? 'text-text-secondary' : 'text-foreground'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{notification.time}</span>
                    {notification.type === 'lead' && (
                      <button className="text-xs text-primary hover:underline">
                        View Lead
                      </button>
                    )}
                    {notification.type === 'message' && (
                      <button className="text-xs text-primary hover:underline">
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredNotifications.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:underline">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;