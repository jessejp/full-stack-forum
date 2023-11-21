import nodemailer from "nodemailer";

async function sendEmail(to: string, messageBody: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `"Manage Account" <${process.env.SMTP_SENDER}>`,
    to,
    subject: "Change Password",
    text: messageBody,
    html: messageBody,
  };

  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}

export default sendEmail;
