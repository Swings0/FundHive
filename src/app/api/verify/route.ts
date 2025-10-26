import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const otpExpiry = user.otpExpiresAt ? new Date(user.otpExpiresAt) : null;

    if (!user.otp || user.otp !== otp || !otpExpiry || otpExpiry < new Date()) {
      return NextResponse.json({ error: "Invalid OTP or OTP expired" }, { status: 400 });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    if (user.referral) {
      const referrer = await User.findById(user.referral);
      if (referrer) {
        referrer.activeReferrals = (referrer.activeReferrals || 0) + 1;
        await referrer.save();
      }
    }

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
