import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, index: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female"] },
    address: { type: String },
    number: { type: Number },
    email: { type: String, required: true, unique: true },
    emergencyContact: {
      name: { type: String },
      phone: { type: Number },
      relation: { type: String },
    },
    heightCm: { type: Number },
    weightCm: { type: Number },
    medicalConditions: { type: Boolean, default: false },
    medicalConditionsDetails: { type: String, default: "" },
    onMedication: { type: Boolean, default: false },
    medicationDetails: { type: String, default: "" },

    previousInjuries: { type: Boolean, default: false },
    previousInjuriesDetails: { type: String, default: "" },

    underFitnessProgram: { type: Boolean, default: false },
    fitnessGoal: {
      type: String,
      enum: [
        "weight_loss",
        "muscle_gain",
        "general_fitness",
        "strength_training",
        "boxing_combat",
        "others",
      ],
      default: "general_fitness",
    },
    membership: {
      planType: {
        type: String,
        enum: ["monthly", "quarterly", "half_yearly", "annual"],
      },
      startDate: { type: Date },
      expiryDate: { type: Date },
      paymentMode: {
        type: String,
        enum: ["cash", "card", "Upi", "Online_transfer"],
      },
    },
    status: {
      type: String,
      enum: ["active", "expired", "inactive"],
      default: "inactive",
    },
    archived: { type: Boolean, default: false },
    cardId: {
      type: String,
      unique: true,
      sparse: true, // allows null
    },
    reminders: {
      day7Sent: { type: Boolean, default: false },
      day3Sent: { type: Boolean, default: false },
      day1Sent: { type: Boolean, default: false },
      lastReminderSentAt: { type: Date },
    },
  },
  { timestamps: true }
);
//virtual age (computed)
MemberSchema.virtual("age").get(function () {
  if (!this.dob) return null;
  const diff = Date.now() - new Date(this.dob).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

// pre save hook : auto set status  based on the expiry date
MemberSchema.pre("save", function () {
  const doc = this;
  if (doc.membership && doc.membership.expiryDate) {
    const now = new Date();
    doc.status = doc.membership.expiryDate >= now ? "active" : "expired";
  } else {
    doc.status = doc.status || "expired";
  }
});

export const MemberModel = mongoose.model("Member", MemberSchema);
