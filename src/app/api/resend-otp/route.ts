import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

// Generate a 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt; // ✅ this field must exist in schema
    await user.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in /api/resend-otp:", error.message);
    } else {
      console.error("Unknown error in /api/resend-otp:", error);
    }
  
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}  