import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;