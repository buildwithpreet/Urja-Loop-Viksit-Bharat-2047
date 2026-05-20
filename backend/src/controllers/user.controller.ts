import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/firebase';
import { env } from '../config/env';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullName, phoneNumber, address, role } = req.body;

    if (!email || !password || !phoneNumber) {
      res.status(400).json({ success: false, message: 'Email, password, and phone number are required' });
      return;
    }

    const userId = email.toLowerCase().trim();

    if (db) {
      try {
        const existingDoc = await db.collection('users').doc(userId).get();
        if (existingDoc.exists) {
          res.status(400).json({ success: false, message: 'User already exists with this email' });
          return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const qrIdentity = crypto.randomBytes(16).toString('hex');

        const newUser = {
          firebaseId: userId,
          email: userId,
          password: hashedPassword,
          role: role || 'citizen',
          profile: { fullName: fullName || '', phoneNumber, address: address || '' },
          qrIdentity,
          carbonCredits: 100,
          wasteCollected: 0,
          co2Saved: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await db.collection('users').doc(userId).set(newUser);
        const token = jwt.sign({ id: userId, role: newUser.role }, env.JWT_SECRET, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({ success: true, token, data: userWithoutPassword });
        return;
      } catch (e) {
        console.warn('Firestore registerUser failed:', e);
      }
    }

    res.status(500).json({ success: false, message: 'Database connection failed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, email, password } = req.body;

    if ((!phone && !email) || !password) {
      res.status(400).json({ success: false, message: 'Email (or phone) and password are required' });
      return;
    }

    if (db) {
      try {
        let snapshot: any;

        if (email) {
          // Login by email — email is used as document ID
          const emailId = email.toLowerCase().trim();
          const doc = await db.collection('users').doc(emailId).get();
          if (doc.exists) {
            snapshot = { empty: false, docs: [doc] };
          } else {
            snapshot = { empty: true };
          }
        } else {
          // Login by phone number
          const usersRef = db.collection('users');
          snapshot = await usersRef.where('profile.phoneNumber', '==', phone).limit(1).get();
        }

        if (!snapshot || snapshot.empty) {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
          return;
        }

        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
          return;
        }

        const token = jwt.sign({ id: user.firebaseId, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({ success: true, token, data: userWithoutPassword });
        return;
      } catch (e) {
        console.warn('Firestore loginUser failed:', e);
      }
    }

    res.status(500).json({ success: false, message: 'Database connection failed' });
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
          const { password: _, ...userData } = doc.data() as any;
          res.status(200).json({ success: true, data: userData });
          return;
        }
      } catch (e) { console.warn('Firestore getProfile failed:', e); }
    }

    const { password: _, ...userData } = user as any;
    res.status(200).json({ success: true, data: userData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const { fullName, phoneNumber, address, bio, avatar } = req.body;

    const updates: any = { updatedAt: new Date().toISOString() };
    if (fullName) updates['profile.fullName'] = fullName;
    if (phoneNumber) updates['profile.phoneNumber'] = phoneNumber;
    if (address) updates['profile.address'] = address;
    if (bio) updates['profile.bio'] = bio;
    if (avatar) updates['profile.avatar'] = avatar;

    if (db && user?.firebaseId) {
      try {
        await db.collection('users').doc(user.firebaseId).update(updates);
        const doc = await db.collection('users').doc(user.firebaseId).get();
        const { password: _, ...userData } = doc.data() as any;
        res.status(200).json({ success: true, data: userData });
        return;
      } catch (e) { console.warn('Firestore updateProfile failed:', e); }
    }

    res.status(200).json({ success: true, data: { ...user, profile: { ...user?.profile, ...req.body } } });
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
            data: { carbonCredits: userData?.carbonCredits || 100, qrIdentity: userData?.qrIdentity || 'demo-qr-token' }
          });
          return;
        }
      } catch (e) { console.warn('Firestore getWallet failed:', e); }
    }

    res.status(200).json({ success: true, data: { carbonCredits: user?.carbonCredits || 100, qrIdentity: user?.qrIdentity || 'demo-qr-token' } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWasteHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const { limit = 20, page = 1 } = req.query;

    if (db && user?.firebaseId) {
      try {
        const snapshot = await db.collection('wastelogs')
          .where('user', '==', user.firebaseId)
          .limit(Number(limit))
          .get();

        const logs = snapshot.docs.map((d: any) => ({ _id: d.id, ...d.data() }));
        res.status(200).json({ success: true, data: logs, total: logs.length });
        return;
      } catch (e) { console.warn('Firestore getWasteHistory failed:', e); }
    }

    res.status(200).json({
      success: true,
      data: [
        { _id: 'log-1', classification: { category: 'plastic', confidence: 0.95 }, creditsAwarded: 15, createdAt: new Date(Date.now() - 3600000).toISOString() },
        { _id: 'log-2', classification: { category: 'organic', confidence: 0.92 }, creditsAwarded: 10, createdAt: new Date(Date.now() - 7200000).toISOString() }
      ],
      total: 2
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCarbonImpact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (db && user?.firebaseId) {
      try {
        const [userDoc, logsSnap] = await Promise.all([
          db.collection('users').doc(user.firebaseId).get(),
          db.collection('wastelogs').where('user', '==', user.firebaseId).get()
        ]);

        const userData = userDoc.exists ? userDoc.data() : {};
        const logs = logsSnap.docs.map((d: any) => d.data());
        const totalScans = logs.length;
        const totalCredits = logs.reduce((s: number, l: any) => s + (l.creditsAwarded || 0), 0);
        const co2Saved = logs.reduce((s: number, l: any) => s + (l.co2Saved || 0.3), 0);

        res.status(200).json({
          success: true,
          data: {
            totalScans,
            totalCredits: userData?.carbonCredits || totalCredits,
            co2SavedKg: Math.round(co2Saved * 10) / 10,
            treesEquivalent: Math.round(co2Saved / 21 * 10) / 10,
            sustainabilityScore: Math.min(100, Math.round(totalScans * 2.5)),
            wasteCollectedKg: userData?.wasteCollected || Math.round(totalScans * 0.5 * 10) / 10,
            rank: 'Guardian 🌳',
            badges: ['First Scan', 'Plastic Warrior', 'Eco Champion']
          }
        });
        return;
      } catch (e) { console.warn('Firestore getCarbonImpact failed:', e); }
    }

    res.status(200).json({
      success: true,
      data: {
        totalScans: 24, totalCredits: user?.carbonCredits || 100,
        co2SavedKg: 7.2, treesEquivalent: 0.34, sustainabilityScore: 60,
        wasteCollectedKg: 12.0, rank: 'Guardian 🌳',
        badges: ['First Scan', 'Plastic Warrior']
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
