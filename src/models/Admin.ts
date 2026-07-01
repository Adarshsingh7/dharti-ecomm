import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmin extends Document {
  passwordHash: string;
}

const AdminSchema: Schema<IAdmin> = new Schema({
  passwordHash: { type: String, required: true },
});

export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
