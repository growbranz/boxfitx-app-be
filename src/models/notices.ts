import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    visible: {
      type: Boolean,
      default: true,
    },

    expiryDate: Date,
  },
  { timestamps: true }
);

export const NoticeModel = mongoose.model("Notice", NoticeSchema);
