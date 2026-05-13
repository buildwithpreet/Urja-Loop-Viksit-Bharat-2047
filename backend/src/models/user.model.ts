import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseId: string;
  email: string;
  role: 'citizen' | 'admin' | 'municipal';
  profile: {
    fullName: string;
    phoneNumber?: string;
    address?: string;
  };
  carbonCredits: number;
  qrIdentity: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    firebaseId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['citizen', 'admin', 'municipal'], default: 'citizen' },
    profile: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String },
      address: { type: String },
    },
    carbonCredits: { type: Number, default: 0 },
    qrIdentity: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
