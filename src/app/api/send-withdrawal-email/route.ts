import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json();
    if (!email || amount === undefined) {
      return NextResponse.json(
        { error: "Email and amount are required" },
        { status: 400 }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.OWNER_EMAIL,
      subject: "User Withdrawal Request",
      text: `User ${email} has requested to withdraw $${amount}`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Withdrawal email sent successfully" });
  } catch (error) {
    console.error("Error sending withdrawal email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
