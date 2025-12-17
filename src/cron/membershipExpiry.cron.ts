import cron from "node-cron";
import { MemberModel } from "../models/members.js";

/**
 * Runs every day at 12:00 AM
 * Cron format: minute hour day month weekday
 */
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running daily membership expiry check...");

  try {
    const now = new Date();

    // 1️⃣ Mark expired members
    const expiredResult = await MemberModel.updateMany(
      {
        archived: false,
        "membership.expiryDate": { $lt: now },
        status: { $ne: "expired" },
      },
      {
        $set: { status: "expired" },
      }
    );

    console.log(`✅ Expired members updated: ${expiredResult.modifiedCount}`);

    // 2️⃣ Find members expiring in next 7 days (for reminders)
    const reminderDate = new Date();
    reminderDate.setDate(now.getDate() + 7);

    const expiringSoon = await MemberModel.find({
      archived: false,
      status: "active",
      "membership.expiryDate": {
        $gte: now,
        $lte: reminderDate,
      },
    }).select("fullName number email membership.expiryDate");

    console.log(`⏰ Members expiring in 7 days: ${expiringSoon.length}`);

    // 🔔 FUTURE: Trigger WhatsApp reminders here
    // sendWhatsappReminder(expiringSoon)
  } catch (error) {
    console.error("❌ Cron job error:", error);
  }
});
