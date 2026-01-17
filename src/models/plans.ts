import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      unique: true,
    },

    price: { type: Number },
    type: {
      type: String,
      enum: ["monthly", "quarterly", "half_yearly", "annual"],
    },
    benefits: { type: String },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PlanModel = mongoose.model("Plan", PlanSchema);
