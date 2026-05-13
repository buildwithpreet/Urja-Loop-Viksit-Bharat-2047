import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';
import crypto from 'crypto';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firebaseId, email, fullName, phoneNumber, address, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ firebaseId }, { email }] });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    // Generate unique QR identity
    const qrIdentity = crypto.randomBytes(16).toString('hex');

    const newUser = await User.create({
      firebaseId,
      email,
      role: role || 'citizen',
      profile: { fullName, phoneNumber, address },
      qrIdentity,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWallet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    res.status(200).json({ 
      success: true, 
      data: { carbonCredits: user?.carbonCredits, qrIdentity: user?.qrIdentity } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
