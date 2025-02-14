import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { email, otp } = body;

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP required" }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (String(user.otp) !== String(otp) || user.otpExpiresAt < new Date()) {
            return NextResponse.json({ error: "Invalid OTP or OTP expired" }, { status: 400 });
        }

        // OTP is verified, clear OTP fields
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        // Check if the user was referred
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
