import nodemailer from "npm:nodemailer";
import { env } from "../src/constants.ts";

export async function sendEmail(
  recipient: string,
  subject: string,
  body: string,
) {
  const options = {
    service: "Gmail",
    auth: {
      user: env["GOOGLE_EMAIL"],
      pass: env["GOOGLE_PASSWORD"],
    },
  };

  const transporter = nodemailer.createTransport(options);

  const mailOptions = {
    // Add from client confirmation here to send it from that  direction.
    from: "client-confirmation@ebury.com",
    to: recipient,
    cc: "",
    subject,
    html: body,
  };
  await transporter.sendMail(mailOptions);
}
