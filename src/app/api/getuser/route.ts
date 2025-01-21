import {  NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // Ensure this points to your next-auth configuration file
import User from '@/models/user'; // Adjust the import path if needed

export async function GET() {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Access the user from the session (assuming session.user.email is available)
    const userEmail = session.user?.email;

    if (!userEmail) {
      return NextResponse.json({ message: 'User email not found' }, { status: 400 });
    }

    // Fetch user from the database based on email
    const user = await User.findOne({ email: userEmail }).select('username email createdAt');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the username and registration date (createdAt)
    return NextResponse.json(
      {
        username: user.username,
        fullname: user.fullname,

        email: user.email,
        registrationDate: user.createdAt.toISOString(), // Convert to ISO format
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
