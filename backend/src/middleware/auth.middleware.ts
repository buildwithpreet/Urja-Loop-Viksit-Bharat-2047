import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
import { User, IUser } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: IUser;
  firebaseUser?: any;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      res.status(401).json({ success: false, message: 'No token provided' });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.firebaseUser = decodedToken;

    const user = await User.findOne({ firebaseId: decodedToken.uid });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found in database' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
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
