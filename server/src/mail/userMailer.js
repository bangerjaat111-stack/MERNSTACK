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
            from: process.env.SMTP_USER,
            to: email,
            subject: "AutoSyntax - Verification OTP Code",
            text: `Hello ${name},\n\nWelcome to AutoSyntax! Your email verification code is: ${otp}\nThis code will expire in 5 minutes.\n\nBest regards,\nAutoSyntax Team`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e8001d; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTOSYNTAX</h1>
                    <p style="color: #666666; font-size: 12px; margin-top: 4px;">DRIVE THE FUTURE</p>
                </div>
                <h2 style="color: #333333; font-size: 18px; margin-bottom: 10px;">Hello ${name},</h2>
                <p style="color: #555555; font-size: 14px; line-height: 1.5;">Welcome to AutoSyntax! Please use the OTP below to complete your email verification:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #e8001d; background: #fff1f2; padding: 12px 24px; border-radius: 8px; border: 1px dashed #e8001d; display: inline-block;">${otp}</span>
                </div>
                <p style="color: #888888; font-size: 12px; text-align: center;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                <p style="color: #aaaaaa; font-size: 11px; text-align: center;">&copy; ${new Date().getFullYear()} AutoSyntax Inc. All rights reserved.</p>
            </div>
            `,
        });

        console.log("Verification email sent: %s", info.messageId);
        return info;
    }
    catch (err) { console.log("Email send error:", err.message) }
}

export const user_resend_otp = async (email, name, otp) => {
    try {
        const info = await transporter.sendMail({
            from:process.env.SMTP_USER,
            to: email,
            subject: "AutoSyntax - Your New Verification OTP",
            text: `Hello ${name},\n\nYour new verification code is: ${otp}\nThis code will expire in 5 minutes.\n\nBest regards,\nAutoSyntax Team`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e8001d; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTOSYNTAX</h1>
                    <p style="color: #666666; font-size: 12px; margin-top: 4px;">DRIVE THE FUTURE</p>
                </div>
                <h2 style="color: #333333; font-size: 18px; margin-bottom: 10px;">Hello ${name},</h2>
                <p style="color: #555555; font-size: 14px; line-height: 1.5;">You requested a new verification OTP. Please use the code below:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #e8001d; background: #fff1f2; padding: 12px 24px; border-radius: 8px; border: 1px dashed #e8001d; display: inline-block;">${otp}</span>
                </div>
                <p style="color: #888888; font-size: 12px; text-align: center;">This OTP is valid for 5 minutes.</p>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                <p style="color: #aaaaaa; font-size: 11px; text-align: center;">&copy; ${new Date().getFullYear()} AutoSyntax Inc. All rights reserved.</p>
            </div>
            `,
        });

        console.log("Resend OTP email sent: %s", info.messageId);
        return info;
    }
    catch (err) { console.log("Resend email error:", err.message) }
};