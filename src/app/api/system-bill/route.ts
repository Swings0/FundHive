import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import nodemailer from "nodemailer";
import User from "@/models/user";

// Connect to your database

// Create a transporter (adjust your settings accordingly)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export async function POST(req: Request) {

 await dbConnect();
  try {
    const { email, walletType, transactionHash } = await req.json();
    if (!email || !walletType || !transactionHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here, you might update your Investment document as needed.
    // For our purpose, we only send an email to admin.
    const adminEmail = process.env.OWNER_EMAIL;
    if (!adminEmail) {
      throw new Error("Admin email is not configured");
    }

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: adminEmail,
      subject: "System Bill Deposit Notification",
      text: `User ${email} just made a system bill deposit.\nWallet Type: ${walletType}\nTransaction Hash: ${transactionHash}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Hold on while we process your transaction, this doesn't take too long" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in system bill deposit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
