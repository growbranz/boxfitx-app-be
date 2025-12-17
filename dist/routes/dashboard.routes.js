import express from "express";
import { MemberModel } from "../models/members.js";
export const DashboardRouter = express.Router();
DashboardRouter.post("/summary", async (req, res) => {
    try {
        const [TotalMembers, ActiveMembers, InactiveMembers, ExpiredMembers] = await Promise.all([
            MemberModel.countDocuments({ archived: false }),
            MemberModel.countDocuments({ status: "active", archived: false }),
            MemberModel.countDocuments({ status: "inactive", archived: false }),
            MemberModel.countDocuments({ status: "expired", archived: false }),
        ]);
        const TotalTrainers = 0; // not built the trainers endpoint
        res.status(200).json({
            data: {
                TotalMembers,
                ActiveMembers,
                InactiveMembers,
                ExpiredMembers,
                TotalTrainers,
            },
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//expiring
DashboardRouter.get("/expiring", async (req, res) => {
    try {
        const { range = "week" } = req.query;
        const now = new Date();
        const futureDate = new Date();
        if (range === "month") {
            futureDate.setDate(now.getDate() + 30);
        }
        else {
            futureDate.setDate(now.getDate() + 7);
        }
        const members = await MemberModel.find({
            archived: false,
            status: "active",
            "membership.expiryDate": {
                $gte: now,
                $lte: futureDate,
            },
        })
            .select("fullName number email membership.expiryDate")
            .sort({ "membership.expiryDate": 1 })
            .lean();
        res.status(200).json({
            success: true,
            count: members.length,
            data: members,
        });
    }
    catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});
//# sourceMappingURL=dashboard.routes.js.map