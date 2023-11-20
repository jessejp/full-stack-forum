import nodemailer from "nodemailer";

async function sendEmail(to: string, messageBody: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDERER,
      pass: process.env.EMAIL_SENDERER_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `'"Change Password" <${process.env.EMAIL_SENDERER}>'`,
    to,
    subject: "Hello ✔",
    text: messageBody,
    html: messageBody,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmail;
