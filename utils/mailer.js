// utils/mailer.js'
require('dotenv').config(); // Add at the top of mailer.js or your entry file

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use Mailtrap, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // your email (e.g., Gmail)
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
