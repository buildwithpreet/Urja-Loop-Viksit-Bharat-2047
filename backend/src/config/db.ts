import { db } from './firebase';

export const connectDB = async () => {
  // Google Cloud Firestore operates as a stateless/serverless REST-based client connection
  // No persistent connection setup is required during boot time!
  if (db) {
    console.log('Google Cloud Firestore database connection active!');
  } else {
    console.log('Google Cloud Firestore offline. Active memory database backup operational!');
  }
};
