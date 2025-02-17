import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP required" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check OTP validity and expiration.
    if (String(user.otp) !== String(otp) || user.otpExpiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid OTP or OTP expired" }, { status: 400 });
    }

    // OTP is verified; update user.
    user.otp = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    // If user was referred, update referrer's active referrals.
    if (user.referral) {
      const referrer = await User.findById(user.referral);
      if (referrer) {
        referrer.activeReferrals += 1;
        await referrer.save();
      }
    }

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
