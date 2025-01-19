import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";


const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function POST (req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes expiry

        // Store the token and its expiry in the user's record
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordTokenExpiry = tokenExpiry;
        await user.save();

        // Set up nodemailer for sending the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Construct the reset URL
        const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}&email=${email}`;
        const message = `
           <div> 
            <p>You have requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">Reset Your Password</a>

            <div className="mt-4">
                <Image
                    className="w-10 opacity-95"
                    src="/Fundhive1.svg"
                    alt="Logo"
                    width={0}
                    height={0}
                />
                <h1 className="text-lg tracking-wide font-semibold text-white">
                    FundHive.
                </h1>
            <div>
           <div>
            `;
        // Send the email
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: message,
        });

        return NextResponse.json({ message: "A link to reset your password has been sent to your email" }, { status: 200 });
    } catch (error) {
        console.error("Password reset error", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

export async function PATCH(req: Request) {
    const { token, email, newPassword } = await req.json();

    if (!token || !email || !newPassword) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Check if the token matches and is not expired
        if (user.resetPasswordToken !== hashedToken || Date.now() > user.resetPasswordTokenExpiry) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear the reset token and expiry
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
