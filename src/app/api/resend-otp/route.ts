import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

// MongoDB connection
const uri = process.env.MONGODB_URL as string; // Use MONGODB_URL from your .env file
const client = new MongoClient(uri);
const database = client.db("fundhive"); // Database name is "fundhive"
const usersCollection = database.collection("users");

// Helper function to generate a 6-digit OTP
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Connect to the database
    await client.connect();

    // Check if the user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Set OTP expiration time (1 minute from now)
    const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minute in milliseconds

    // Update the user's OTP and expiration in the database
    await usersCollection.updateOne(
      { email },
      { $set: { otp, otpExpiry } }
    );

    // Send OTP to the user's email
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS, // Use EMAIL_ADDRESS from your .env file
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in resend OTP:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
