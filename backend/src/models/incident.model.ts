import mongoose, { Schema, Document } from "mongoose"

export interface IIncident extends Document {
  title: string
  description: string
  status: "Open" | "In Progress" | "Resolved"
  priority: "Low" | "Medium" | "High" | "Critical"
  assignedTo?: mongoose.Types.ObjectId
  reportedBy?: string
  location?: {
    lat: number
    lng: number
    address: string
  }
  resolutionNotes?: string
  createdAt: Date
  updatedAt: Date
}

const IncidentSchema = new Schema<IIncident>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
  priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  reportedBy: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  resolutionNotes: { type: String }
}, {
  timestamps: true
})

export const Incident = mongoose.model<IIncident>("Incident", IncidentSchema)
