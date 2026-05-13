import { Request, Response } from 'express';
import { WasteLog } from '../models/wastelog.model';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Mocking AI Service call
const callAiClassificationService = async (imageUrl: string) => {
  // In production, this would call Roboflow or Teachable Machine API
  // Using a mock response for now
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

    // Call AI Service
    const aiResult = await callAiClassificationService(imageUrl);

    // Save to WasteLog
    const log = await WasteLog.create({
      user: user._id,
      bin: binId,
      imageUrl,
      classification: {
        category: aiResult.category,
        confidence: aiResult.confidence,
        isVerified: aiResult.confidence > 0.8,
      },
      weightEstimate: aiResult.estimatedWeight,
      creditsAwarded: aiResult.credits,
      fraudScore: aiResult.fraudScore,
    });

    // Update User Wallet
    await User.findByIdAndUpdate(user._id, {
      $inc: { carbonCredits: aiResult.credits }
    });

    res.status(200).json({ success: true, data: log });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
