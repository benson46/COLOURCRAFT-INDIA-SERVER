import sendMail from "../config/nodemailer.js";

export const sendOtpMail = async (email, otp) => {
  const subject = "Your OTP for Account Verification - Colour Craft";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4A90E2;">Colour Craft - Account Verification</h2>
      
      <p>Dear User,</p>

      <p>Thank you for registering with <strong>Colour Craft</strong>.</p>
      
      <p>Your One-Time Password (OTP) for account verification is:</p>
      
      <div style="font-size: 24px; font-weight: bold; color: #000; margin: 20px 0;">
        ${otp}
      </div>

      <p>Please do not share this OTP with anyone. This code will expire in 24 hours.</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

      <p style="font-size: 14px; color: #666;">
        If you did not initiate this request, please ignore this email. 
        Do not share or forward this message to anyone.
      </p>

      <p style="font-size: 14px; color: #666;">
        Regards,<br/>
        The Colour Craft Team
      </p>
    </div>
  `;

  await sendMail(email, subject, html);
};
