import mongoose, { Schema } from "mongoose";

const BudgetRangeSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true, // unique allowed
    },
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.BudgetRange ||
  mongoose.model("BudgetRange", BudgetRangeSchema);
