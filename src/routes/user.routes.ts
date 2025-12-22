import express from "express";
import { auth } from "../middleware/auth.js";
import { AttendanceModel } from "../models/attendance.js";
import { MemberModel } from "../models/members.js";

export const userRouter = express.Router();

/**
 * GET /api/user/profile
 * Member profile
 */
userRouter.get("/profile", auth(["member"]), async (req: any, res) => {
  try {
    const memberId = req.user.memberId;

    const member = await MemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "Member not found. Contact admin.",
      });
    }

    res.status(200).json({ member });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/user/attendance
 * Attendance history
 */
userRouter.get("/attendance", auth(["member"]), async (req: any, res) => {
  try {
    const memberId = req.user.memberId;

    const records = await AttendanceModel.find({
      member: memberId,
    }).sort({ date: -1 });

    res.status(200).json({
      total: records.length,
      records,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/user/membership
 * Membership details
 */
userRouter.get("/membership", auth(["member"]), async (req: any, res) => {
  try {
    const memberId = req.user.memberId;

    const member = await MemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      plan: member.membership,
      status: member.status,
      expiryDate: member.membership?.expiryDate,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
