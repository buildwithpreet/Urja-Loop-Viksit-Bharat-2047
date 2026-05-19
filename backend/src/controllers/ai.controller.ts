import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

// Mocking AI Service call
const callAiClassificationService = async (imageUrl: string) => {
  return {
    category: 'plastic',
    confidence: 0.95,
    estimatedWeight: 0.5, // kg
    credits: 10,
    fraudScore: 5 // low fraud
  };
};

export const classifyWaste = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { binId, imageUrl } = req.body;
    const user = req.user;

    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const aiResult = await callAiClassificationService(imageUrl);

    if (db) {
      try {
        const logData = {
          user: user.firebaseId || 'demo-admin-id',
          bin: binId || 'BIN-002',
          imageUrl,
          classification: {
            category: aiResult.category,
            confidence: aiResult.confidence,
            isVerified: aiResult.confidence > 0.8,
          },
          weightEstimate: aiResult.estimatedWeight,
          creditsAwarded: aiResult.credits,
          fraudScore: aiResult.fraudScore,
          createdAt: new Date().toISOString()
        };
        const docRef = await db.collection('wastelogs').add(logData);
        
        // Update User Wallet in Firestore using transactional atomic increment
        if (user.firebaseId) {
          const userRef = db.collection('users').doc(user.firebaseId);
          await db.runTransaction(async (transaction: any) => {
            const userDoc = await transaction.get(userRef);
            if (userDoc.exists) {
              const currentCredits = userDoc.data().carbonCredits || 0;
              transaction.update(userRef, { carbonCredits: currentCredits + aiResult.credits });
            }
          });
        }

        res.status(200).json({ success: true, data: { _id: docRef.id, ...logData } });
        return;
      } catch (e) {
        console.warn('Firestore classifyWaste failed, using fallback:', e);
      }
    }

    // In-memory bypass fallback
    const log = {
      _id: Math.random().toString(36).substring(7),
      user: user.firebaseId || 'demo-admin-id',
      bin: binId || 'BIN-002',
      imageUrl,
      classification: {
        category: aiResult.category,
        confidence: aiResult.confidence,
        isVerified: aiResult.confidence > 0.8,
      },
      weightEstimate: aiResult.estimatedWeight,
      creditsAwarded: aiResult.credits,
      fraudScore: aiResult.fraudScore,
      createdAt: new Date()
    };
    res.status(200).json({ success: true, data: log });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
