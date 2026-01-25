import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import ExcelJS from "exceljs";
import moment from "moment";
import { MemberModel } from "../models/members.js";
import { AttendanceModel } from "../models/attendance.js";
import mongoose from "mongoose";
import { auth } from "../middleware/auth.js";

export const AttendanceRouter = express.Router();
interface IMember {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  cardId?: string;
}

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * POST /api/attendance/import
 * multipart/form-data → file
 */
AttendanceRouter.post(
  "/import",
  upload.single("file"),
  auth(["admin"]),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const results: any[] = [];
      const unmatched: string[] = [];

      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
          results.push(row);
        })
        .on("end", async () => {
          for (const row of results) {
            /**
             * EXPECTED CSV HEADERS
             * card_id, timestamp, event_type
             */

            const cardId = row.card_id?.trim();
            const eventType = row.event_type?.toLowerCase(); // checkin / checkout
            const timestamp = moment(row.timestamp).toDate();

            if (!cardId || !timestamp) continue;

            const member = await MemberModel.findOne({ cardId });
            if (!member) {
              unmatched.push(cardId);
              continue;
            }

            const date = moment(timestamp).format("YYYY-MM-DD");

            let attendance = await AttendanceModel.findOne({
              member: member._id,
              date,
            });

            if (!attendance) {
              attendance = await AttendanceModel.create({
                member: member._id,
                cardId,
                date,
              });
            }

            if (eventType === "checkin" && !attendance.checkIn) {
              attendance.checkIn = timestamp;
            }

            if (eventType === "checkout") {
              attendance.checkOut = timestamp;
            }

            await attendance.save();
          }
          if (!req.file) {
            return res.status(400).json({ message: "File is required" });
          }

          fs.unlinkSync(req.file.path); // cleanup

          return res.status(200).json({
            message: "Attendance import completed",
            unmatchedCardIds: unmatched,
          });
        });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  },
);

AttendanceRouter.post("/checkin", auth(["member"]), async (req, res) => {
  try {
    const memberId =
      typeof req.user.memberId === "string"
        ? req.user.memberId
        : req.user.memberId?._id;

    const today = moment().format("YYYY-MM-DD");

    let attendance = await AttendanceModel.findOne({
      member: memberId,
      date: today,
    });

    if (!attendance) {
      attendance = await AttendanceModel.create({
        member: memberId,
        date: today,
        checkIn: new Date(),
        source: "manual",
      });
    } else if (!attendance.checkIn) {
      attendance.checkIn = new Date();
      await attendance.save();
    } else {
      return res.status(400).json({ message: "Already checked in" });
    }

    res.json({ message: "Check-in successful", attendance });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

//checkout particual user
AttendanceRouter.post("/checkout", auth(["member"]), async (req, res) => {
  try {
    const memberId =
      typeof req.user.memberId === "string"
        ? req.user.memberId
        : req.user.memberId?._id;

    const today = moment().format("YYYY-MM-DD");

    const attendance = await AttendanceModel.findOne({
      member: memberId,
      date: today,
    });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: "Check-in first" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out" });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.json({ message: "Check-out successful", attendance });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/attendance/summary
 */
AttendanceRouter.get("/summary", async (req, res) => {
  try {
    const date = req.query.date || moment().format("YYYY-MM-DD");

    const totalMembers = await MemberModel.countDocuments({
      status: "active",
    });

    const records = await AttendanceModel.find({ date });

    const present = records.filter((r) => r.checkIn).length;
    const checkedOut = records.filter((r) => r.checkOut).length;
    const absent = totalMembers - present;

    return res.json({
      date,
      totalMembers,
      present,
      absent,
      checkedOut,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/attendance/today
 * Admin dashboard today attendance
 */
AttendanceRouter.get("/today", auth(["admin"]), async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const records = await AttendanceModel.find({ date: today })
      .populate("member", "fullName")
      .lean();

    res.status(200).json({
      date: today,
      records: records.map((r) => ({
        _id: r._id,
        member: r.member,
        checkIn: r.checkIn,
        checkOut: r.checkOut,
        source: r.source || "manual",
      })),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/attendance/member/:memberId
 */
AttendanceRouter.get("/member/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const from = req.query.from;
    const to = req.query.to;

    const query: any = { member: memberId };

    if (from && to) {
      query.date = { $gte: from, $lte: to };
    }

    const history = await AttendanceModel.find(query).sort({ date: -1 });

    res.json({
      memberId,
      totalDays: history.length,
      records: history,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/attendance/monthly
 */
AttendanceRouter.get("/monthly", async (req, res) => {
  try {
    const month = Number(req.query.month); // 1-12
    const year = Number(req.query.year);

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year required" });
    }

    const start = moment(`${year}-${month}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");

    const end = moment(start).endOf("month").format("YYYY-MM-DD");

    const data = await AttendanceModel.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end },
          checkIn: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      month,
      year,
      stats: data.map((d) => ({
        date: d._id,
        count: d.count,
      })),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/attendance/export/monthly
 */
AttendanceRouter.get("/export/monthly", async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const start = moment(`${year}-${month}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");

    const end = moment(start).endOf("month").format("YYYY-MM-DD");

    const records = await AttendanceModel.find({
      date: { $gte: start, $lte: end },
    }).populate("member");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Attendance");

    /* ---------- HEADER ---------- */
    sheet.columns = [
      { header: "Member Name", key: "name", width: 25 },
      { header: "Card ID", key: "cardId", width: 15 },
      { header: "Date", key: "date", width: 15 },
      { header: "Check In", key: "checkIn", width: 20 },
      { header: "Check Out", key: "checkOut", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];

    sheet.getRow(1).font = { bold: true };

    /* ---------- DATA ---------- */
    records.forEach((r) => {
      const member = r.member as unknown as IMember;

      sheet.addRow({
        name: member?.fullName || "Unknown",
        cardId: r.cardId,
        date: r.date,
        checkIn: r.checkIn ? moment(r.checkIn).format("hh:mm A") : "-",
        checkOut: r.checkOut ? moment(r.checkOut).format("hh:mm A") : "-",
        status: r.checkIn ? "Present" : "Absent",
      });
    });

    /* ---------- RESPONSE ---------- */
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=attendance-${month}-${year}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

AttendanceRouter.post("/biometric", async (req, res) => {
  try {
    const { rawData, receivedAt } = req.body;

    /**
     * Example RS-9W data contains Card ID or User ID
     * You will adjust parsing later if needed
     */
    const cardIdMatch = rawData.match(/\d+/); // simple safe start
    if (!cardIdMatch) {
      return res.status(400).json({ message: "Card ID not found" });
    }

    const cardId = cardIdMatch[0];
    const timestamp = receivedAt ? new Date(receivedAt) : new Date();
    const date = moment(timestamp).format("YYYY-MM-DD");

    const member = await MemberModel.findOne({ cardId });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    let attendance = await AttendanceModel.findOne({
      member: member._id,
      date,
    });

    if (!attendance) {
      attendance = await AttendanceModel.create({
        member: member._id,
        cardId,
        date,
        checkIn: timestamp,
        source: "biometric",
      });
    } else if (!attendance.checkIn) {
      attendance.checkIn = timestamp;
      attendance.source = "biometric";
      await attendance.save();
    } else if (!attendance.checkOut) {
      attendance.checkOut = timestamp;
      await attendance.save();
    }

    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
