import React, { useState } from 'react';
import { mockLeads } from '../data';
import { Lead } from '../types';
import StatusBadge from './StatusBadge';

const ManageLeads: React.FC = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Lead Management</h2>
      <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4">{lead.service}</td>
                <td className="px-6 py-4">{lead.customerName}</td>
                <td className="px-6 py-4 font-bold text-green-600">₹{lead.price}</td>
                <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};
export default ManageLeads;