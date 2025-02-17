import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { validatePhoneNumber } from "@/utils/phoneValidator";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  // Helper to generate a 6-digit OTP.
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to send the OTP via email.
  function sendOTPByEmail(email: string, otp: string) {
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
        from: `"Fundhivecorps.com" <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: "Verify Your Email",
        text: `Your One Time Password (OTP) is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    }
  }

  const { fullname, username, email, password, phone, country, referral } = await req.json();
  try {
    const phonevalidation = await validatePhoneNumber(phone, country);
    if (phonevalidation && !phonevalidation.valid) {
      return NextResponse.json({ msg: "Invalid phone number" }, { status: 400 });
    }

    await dbConnect();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Generate OTP and set expiry (5 minutes).
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Create new user with isVerified set to false.
    const userCreated = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpiresAt,
      referral: referral || null,
      isVerified: false,
    });

    await userCreated.save();

    // If a referral exists, update the referrer's count.
    if (referral) {
      const referrer = await User.findById(referral);
      if (referrer) {
        referrer.referals += 1;
        await referrer.save();
      }
    }

    // Send OTP email.
    sendOTPByEmail(email, otp);

    // Return a success message.
    return NextResponse.json(
      { msg: "User registered successfully. Please verify OTP." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
};
