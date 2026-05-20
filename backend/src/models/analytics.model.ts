import mongoose, { Schema, Document } from "mongoose"

export interface IAnalytics extends Document {
  date: Date
  totalWasteCollected: number // in kg
  recyclingRatio: number // percentage
  organicWasteRatio: number // percentage
  aiAccuracy: number // percentage
  carbonSaved: number // in kg
  activeDevices: number
  totalAlerts: number
}

const AnalyticsSchema = new Schema<IAnalytics>({
  date: { type: Date, required: true, unique: true },
  totalWasteCollected: { type: Number, default: 0 },
  recyclingRatio: { type: Number, default: 0 },
  organicWasteRatio: { type: Number, default: 0 },
  aiAccuracy: { type: Number, default: 0 },
  carbonSaved: { type: Number, default: 0 },
  activeDevices: { type: Number, default: 0 },
  totalAlerts: { type: Number, default: 0 }
}, {
  timestamps: true
})

export const Analytics = mongoose.model<IAnalytics>("Analytics", AnalyticsSchema)
