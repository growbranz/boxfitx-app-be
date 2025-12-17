import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import moment from "moment";
import { MemberModel } from "../models/members.js";
import { AttendanceModel } from "../models/attendance.js";

export const AttendanceRouter = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * POST /api/attendance/import
 * multipart/form-data → file
 */
AttendanceRouter.post("/import", upload.single("file"), async (req, res) => {
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
});
