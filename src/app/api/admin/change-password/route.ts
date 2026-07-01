import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Admin } from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });

    const { oldPassword, newPassword } = await request.json();
    await connectToDatabase();

    const admin = await Admin.findOne({});
    if (!admin) return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });

    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Incorrect old password' }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = newHash;
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
