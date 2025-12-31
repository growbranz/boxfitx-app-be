import { transporter } from "../config/mailer.js";
export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"BOXFIT ${process.env.EMAIL_USER}"`,
    to,
    subject,
    html,
  });
};
