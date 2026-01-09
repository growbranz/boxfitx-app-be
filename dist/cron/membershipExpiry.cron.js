import cron from "node-cron";
import { MemberModel } from "../models/members.js";
import { sendMail } from "../utils/mail.js";
/**
 * Runs every day at 12:00 AM
 */
cron.schedule("0 0 * * *", async () => {
    console.log("🔄 Running daily membership expiry check...");
    try {
        const today = new Date();
        /* ---------------- 1️⃣ MARK EXPIRED MEMBERS ---------------- */
        await MemberModel.updateMany({
            archived: false,
            "membership.expiryDate": { $lt: today },
            status: { $ne: "expired" },
        }, { $set: { status: "expired" } });
        /* ---------------- 2️⃣ FETCH ACTIVE MEMBERS ---------------- */
        const members = await MemberModel.find({
            archived: false,
            status: "active",
            "membership.expiryDate": { $exists: true },
        }).select("fullName email membership.expiryDate reminders");
        for (const member of members) {
            if (!member.email)
                continue;
            if (!member.membership?.expiryDate)
                continue;
            // ✅ FIX: Ensure reminders object exists
            if (!member.reminders) {
                member.reminders = {
                    day7Sent: false,
                    day3Sent: false,
                    day1Sent: false,
                };
            }
            const daysLeft = daysBetween(today, member.membership.expiryDate);
            /* -------- 7 DAYS -------- */
            if (daysLeft === 7 && !member.reminders.day7Sent) {
                await sendMail(member.email, "⏰ Membership Expiring in 7 Days", emailTemplate(member.fullName, member.membership.expiryDate, 7));
                member.reminders.day7Sent = true;
                member.reminders.lastReminderSentAt = new Date();
                await member.save();
            }
            /* -------- 3 DAYS -------- */
            if (daysLeft === 3 && !member.reminders.day3Sent) {
                await sendMail(member.email, "⚠️ Membership Expiring in 3 Days", emailTemplate(member.fullName, member.membership.expiryDate, 3));
                member.reminders.day3Sent = true;
                member.reminders.lastReminderSentAt = new Date();
                await member.save();
            }
            /* -------- 1 DAY -------- */
            if (daysLeft === 1 && !member.reminders.day1Sent) {
                await sendMail(member.email, "🚨 Membership Expiring Tomorrow", emailTemplate(member.fullName, member.membership.expiryDate, 1));
                member.reminders.day1Sent = true;
                member.reminders.lastReminderSentAt = new Date();
                await member.save();
            }
        }
        console.log("✅ Membership reminder cron completed");
    }
    catch (error) {
        console.error("❌ Cron job error:", error);
    }
});
/* ---------------- EMAIL TEMPLATE ---------------- */
const emailTemplate = (name, expiryDate, days) => `
<p>Hello <b>${name}</b>,</p>

<p>Your <b>BOXFITX gym membership</b> will expire in 
<b>${days} day${days > 1 ? "s" : ""}</b>.</p>

<p><b>Expiry Date:</b> ${expiryDate.toDateString()}</p>

<p>Please renew your membership to avoid interruption 💪</p>

<br/>
<p>— BOXFITX Team</p>
`;
/* ---------------- HELPER ---------------- */
const daysBetween = (date1, date2) => {
    const diffTime = date2.getTime() - date1.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
//# sourceMappingURL=membershipExpiry.cron.js.map