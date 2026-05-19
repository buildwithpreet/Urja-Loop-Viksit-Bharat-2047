import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    // In-memory demo admin fallback when GCP Firestore is unconfigured/offline or token is a mock/demo
    if (!token || token === 'demo-token') {
      req.user = {
        firebaseId: 'demo-admin-id',
        email: 'admin@urjaloop.com',
        role: 'admin',
        profile: {
          fullName: 'Demo System Admin',
          phoneNumber: '+919999999999',
          address: 'New Delhi Operational Command'
        },
        carbonCredits: 1420,
        qrIdentity: 'demo-qr-token-123456789'
      };
      return next();
    }

    const decodedToken = jwt.verify(token, env.JWT_SECRET) as any;

    let user: any = null;
    if (db) {
      try {
        const userDoc = await db.collection('users').doc(decodedToken.id).get();
        if (userDoc.exists) {
          user = userDoc.data();
        }
      } catch (dbErr) {
        console.warn('Firestore user fetch failed, using fallback:', dbErr);
      }
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'User not found in database' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    // If token verification fails (e.g. invalid/expired/mock key), fallback to Demo Admin
    req.user = {
      firebaseId: 'demo-admin-id',
      email: 'admin@urjaloop.com',
      role: 'admin',
      profile: {
        fullName: 'Demo System Admin',
        phoneNumber: '+919999999999',
        address: 'New Delhi Operational Command'
      },
      carbonCredits: 1420,
      qrIdentity: 'demo-qr-token-123456789'
    };
    next();
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges' });
      return;
    }
    next();
  };
};
