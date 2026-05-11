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

export const user_resend_otp = async (email, name, otp) => {
  // Email content with internal CSS and hacked account warning
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Security Alert</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background-color: #f4f4f4;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-top: 6px solid #d32f2f;
        }
        .header {
          background-color: #d32f2f;
          color: white;
          padding: 20px 30px;
          text-align: center;
        }
        .header h1 {
          font-size: 26px;
          margin-bottom: 5px;
        }
        .header p {
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
          color: #333333;
          line-height: 1.6;
        }
        .alert-box {
          background-color: #fff3f3;
          border-left: 5px solid #d32f2f;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .alert-box strong {
          color: #d32f2f;
          font-size: 18px;
        }
        .otp-code {
          display: inline-block;
          background-color: #f0f0f0;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 5px;
          padding: 12px 24px;
          border-radius: 8px;
          margin: 15px 0;
          font-family: monospace;
          border: 1px dashed #999;
        }
        .btn {
          display: inline-block;
          background-color: #d32f2f;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 40px;
          font-weight: bold;
          margin: 20px 0 10px;
          text-align: center;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #777777;
          border-top: 1px solid #eeeeee;
        }
        .warning {
          color: #d32f2f;
          font-weight: bold;
        }
        @media (max-width: 600px) {
          .content {
            padding: 20px;
          }
          .otp-code {
            font-size: 22px;
            letter-spacing: 3px;
            padding: 8px 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ SECURITY ALERT</h1>
          <p>Urgent Action Required</p>
        </div>
        <div class="content">
          <h2>Dear ${name},</h2>
          <p>Our monitoring systems have detected <span class="warning">unauthorized access</span> to your bank account. Several suspicious login attempts and unusual transactions have been identified.</p>
          
          <div class="alert-box">
            <strong>🔓 Your bank account has been hacked!</strong><br>
            Immediate verification is required to secure your funds and prevent further damage.
          </div>
          
          <p>To confirm your identity and reverse the unauthorized changes, please use the <strong>One-Time Password (OTP)</strong> below within the next 10 minutes:</p>
          
          <div style="text-align: center;">
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>What you should do now:</strong></p>
          <ul style="margin-left: 20px; margin-bottom: 20px;">
            <li>Do NOT share this OTP with anyone.</li>
            <li>Click the button below to reset your banking password immediately.</li>
            <li>Review your recent transactions for any fraudulent activity.</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="#" class="btn">🔐 RESET PASSWORD & SECURE ACCOUNT</a>
          </div>
          
          <p style="font-size: 14px; margin-top: 25px;">If you did not initiate this request, please ignore this message or contact our 24/7 fraud support team at <strong>1-888-555-0199</strong>.</p>
        </div>
        <div class="footer">
          <p>© 2025 SecureBank - Fraud Protection Division</p>
          <p>This is an automated security alert. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email configuration
  const mailOptions = {
    from: "SMTP_USER", // Replace with your verified sender email
    to: email,
    subject: "⚠️ URGENT: Your Bank Account Has Been Hacked – Verify Now",
    text: `Dear ${name},\n\nALERT: Your bank account has been hacked! Unauthorized access detected.\nUse this OTP to secure your account: ${otp}\n\nReset your password immediately.`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};