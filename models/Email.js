// models/Email.js
const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", EmailSchema);
