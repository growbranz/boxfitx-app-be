import mongoose, { mongo } from "mongoose";
const AttendanceSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
        index: true,
    },
    date: {
        type: String,
        index: true,
    },
    checkIn: { type: Date },
    checkOut: { type: Date },
    cardId: { type: String, index: true },
    source: {
        type: String,
        enum: ["biometric", "manual"],
        default: "biometric",
    },
}, {
    timestamps: true,
});
AttendanceSchema.index({ member: 1, date: 1 }, { unique: true });
export const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
//# sourceMappingURL=attendance.js.map