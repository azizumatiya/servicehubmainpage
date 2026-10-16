import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    // Connect to DB
    await clientPromise;

    // Find user by email and explicitly select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Set token in an HttpOnly cookie for better security
    const response = NextResponse.json(
      { message: 'Login successful', user: payload },
      { status: 200 }
    );
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure in production
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}