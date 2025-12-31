import { sendMail } from "../utils/mail.js";
(async () => {
    try {
        await sendMail("syedsameernazeer@gmail.com", // 👈 put YOUR email
        "BOXFITX Test Email ✅", `
      <h2>Email Test Successful 🎉</h2>
      <p>If you received this, email service is working correctly.</p>
      <p>— BOXFITX System</p>
      `);
        console.log("✅ Test email sent successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Email failed:", error);
        process.exit(1);
    }
})();
//# sourceMappingURL=testEmail.js.map