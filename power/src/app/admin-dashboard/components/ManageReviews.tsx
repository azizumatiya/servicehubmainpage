import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { mockReviews } from '../data';
import { Review } from '../types';
import StatusBadge from './StatusBadge';

const ManageReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const toggleReviewStatus = (id: string) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, status: r.status === 'Published' ? 'Hidden' : 'Published' } : r)));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Reviews & Ratings</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold">{review.listingName} ({review.rating} <Star className="inline h-4 w-4 fill-yellow-400 text-yellow-400" />)</p>
                <p className="text-sm text-gray-600">User: {review.customerName}</p>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <StatusBadge status={review.status} />
                <button onClick={() => toggleReviewStatus(review.id)} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500 text-white">
                  {review.status === 'Published' ? 'Hide' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ManageReviews;