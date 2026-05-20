import mongoose, { Schema, Document } from "mongoose";

// --- LAND SCHEMA ---
export interface ILand extends Document {
  farmerId: mongoose.Types.ObjectId;
  state: string;
  district: string;
  village: string;
  areaAcres: number;
  location: { lat: number; lng: number };
}
const LandSchema = new Schema<ILand>({
  farmerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  village: { type: String, required: true },
  areaAcres: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { timestamps: true });

// --- CROP CYCLE SCHEMA ---
export interface ICropCycle extends Document {
  landId: mongoose.Types.ObjectId;
  cropType: string;
  season: string;
  expectedHarvestDate: Date;
  status: 'Growing' | 'Harvested';
}
const CropCycleSchema = new Schema<ICropCycle>({
  landId: { type: Schema.Types.ObjectId, ref: 'Land', required: true },
  cropType: { type: String, required: true },
  season: { type: String },
  expectedHarvestDate: { type: Date, required: true },
  status: { type: String, enum: ['Growing', 'Harvested'], default: 'Growing' }
}, { timestamps: true });

// --- AI PREDICTION SCHEMA ---
export interface IAIPrediction extends Document {
  cropCycleId: mongoose.Types.ObjectId;
  predictedWasteKg: number;
  methanePotentialM3: number;
  fertilizerOutputKg: number;
  estimatedEarnings: number;
  confidenceScore: number;
}
const AIPredictionSchema = new Schema<IAIPrediction>({
  cropCycleId: { type: Schema.Types.ObjectId, ref: 'CropCycle', required: true },
  predictedWasteKg: { type: Number, required: true },
  methanePotentialM3: { type: Number, required: true },
  fertilizerOutputKg: { type: Number, required: true },
  estimatedEarnings: { type: Number, required: true },
  confidenceScore: { type: Number, required: true }
}, { timestamps: true });

// --- DIGESTER SCHEMA ---
export interface IDigester extends Document {
  plantId: string;
  capacityKg: number;
  currentLoadKg: number;
  status: 'Active' | 'Maintenance' | 'Offline';
  telemetry: {
    ph: number;
    temperature: number;
    pressure: number;
    methaneOutput: number;
    lastUpdated: Date;
  };
}
const DigesterSchema = new Schema<IDigester>({
  plantId: { type: String, required: true, unique: true },
  capacityKg: { type: Number, required: true },
  currentLoadKg: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Maintenance', 'Offline'], default: 'Active' },
  telemetry: {
    ph: { type: Number, default: 7.0 },
    temperature: { type: Number, default: 35.0 },
    pressure: { type: Number, default: 1.0 },
    methaneOutput: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  }
}, { timestamps: true });

// --- PRODUCT SCHEMA ---
export interface IProduct extends Document {
  name: string;
  type: 'Fertilizer' | 'Compost' | 'Bio-CNG' | 'Slurry';
  description: string;
  pricePerUnit: number;
  unit: string;
  stockAvailable: number;
}
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  type: { type: String, enum: ['Fertilizer', 'Compost', 'Bio-CNG', 'Slurry'], required: true },
  description: { type: String },
  pricePerUnit: { type: Number, required: true },
  unit: { type: String, required: true },
  stockAvailable: { type: Number, required: true }
}, { timestamps: true });

// --- ORDER SCHEMA ---
export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  products: Array<{ productId: mongoose.Types.ObjectId, quantity: number }>;
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
}
const OrderSchema = new Schema<IOrder>({
  buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Shipped', 'Delivered'], default: 'Pending' }
}, { timestamps: true });

// Exports
export const Land = mongoose.model<ILand>('Land', LandSchema);
export const CropCycle = mongoose.model<ICropCycle>('CropCycle', CropCycleSchema);
export const AIPrediction = mongoose.model<IAIPrediction>('AIPrediction', AIPredictionSchema);
export const Digester = mongoose.model<IDigester>('Digester', DigesterSchema);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);
export const Order = mongoose.model<IOrder>('Order', OrderSchema);
