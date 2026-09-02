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

export const user_forgot_password_otp_send = async (email, name, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "AutoSyntax - Password Reset OTP",
            text: `Hello ${name},\n\nYou requested to reset your password. Your OTP code is: ${otp}\nThis code will expire in 5 minutes.\n\nBest regards,\nAutoSyntax Team`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e8001d; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTOSYNTAX</h1>
                    <p style="color: #666666; font-size: 12px; margin-top: 4px;">DRIVE THE FUTURE</p>
                </div>
                <h2 style="color: #333333; font-size: 18px; margin-bottom: 10px;">Hello ${name},</h2>
                <p style="color: #555555; font-size: 14px; line-height: 1.5;">You requested to reset your password. Please use the OTP below to set a new password:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #e8001d; background: #fff1f2; padding: 12px 24px; border-radius: 8px; border: 1px dashed #e8001d; display: inline-block;">${otp}</span>
                </div>
                <p style="color: #888888; font-size: 12px; text-align: center;">This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                <p style="color: #aaaaaa; font-size: 11px; text-align: center;">&copy; ${new Date().getFullYear()} AutoSyntax Inc. All rights reserved.</p>
            </div>
            `,
        });

        console.log("Forgot password OTP email sent: %s", info.messageId);
        return info;
    }
    catch (err) { console.log("Forgot password email error:", err.message) }
};

export const user_welcome_email_send = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Welcome to AutoSyntax - Drive The Future!",
            text: `Hello ${name},\n\nWelcome to AutoSyntax! Your account is now fully verified.\nExplore 10,000+ new and used cars, save your favorite vehicles, and connect with top sellers.\n\nBest regards,\nAutoSyntax Team`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 24px; background: #0b0d13; padding: 20px; border-radius: 12px;">
                    <h1 style="color: #ef4444; margin: 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px;">AUTOSYNTAX</h1>
                    <p style="color: #9ca3af; font-size: 11px; margin-top: 4px; tracking-widest: 2px;">DRIVE THE FUTURE</p>
                </div>
                <h2 style="color: #111827; font-size: 20px; margin-bottom: 12px;">Welcome to AutoSyntax, ${name}! 🎉</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">Your email verification is complete and your account is now active. You are officially part of India's premier car platform.</p>
                
                <div style="background: #f9fafb; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; color: #111827;">What you can do now:</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.6;">
                        <li>Browse 10,000+ New & Used Certified Cars</li>
                        <li>Save cars to your personal Wishlist</li>
                        <li>Post your own cars for sale for free</li>
                        <li>Book test drives & make instant dealer offers</li>
                    </ul>
                </div>
                
                <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">If you ever have any questions, our support team is available 24/7 to assist you.</p>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
                <p style="color: #9ca3af; font-size: 11px; text-align: center;">&copy; ${new Date().getFullYear()} AutoSyntax Inc. All rights reserved.</p>
            </div>
            `,
        });

        console.log("Welcome email sent: %s", info.messageId);
        return info;
    }
    catch (err) { console.log("Welcome email send error:", err.message) }
};

