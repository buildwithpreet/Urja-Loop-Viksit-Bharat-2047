import mongoose, { Schema, Document } from 'mongoose';

export interface IRoute extends Document {
  fleetId: string; // Identifier for the truck/driver
  assignedBins: mongoose.Types.ObjectId[];
  status: 'pending' | 'in-progress' | 'completed';
  optimizedPath: {
    distance: number; // km
    duration: number; // minutes
    polyline: string; // Google Maps encoded polyline
  };
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const routeSchema: Schema = new Schema(
  {
    fleetId: { type: String, required: true, index: true },
    assignedBins: [{ type: Schema.Types.ObjectId, ref: 'Bin' }],
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    optimizedPath: {
      distance: { type: Number },
      duration: { type: Number },
      polyline: { type: String },
    },
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export const Route = mongoose.model<IRoute>('Route', routeSchema);
