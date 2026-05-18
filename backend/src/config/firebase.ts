import * as admin from 'firebase-admin';
import { env } from './env';

// Prevent re-initialization error if hot-reloading
if (!admin.apps.length) {
  try {
    if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          // Replace escaped newlines if passed directly from env string
          privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin Initialized');
    } else {
      console.warn('Firebase Admin not initialized: credentials not fully configured in env');
    }
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
}

export const firebaseAdmin = admin;
export const auth = admin.auth();
