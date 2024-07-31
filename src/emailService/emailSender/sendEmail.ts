import nodemailer from "nodemailer";
import "dotenv/config";

export async function sendEmail(
    recipient: string,
    subject: string,
    body: string,
) {
    const options = {
        service: "Gmail",
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD,
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
