import nodemailer from "nodemailer";

let transporter: any = null;

export function initEmailService() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: import.meta.env.VITE_EMAIL_SERVICE,
    auth: {
      user: import.meta.env.VITE_EMAIL_USER,
      pass: import.meta.env.VITE_EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
) {
  const transporter = initEmailService();
  const resetUrl = `${import.meta.env.VITE_APP_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: import.meta.env.VITE_EMAIL_USER,
    to: email,
    subject: "Reset Your Password - TechNest Portfolio Builder",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>You requested a password reset for your TechNest Portfolio Builder account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  const transporter = initEmailService();

  const mailOptions = {
    from: import.meta.env.VITE_EMAIL_USER,
    to: email,
    subject: "Welcome to TechNest Portfolio Builder",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to TechNest Portfolio Builder, ${name}!</h2>
        <p>Thank you for joining our platform. We're excited to help you create an amazing portfolio.</p>
        <p>Get started by exploring our templates and creating your first portfolio.</p>
        <a href="${import.meta.env.VITE_APP_URL}/dashboard" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Go to Dashboard</a>
        <p>If you have any questions, feel free to reply to this email.</p>
      </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

export async function sendPortfolioPublishedEmail(
  email: string,
  portfolioName: string,
  portfolioUrl: string,
) {
  const transporter = initEmailService();

  const mailOptions = {
    from: import.meta.env.VITE_EMAIL_USER,
    to: email,
    subject: "Your Portfolio Has Been Published",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your Portfolio Has Been Published!</h2>
        <p>Congratulations! Your portfolio "${portfolioName}" has been successfully published.</p>
        <p>You can now share your portfolio with the world using the link below:</p>
        <a href="${portfolioUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">View Your Portfolio</a>
        <p>Keep updating your portfolio to showcase your latest work!</p>
      </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
