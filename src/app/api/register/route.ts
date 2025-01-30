import User from "@/models/user"
import dbConnect from "@/utils/dbConnect"
import { validatePhoneNumber } from "@/utils/phoneValidator"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"


export const POST = async (req: NextRequest) => {

    const generateOTP = (): string => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    function sendOTPByEmail(email: string, otp: string) {
        try {
            // Create a nodemailer transporter with your email service settings
            const transporter = nodemailer.createTransport({
                service: "gmail",  // service provider
                port: 456,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });

            const mailOptions = {
                from: ` "Fundhivecorps.com"<${process.env.EMAIL_ADDRESS}>`,
                to: email,
                subject: "Verify Your Email",
                text: `Your One Time Password (OTP) is ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
        }
    }



    // take user incoming data
    const { username, email, password, phone, country, referral } = await req.json();
    try {

        const phonevalidation = await validatePhoneNumber(phone, country);

        if (phonevalidation && !phonevalidation.valid) {
            // If the phone number is invalid, return an error response
            return new NextResponse(JSON.stringify({ msg: "Invalid phone number" }), { status: 400 });
        }



        // Connect to the database
        await dbConnect();

        // hash the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)


        //store user data in the database
        const otp = generateOTP()
        // otp expres after 5 minutes
        const otpExpires = Date.now() + 312500

        // create new user
        const userCreated = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            otp,
            otpExpires,
            referral: referral || null,
        })

        await userCreated.save()


        if (referral) {
            const referrer = await User.findById(referral);
            if (referrer) {
                referrer.referals += 1;
                await referrer.save();
            }
        }

        //Return success response
        if (userCreated) {
            // send user otp mail
            sendOTPByEmail(email, otp)
            return new NextResponse(JSON.stringify({ msg: "user registered successfullly" }), { status: 200 })
        }
    } catch (error) {
        console.error("error during registration:", error);

 
        // Return error response 
        return new NextResponse(JSON.stringify({ msg: "Server error" }), { status: 500 });
    }
}