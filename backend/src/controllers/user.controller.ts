import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import crypto from 'crypto';
import { db } from '../config/firebase';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firebaseId, email, fullName, phoneNumber, address, role } = req.body;

    if (db) {
      try {
        const existingDoc = await db.collection('users').doc(firebaseId).get();
        if (existingDoc.exists) {
          res.status(400).json({ success: false, message: 'User already exists' });
          return;
        }
        const qrIdentity = crypto.randomBytes(16).toString('hex');
        const newUser = {
          firebaseId,
          email,
          role: role || 'citizen',
          profile: { fullName, phoneNumber, address },
          qrIdentity,
          carbonCredits: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await db.collection('users').doc(firebaseId).set(newUser);
        res.status(201).json({ success: true, data: newUser });
        return;
      } catch (e) {
        console.warn('Firestore registerUser failed, using fallback:', e);
      }
    }

    const qrIdentity = crypto.randomBytes(16).toString('hex');
    const newUser = {
      firebaseId,
      email,
      role: role || 'citizen',
      profile: { fullName, phoneNumber, address },
      qrIdentity,
      carbonCredits: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    
    if (db && user?.firebaseId) {
      try {
        const doc = await db.collection('users').doc(user.firebaseId).get();
        if (doc.exists) {
          res.status(200).json({ success: true, data: doc.data() });
          return;
        }
      } catch (e) {
        console.warn('Firestore getProfile failed, using fallback:', e);
      }
    }

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWallet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (db && user?.firebaseId) {
      try {
        const doc = await db.collection('users').doc(user.firebaseId).get();
        if (doc.exists) {
          const userData = doc.data();
          res.status(200).json({ 
            success: true, 
            data: { carbonCredits: userData?.carbonCredits || 100, qrIdentity: userData?.qrIdentity || "demo-qr-token-123456789" } 
          });
          return;
        }
      } catch (e) {
        console.warn('Firestore getWallet failed, using fallback:', e);
      }
    }

    res.status(200).json({ 
      success: true, 
      data: { carbonCredits: user?.carbonCredits || 100, qrIdentity: user?.qrIdentity || "demo-qr-token-123456789" } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
