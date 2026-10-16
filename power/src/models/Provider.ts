import mongoose, { Schema } from "mongoose";

const WorkingHoursSchema = new Schema(
  {
    start: String,
    end: String,
    active: Boolean,
  },
  { _id: false }
);

const ProviderSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },

    // ⭐ This was missing
    password: { type: String, required: true },

    profileImage: String,
    bio: String,
    experience: String,

    services: [String],

    workingHours: {
      monday: WorkingHoursSchema,
      tuesday: WorkingHoursSchema,
      wednesday: WorkingHoursSchema,
      thursday: WorkingHoursSchema,
      friday: WorkingHoursSchema,
      saturday: WorkingHoursSchema,
      sunday: WorkingHoursSchema,
    },

    address: {
      fullAddress: String,
      city: String,
      area: String,
      pincode: String,
      lat: String,
      lng: String,
      radiusKm: Number,
    },

    gallery: [String],
    certificates: [String],
    experienceDocs: [String],

    pricing: [
      {
        service: String,
        price: Number,
        description: String,
      },
    ],

    bankDetails: {
      accountName: String,
      accountNumber: String,
      ifsc: String,
      upiId: String,
      bankName: String,
    },

    teamMembers: [
      {
        name: String,
        phone: String,
        skills: [String],
      },
    ],

    categories: [String],
    verified: { type: Boolean, default: false },
    online: { type: Boolean, default: true },

    serviceType: String,
    availability: String,
    serviceRadius: Number,

    specializations: [String],

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    qualifications: [
      {
        name: String,
        institution: String,
        year: String,
      },
    ],

    tools: [
      {
        name: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Provider ||
  mongoose.model("Provider", ProviderSchema);
