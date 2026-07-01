import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Admin } from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    await connectToDatabase();

    let admin = await Admin.findOne({});
    
    // Auto-seed default password if none exists
    if (!admin) {
      const defaultPasswordHash = await bcrypt.hash('admin123', 10);
      admin = new Admin({ passwordHash: defaultPasswordHash });
      await admin.save();
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    const token = await signToken({ admin: true });
    
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
