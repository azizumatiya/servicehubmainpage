'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface PendingReview {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  completedDate: string;
  amount: number;
}

interface SubmittedReview {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  providerImageAlt: string;
  rating: number;
  comment: string;
  submittedDate: string;
  isPublic: boolean;
}

interface ReviewManagementSectionProps {
  pendingReviews: PendingReview[];
  submittedReviews: SubmittedReview[];
  onSubmitReview: (reviewId: string, rating: number, comment: string) => void;
  onEditReview: (reviewId: string, rating: number, comment: string) => void;
}

const ReviewManagementSection = ({ 
  pendingReviews, 
  submittedReviews, 
  onSubmitReview, 
  onEditReview 
}: ReviewManagementSectionProps) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'submitted'>('pending');
  const [reviewForm, setReviewForm] = useState<{
    id: string;
    rating: number;
    comment: string;
    isEditing: boolean;
  } | null>(null);

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => interactive && onRatingChange && onRatingChange(index + 1)}
        disabled={!interactive}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
      >
        <Icon
          name="StarIcon"
          size={20}
          className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
          variant={index < rating ? 'solid' : 'outline'}
        />
      </button>
    ));
  };

  const handleSubmitReview = () => {
    if (reviewForm) {
      if (reviewForm.isEditing) {
        onEditReview(reviewForm.id, reviewForm.rating, reviewForm.comment);
      } else {
        onSubmitReview(reviewForm.id, reviewForm.rating, reviewForm.comment);
      }
      setReviewForm(null);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Reviews & Ratings</h2>
        <Icon name="StarIcon" size={24} className="text-yellow-400" variant="solid" />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'pending' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Pending Reviews ({pendingReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('submitted')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'submitted' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Reviews ({submittedReviews.length})
        </button>
      </div>

      {/* Pending Reviews Tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingReviews.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="PencilSquareIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No pending reviews</p>
            </div>
          ) : (
            pendingReviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AppImage
                      src={review.providerImage}
                      alt={review.providerImageAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{review.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">by {review.providerName}</p>
                      <p className="text-xs text-muted-foreground">Completed on {review.completedDate}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-foreground">${review.amount}</span>
                </div>

                {reviewForm?.id === review.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                      <div className="flex items-center space-x-1">
                        {renderStars(reviewForm.rating, true, (rating) => 
                          setReviewForm({ ...reviewForm, rating })
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Comment</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="Share your experience with this service..."
                        className="input w-full h-24 resize-none"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSubmitReview}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
                      >
                        Submit Review
                      </button>
                      <button
                        onClick={() => setReviewForm(null)}
                        className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReviewForm({ id: review.id, rating: 5, comment: '', isEditing: false })}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
                  >
                    Write Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Submitted Reviews Tab */}
      {activeTab === 'submitted' && (
        <div className="space-y-4">
          {submittedReviews.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ChatBubbleLeftEllipsisIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reviews submitted yet</p>
            </div>
          ) : (
            submittedReviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <AppImage
                      src={review.providerImage}
                      alt={review.providerImageAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{review.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">by {review.providerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      review.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {review.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">Submitted on {review.submittedDate}</span>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                </div>
                
                <button
                  onClick={() => setReviewForm({ 
                    id: review.id, 
                    rating: review.rating, 
                    comment: review.comment, 
                    isEditing: true 
                  })}
                  className="text-primary hover:text-primary/80 text-sm transition-colors duration-200"
                >
                  Edit Review
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewManagementSection;