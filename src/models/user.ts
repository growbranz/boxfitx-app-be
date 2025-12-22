import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
