import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Contact } from '@/models/Contact';

export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('Authorization');
    // Admin basic check skipped for demo

    await connectToDatabase();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    await connectToDatabase();
    
    const newContact = new Contact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    await newContact.save();

    return NextResponse.json({ success: true, contact: newContact }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
