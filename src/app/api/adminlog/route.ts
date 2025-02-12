// src/app/api/adminlog/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'fundhivecorps@gmail.com'; // Admin email
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD // Ensure password is securely set in env

// Named export for POST method
export async function POST(req: NextRequest) {
  const { email, password } = await req.json(); // Get body data from request

  // Simple validation for admin credentials (you can improve this later)
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Issue a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'ahjsbndhbnehjewbsdhnd', {
      expiresIn: '1d', // Token expires in 1 day
    });

    // Return response using NextResponse
    return NextResponse.json({ token }, { status: 200 });
  }

  // If credentials are incorrect, return error response using NextResponse
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

// Optional: If you want to handle GET requests for any initial setup, you can include a GET method
export async function GET() {
  return NextResponse.json({ message: 'Welcome to the admin login API' });
}
