import React, { useState } from 'react';
import { mockLocations } from '../data';
import { Location } from '../types';
import StatusBadge from './StatusBadge';

const ManageLocations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity && newState) {
      setLocations(prev => [...prev, { id: `LO${Date.now()}`, cityName: newCity, state: newState, providers: 0, status: 'Inactive' }]);
      setNewCity(''); setNewState('');
    }
  };

  const toggleLocationStatus = (id: string) => {
    setLocations(prev => prev.map(loc => (loc.id === id ? { ...loc, status: loc.status === 'Active' ? 'Inactive' : 'Active' } : loc)));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Location Management</h2>
      <form onSubmit={handleAddCity} className="mb-8 p-4 border bg-blue-50 rounded-lg flex gap-4 items-end">
        <input placeholder="City Name" value={newCity} onChange={e => setNewCity(e.target.value)} className="p-2 border rounded" required />
        <input placeholder="State Name" value={newState} onChange={e => setNewState(e.target.value)} className="p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
             <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
             </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.map((loc) => (
              <tr key={loc.id}>
                <td className="px-6 py-4">{loc.cityName}</td>
                <td className="px-6 py-4">{loc.state}</td>
                <td className="px-6 py-4"><StatusBadge status={loc.status} /></td>
                <td className="px-6 py-4">
                    <button onClick={() => toggleLocationStatus(loc.id)} className="text-blue-600 text-xs font-bold">
                        {loc.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageLocations;