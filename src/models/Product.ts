import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  isActive: boolean;
  createdAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model('Product', ProductSchema);
