import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const user_verification_otp_send = async (email, name, otp) => {
    try {
        const info = await transporter.sendMail({
            from: "SMTP_USER",
            to: email,
            subject: "Hello",
            text: "Hello world?",
            html: `<b>Hello world? ${name} ${otp}</b`,
        });

        console.log("Message sent: %s", info.messageId);
    }
    catch (err) { console.log(err.message) }

}

