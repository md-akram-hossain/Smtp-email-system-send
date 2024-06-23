// server.js
import express from "express";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import cors from "cors";
import { SMTPServer } from "smtp-server";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emails";

const app = express();
const PORT = process.env.PORT || 5000;
const SMTPPORT = process.env.PORT || 25;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/email-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define routes here
app.use("/api/emails", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create SMTP server
const smtpServer = new SMTPServer({
  onData(stream, session, callback) {
    let emailData = "";
    stream.on("data", (chunk) => {
      emailData += chunk;
    });
    stream.on("end", () => {
      console.log(`Received email: ${emailData}`);
      callback(null, "Message accepted");
    });
  },
  onAuth(auth, session, callback) {
    if (auth.username === "user" && auth.password === "password") {
      callback(null, { user: "user" });
    } else {
      return callback(new Error("Invalid username or password"));
    }
  },
  disabledCommands: ["AUTH"],
});

smtpServer.listen(25, () => {
  console.log("SMTP Server is listening on port 2525");
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 25,
  secure: false,
  auth: {
    user: "user",
    pass: "password",
  },
});

// Export transporter for use in routes

module.exports = transporter;
