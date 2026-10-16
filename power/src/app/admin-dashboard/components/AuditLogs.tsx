import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockAuditLogs } from '../data';
import { AuditLog } from '../types';

const AuditLogs: React.FC = () => {
  const [logs] = useState<AuditLog[]>(mockAuditLogs);
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(l => l.user.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Audit Logs</h2>
      <div className="flex justify-end mb-4 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input className="pl-10 pr-4 py-2 border rounded-lg" placeholder="Filter user..." onChange={e => setFilter(e.target.value)} />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map(log => (
                <tr key={log.id}>
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4 font-medium">{log.user}</td>
                    <td className="px-6 py-4 text-blue-600">{log.action}</td>
                    <td className="px-6 py-4 text-gray-500">{log.details}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default AuditLogs;