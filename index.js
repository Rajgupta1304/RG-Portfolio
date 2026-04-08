import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));

// POST route (IMPORTANT)
app.post("/mail", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "rajguptaofficial98@gmail.com", // ✅ MUST be your email
      replyTo: email, // ✅ user's email
      to: "rajguptaofficial98@gmail.com",
      subject: `New Contact Form Message from ${name}`,

      // ✅ Better formatted email
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,

      // ✅ Optional (nice HTML email)
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    console.log("Email sent ✅");
  } catch (error) {
    console.error("Error:", error);
    res.send("Error sending email ❌");
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
