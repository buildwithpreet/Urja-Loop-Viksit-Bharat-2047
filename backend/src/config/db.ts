import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  if (!env.MONGO_URI) {
    console.warn('MongoDB URI is not configured in env. Skipping database connection.');
    return;
  }
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};
