import config from "../config";

// Email Verification Body
export const emailVerificationBody = (
  name: string,
  verificationLink: string
) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #333;">Red Drop</h2>
          <p style="font-size: 18px; color: #555;">Email Verification</p>
        </div>
        
        <p style="color: #555; line-height: 1.5;">Dear ${name},</p>
        
        <p style="color: #555; line-height: 1.5;">Thank you for registering with <b>RED Drop</b>. To complete your registration and verify your email address, please click the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #FF0033; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        
        <p style="color: #555; line-height: 1.5;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px;">${verificationLink}</p>
        
        <p style="color: #555; line-height: 1.5;">This verification link will expire in 1 hours. If you did not request this verification, please disregard this email.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px;">
          <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:${config.contact_email}" style="color: #FF0033;">${config.contact_email}</a>.</p>
          <p>Best regards,<br>Red Drop</p>
        </div>
      </div>`;
};

// Email Verification Success Body
export const emailVerificationSuccessBody = (name: string) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #333;">Red Drop</h2>
            <p style="font-size: 18px; color: #00BF00;">Email Verification Successful</p>
          </div>
          
          <p style="color: #555; line-height: 1.5;">Dear ${name},</p>
          
          <p style="color: #555; line-height: 1.5;">Your email address has been successfully verified. You can now access all the features of Red Drop.</p>
    
          <p style="color: #555; line-height: 1.5;">Thank you for being a part of our community!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px;">
            <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:${config.contact_email}" style="color: #FF0033;">${config.contact_email}</a>.</p>
            <p>Best regards,<br>Red Drop</p>
          </div>
        </div>`;
};

// Forget Password token send
export const forgetPasswordBody = (name: string, resetLink: string) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #333;">Red Drop</h2>
          <p style="font-size: 18px; color: #555;">Password Reset Request</p>
        </div>
        
        <p style="color: #555; line-height: 1.5;">Dear ${name},</p>
        
        <p style="color: #555; line-height: 1.5;">We received a request to reset your password. To proceed, please click the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #FF0033; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        
        <p style="color: #555; line-height: 1.5;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px;">${resetLink}</p>
        
        <p style="color: #555; line-height: 1.5;">This link will expire in 1 hours. If you did not request this, please ignore this email.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px;">
          <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:${config.contact_email}" style="color: #FF0033;">${config.contact_email}</a>.</
          <p>Best regards,<br>Red Drop</p>
        </div>
      </div>`;
};

// Reset Password Success. If it's not you then please reset again
export const resetPasswordBody = (name: string) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #333;">Red Drop</h2>
          <p style="font-size: 18px; color: #555;">Password Reset Successful</p>
        </div>
        
        <p style="color: #555; line-height: 1.5;">Dear ${name},</p>
        
        <p style="color: #555; line-height: 1.5;">Your password has been successfully reset. If you did not request this change, please reset your password again using the link below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${config.front_end_url}/forgot-password" style="background-color: #FF0033; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password Again</a>
        </div>
        <p style="color: #555; line-height: 1.5;">If you have any questions or need assistance, please contact our support team at <a href="mailto:${config.contact_email}" style="color: #FF0033;">${config.contact_email}</a>.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px;">
          <p>Best regards,<br>Red Drop</p>
        </div>
      </div>`;
};
