import React, { useState } from 'react';
import { mockCustomers } from '../data'; // Updated path
import { Customer } from '../types';     // Updated path
import StatusBadge from './StatusBadge'; // Updated path

const ManageCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const statusOptions: Customer['status'][] = ['Active', 'Inactive', 'Suspended'];

  const handleStatusChange = (id: string, newStatus: Customer['status']) => {
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Customer Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Leads</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{customer.totalLeads}</td>
                <td className="px-6 py-4"><StatusBadge status={customer.status} /></td>
                <td className="px-6 py-4">
                  <select
                    value={customer.status}
                    onChange={(e) => handleStatusChange(customer.id, e.target.value as Customer['status'])}
                    className="p-2 border rounded text-xs"
                  >
                    {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageCustomers;