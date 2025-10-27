import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
// import { validatePhoneNumber } from "@/utils/phoneValidator";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type UserInput = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export const POST = async (req: NextRequest) => {
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPByEmail = async (email: string, otp: string): Promise<void> => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
      });

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Fundhivecorps.com; Verify Your Email",
        text: `Your One Time Password (OTP) is ${otp}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      if (error instanceof Error) {
        console.error("OTP Email sending error:", error.message);
      }
    }
  };

  const emailNewUserToAdmin = async (user: UserInput) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
      });

      const mailOptions = {
        from: `"Fundhivecorps.com" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: "New User Registration",
        text: `A new user has registered:\n\nName: ${user.fullname}\nEmail: ${user.email} \nUsername: ${user.username}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Admin Email sending error:", error.message);
      }
    }
  };

  try {
    const { fullname, username, email, password, referral } = await req.json();

    await dbConnect();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const userCreated = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      referral: referral || null,
      isVerified: false,
    });

    await userCreated.save();

    if (referral) {
      const referrer = await User.findById(referral);
      if (referrer) {
        referrer.referals += 1;
        await referrer.save();
      }
    }

    // Send OTP to user
    await sendOTPByEmail(email, otp);

    // Send admin the new user info
    await emailNewUserToAdmin({ fullname, email, username, password });

    return NextResponse.json(
      { msg: "User registered successfully. Please verify OTP." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
};
