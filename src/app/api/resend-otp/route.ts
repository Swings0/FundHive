import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

const uri = process.env.MONGODB_URL as string;
const client = new MongoClient(uri);
const database = client.db("fundhive");
// Removed: const usersCollection = database.collection("users");

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    console.log("Raw request body:", rawBody);
    const { email } = JSON.parse(rawBody);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Find user even if unverified.
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate new OTP and set expiration (1 minute from now)
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000);

    // Update OTP fields
    user.otp = otp;
    user.otpExpires = otpExpiresAt; // using otpExpires as defined in your model
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in resend OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
