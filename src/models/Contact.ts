import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
