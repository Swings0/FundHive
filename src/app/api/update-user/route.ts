import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const {
      fullName,
      email, 
      newEmail,
      newPassword,
      retypePassword,
      usdtTrc20Address,
      usdtErc20Address,
      bitcoinAddress,
      userName,
      phone
    } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Track which fields are updated
    const updatedFields: string[] = [];

    // Update fields if provided in the request
    if (fullName && fullName !== user.fullname) {
      user.fullname = fullName;
      updatedFields.push('Your FullName');
    }

    if (usdtTrc20Address && usdtTrc20Address !== user.usdtTrc20Address) {
      user.usdtTrc20Address = usdtTrc20Address;
      updatedFields.push('Your USDT TRC20 Address');
    }

    if (usdtErc20Address && usdtErc20Address !== user.usdtErc20Address) {
      user.usdtErc20Address = usdtErc20Address;
      updatedFields.push('Your USDT ERC20 Address');
    }

    if (bitcoinAddress && bitcoinAddress !== user.bitcoinAddress) {
      user.bitcoinAddress = bitcoinAddress;
      updatedFields.push('Your Bitcoin Address');
    }

    if (userName && userName !== user.username) {
      user.username = userName;
      updatedFields.push('Your Username');
    }
    if (phone && phone !== user.phone) {
      user.phone = phone;
      updatedFields.push('Your Phone');
    }

    if (newPassword || retypePassword) {
      if (newPassword !== retypePassword) {
        return NextResponse.json({ message: 'Passwords do not match.' }, { status: 400 });
      }
      user.password = await bcrypt.hash(newPassword, 10);
      updatedFields.push('Your Password');
    }

    if (newEmail && newEmail !== email) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return NextResponse.json(
          { message: 'The new email is already associated with another account.' },
          { status: 400 }
        );
      }
      user.email = newEmail;
      updatedFields.push('Email');
    }

    if (updatedFields.length === 0) {
      return NextResponse.json({ message: 'No changes were made.' }, { status: 400 });
    }

    await user.save();

    // Configure Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, 
      },
    });

    // Send email notification
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Your Account Details Have Been Updated',
      text: `The following info in your account were updated: "\n${updatedFields.join('\n')}\n"
       If you did not initiate these changes, please contact support immediately.`,
    };

    await transporter.sendMail(mailOptions);

    // If the email was changed, send a special response to notify the client to log in again
    if (newEmail && newEmail !== email) {
      return NextResponse.json(
        { message: 'Account updated successfully. Please log in again with your new email.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Account updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during account update:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
