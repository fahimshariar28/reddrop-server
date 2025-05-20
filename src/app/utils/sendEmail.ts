import nodemailer from "nodemailer";
import config from "../config";

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: config.email.email_host,
    port: config.email.email_port,
    secure: false,
    auth: {
      user: config.email.email_user,
      pass: config.email.email_password,
    },
  } as nodemailer.TransportOptions);

  await transporter.sendMail({
    from: {
      name: config.email.email_from_name ?? "",
      address: config.email.email_user ?? "",
    },
    to, // list of receivers
    subject,
    html, // html body
  });
}
