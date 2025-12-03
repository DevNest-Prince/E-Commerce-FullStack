import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();
async function sendVerificationEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from : "your_email",
        to,
        subject: subject,
        html: body
    }

    await transporter.sendMail(mailOptions);

}

export default sendVerificationEmail;