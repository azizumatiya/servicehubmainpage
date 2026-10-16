import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: { type: String, enum: ["customer", "provider"], default: "customer" },

    // Optional provider fields
    services: [String],
    experience: String,
    bio: String,
    profileImage: String,

    rating: { type: Number, default: 5 },
    completedJobs: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
