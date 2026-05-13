import mongoose, { Schema, Document } from 'mongoose';

export interface IWasteLog extends Document {
  user: mongoose.Types.ObjectId;
  bin: mongoose.Types.ObjectId;
  imageUrl: string;
  classification: {
    category: string; // e.g., 'plastic', 'organic', 'ewaste'
    confidence: number;
    isVerified: boolean;
  };
  weightEstimate: number; // in kg
  creditsAwarded: number;
  fraudScore: number; // 0-100
  createdAt: Date;
}

const wasteLogSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bin: { type: Schema.Types.ObjectId, ref: 'Bin', required: true, index: true },
    imageUrl: { type: String, required: true },
    classification: {
      category: { type: String, required: true },
      confidence: { type: Number, required: true },
      isVerified: { type: Boolean, default: false },
    },
    weightEstimate: { type: Number, default: 0 },
    creditsAwarded: { type: Number, default: 0 },
    fraudScore: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const WasteLog = mongoose.model<IWasteLog>('WasteLog', wasteLogSchema);
