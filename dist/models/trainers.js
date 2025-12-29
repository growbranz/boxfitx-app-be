import mongoose from "mongoose";
const TrainerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // optional but unique
    },
    phone: {
        type: String,
    },
    speciality: {
        type: String,
        enum: [
            "strength_training",
            "weight_loss",
            "boxing",
            "crossfit",
            "yoga",
            "general_fitness",
        ],
        default: "general_fitness",
    },
    experienceYears: {
        type: Number,
        default: 0,
    },
    salary: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    archived: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export const TrainerModel = mongoose.model("Trainer", TrainerSchema);
//# sourceMappingURL=trainers.js.map