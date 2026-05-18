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
          privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin Initialized with Service Account');
    } else {
      // Fallback to Application Default Credentials on GCP/Cloud Run
      admin.initializeApp();
      console.log('Firebase Admin Initialized with Application Default Credentials');
    }
  } catch (error) {
    console.warn('Firebase Admin Certification loading failed, trying Mock/Local fallback:', error);
    try {
      admin.initializeApp({
        projectId: 'urjaloop-fallback-mock',
      });
      console.log('Firebase Admin Initialized in Mock Mode');
    } catch (e) {
      console.error('Failed to initialize fallback mock app:', e);
    }
  }
}

export const firebaseAdmin = admin;
export const auth = admin.auth();
