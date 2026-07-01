import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = request.headers.get('Authorization');
    const { id } = await params;
    await connectToDatabase();
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const updates = await request.json();
      const product = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!product) return NextResponse.json({ success: false }, { status: 404 });
      return NextResponse.json({ success: true, product }, { status: 200 });
    }
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = parseFloat(formData.get('price') as string);
      const isFuture = formData.get('isFuture') === 'true';
      
      // Kept existing images
      const existingImages = formData.getAll('existingImages') as string[];
      
      const newImagePaths: string[] = [];
      
      // Handle new files
      for (const [key, value] of formData.entries()) {
        if (key === 'newImages' && value instanceof File) {
          const file = value;
          const buffer = Buffer.from(await file.arrayBuffer());
          
          // dynamic import path/fs since this runs on Node
          const path = require('path');
          const fs = require('fs/promises');
          const { v4: uuidv4 } = require('uuid');
          
          const ext = path.extname(file.name);
          const fileName = `${uuidv4()}${ext}`;
          
          const uploadDir = path.join(process.cwd(), 'public/uploads');
          const filePath = path.join(uploadDir, fileName);
          
          await fs.mkdir(uploadDir, { recursive: true });
          await fs.writeFile(filePath, buffer);
          newImagePaths.push(`/uploads/${fileName}`);
        }
      }
      
      const allImages = [...existingImages, ...newImagePaths];
      
      const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        images: allImages,
        isFuture,
      }, { new: true });
      
      if (!product) return NextResponse.json({ success: false }, { status: 404 });
      return NextResponse.json({ success: true, product }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: 'Invalid Content-Type' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
