import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'suspended';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const badgeStyles = {
    active: 'bg-success text-success-foreground',
    inactive: 'bg-muted text-muted-foreground',
    pending: 'bg-warning text-warning-foreground',
    suspended: 'bg-error text-error-foreground',
  };

  const badgeText = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
  };

  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badgeStyles[status]}`}
    >
      {badgeText[status]}
    </span>
  );
};

export default StatusBadge;