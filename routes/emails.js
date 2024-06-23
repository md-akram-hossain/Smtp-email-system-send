import express from "express";
import mongoose from "mongoose";
import transporter from "/server";
import Email from "../models/Email";
const router = express.Router();
// Send email
router.post("/send", async (req, res) => {
  const { sender, receiver, subject, message } = req.body;

  const mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    const newEmail = new Email({ sender, receiver, subject, message });
    await newEmail.save();
    res.status(200).send("Email sent and saved!");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

module.exports = router;
