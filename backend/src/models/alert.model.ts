import mongoose, { Schema, Document } from "mongoose"

export interface IAlert extends Document {
  type: string
  severity: "Low" | "Medium" | "High" | "Critical"
  message: string
  location?: string
  binId?: mongoose.Types.ObjectId
  resolved: boolean
  createdAt: Date
  updatedAt: Date
}

const AlertSchema = new Schema<IAlert>({
  type: { type: String, required: true },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
  message: { type: String, required: true },
  location: { type: String },
  binId: { type: Schema.Types.ObjectId, ref: "Bin" },
  resolved: { type: Boolean, default: false }
}, {
  timestamps: true
})

export const Alert = mongoose.model<IAlert>("Alert", AlertSchema)
