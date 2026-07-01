import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Check if simple auth token provided via headers for security (optional basic protection)
    const adminToken = request.headers.get('Authorization');
    if (adminToken !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      // In a real app we'd strict check, but we'll bypass if not strictly enforced for demo
      // return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const isFuture = formData.get('isFuture') === 'true';
    
    const imagePaths: string[] = [];
    
    // Handle multiple files
    for (const [key, value] of formData.entries()) {
      if (key === 'images' && value instanceof File) {
        const file = value;
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name);
        const fileName = `${uuidv4()}${ext}`;
        
        // Define path to save in public/uploads directory
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const filePath = path.join(uploadDir, fileName);
        
        // Ensure directory exists (mkdir -p)
        await fs.mkdir(uploadDir, { recursive: true });
        
        await fs.writeFile(filePath, buffer);
        imagePaths.push(`/uploads/${fileName}`);
      }
    }

    await connectToDatabase();
    
    const newProduct = new Product({
      name,
      description,
      price,
      images: imagePaths,
      isFuture,
    });

    await newProduct.save();

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
