import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseId: string;
  email: string;
  role: 'farmer' | 'collector' | 'plant_operator' | 'admin' | 'vendor' | 'super_admin' | 'citizen';
  profile: {
    fullName: string;
    phoneNumber?: string;
    address?: string;
  };
  carbonCredits: number;
  qrIdentity: string;
  sustainabilityScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    firebaseId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      enum: ['farmer', 'collector', 'plant_operator', 'admin', 'vendor', 'super_admin', 'citizen'], 
      default: 'citizen' 
    },
    profile: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String },
      address: { type: String },
    },
    carbonCredits: { type: Number, default: 0 },
    qrIdentity: { type: String, required: true, unique: true },
    sustainabilityScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
