// File: models/ServiceCategory.ts (Create this new file in src/app/models/)
import mongoose from 'mongoose';

const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', ServiceCategorySchema);