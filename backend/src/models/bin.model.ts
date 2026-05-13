import mongoose, { Schema, Document } from 'mongoose';

export interface IBin extends Document {
  binId: string; // Hardware ID from ESP32
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  address: string;
  capacity: number; // in liters
  currentFillLevel: number; // percentage 0-100
  status: 'active' | 'maintenance' | 'offline';
  lastPing: Date;
  batteryLevel: number; // percentage 0-100
  createdAt: Date;
  updatedAt: Date;
}

const binSchema: Schema = new Schema(
  {
    binId: { type: String, required: true, unique: true, index: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    address: { type: String },
    capacity: { type: Number, required: true },
    currentFillLevel: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'maintenance', 'offline'], default: 'active' },
    lastPing: { type: Date, default: Date.now },
    batteryLevel: { type: Number, default: 100 },
  },
  { timestamps: true }
);

// 2dsphere index for geo-spatial queries
binSchema.index({ location: '2dsphere' });

export const Bin = mongoose.model<IBin>('Bin', binSchema);
