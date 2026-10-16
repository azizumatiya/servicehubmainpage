import React, { useState } from 'react';
import { mockListings } from '../data';
import { Listing } from '../types';
import StatusBadge from './StatusBadge';

const ManageListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const statusOptions: Listing['status'][] = ['Pending', 'Approved', 'Rejected'];

  const updateListingStatus = (id: string, newStatus: Listing['status']) => {
    setListings(prev => prev.map(l => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Listing Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{listing.providerName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{listing.serviceCategory}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{listing.city}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-semibold">{listing.plan}</td>
                <td className="px-6 py-4"><StatusBadge status={listing.status} /></td>
                <td className="px-6 py-4">
                  <select
                    value={listing.status}
                    onChange={(e) => updateListingStatus(listing.id, e.target.value as Listing['status'])}
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
export default ManageListings;