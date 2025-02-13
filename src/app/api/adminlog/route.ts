// src/app/api/adminlog/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'fundhivecorps@gmail.com'; 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 

export async function POST(req: NextRequest) {
  const { email, password } = await req.json(); // Get body data from request


  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Issue a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'ahjsbndhbnehjewbsdhnd', {
      expiresIn: '1d', // Token expires in 1 day
    });

    return NextResponse.json({ token }, { status: 200 });
  }

  // If credentials are incorrect, return error response using NextResponse
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

