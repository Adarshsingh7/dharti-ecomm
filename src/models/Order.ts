import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrder extends Document {
  product: mongoose.Types.ObjectId;
  userName: string;
  mobileNumber: string;
  address: string;
  contact: string; // Alt contact or email
  paymentMethod: string;
  status: 'Pending' | 'Processed' | 'Delivered';
  createdAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: false },
  paymentMethod: { type: String, default: 'COD' },
  status: { type: String, enum: ['Pending', 'Processed', 'Delivered'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model('Order', OrderSchema);
