require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async ( email, subject, text) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        const message = {
            from: "Notes",
            to: email,
            subject: subject,
            text: text,
        };
        await mailTransporter.sendMail(message);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = sendEmail ;