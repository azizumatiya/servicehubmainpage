import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { mockPlans } from '../data';
import { Plan } from '../types';

const ManagePlans: React.FC = () => {
  const [plans] = useState<Plan[]>(mockPlans);
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="p-6 border rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-700">{plan.name}</h3>
            <p className="text-4xl font-extrabold my-4">₹{plan.price}</p>
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2"/> {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ManagePlans;