import React, { useState } from 'react';
import { mockNotifications } from '../data';
import { Notification } from '../types';
import StatusBadge from './StatusBadge';

const ManageNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Manage Notifications</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search notifications by title or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Send New
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Recipient</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Sent Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Read</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification) => (
              <tr key={notification.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-6 py-4 text-sm text-foreground">{notification.title}</td>
                <td className="px-6 py-4 text-sm text-foreground">{notification.type}</td>
                <td className="px-6 py-4 text-sm text-foreground">{notification.recipient}</td>
                <td className="px-6 py-4"><StatusBadge status={notification.status} /></td>
                <td className="px-6 py-4 text-sm text-foreground">{notification.sentDate}</td>
                <td className="px-6 py-4 text-sm text-foreground">{notification.read ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:underline text-sm">Resend</button>
                    <button className="text-error hover:underline text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-text-secondary">No notifications found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageNotifications;