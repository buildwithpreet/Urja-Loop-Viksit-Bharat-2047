import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

const CREDIT_TIERS = [
  { name: 'Seed', min: 0, max: 499, badge: '🌱' },
  { name: 'Sprout', min: 500, max: 1499, badge: '🌿' },
  { name: 'Guardian', min: 1500, max: 4999, badge: '🌳' },
  { name: 'Champion', min: 5000, max: 14999, badge: '🏆' },
  { name: 'Legend', min: 15000, max: Infinity, badge: '⭐' }
];

const getTier = (credits: number) => CREDIT_TIERS.find(t => credits >= t.min && credits <= t.max) || CREDIT_TIERS[0];

export const getRewardsBalance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId;

    if (db && userId) {
      try {
        const [userDoc, historySnap] = await Promise.all([
          db.collection('users').doc(userId).get(),
          db.collection('reward_transactions').where('userId', '==', userId).orderBy ? 
            db.collection('reward_transactions').where('userId', '==', userId).limit(20).get() :
            db.collection('reward_transactions').where('userId', '==', userId).get()
        ]);

        if (userDoc.exists) {
          const user = userDoc.data();
          const credits = user?.carbonCredits || 0;
          const tier = getTier(credits);
          const history = historySnap.docs.map((d: any) => ({ _id: d.id, ...d.data() }));

          res.status(200).json({
            success: true,
            data: { credits, tier, history, wasteCollected: user?.wasteCollected || 0, co2Saved: user?.co2Saved || 0 }
          });
          return;
        }
      } catch (e) { console.warn('Firestore getRewardsBalance failed:', e); }
    }

    const credits = req.user?.carbonCredits || 100;
    res.status(200).json({
      success: true,
      data: { credits, tier: getTier(credits), history: [], wasteCollected: 2.4, co2Saved: 1.2 }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, amount, reason, wasteType } = req.body;
    const targetUserId = userId || req.user?.firebaseId;

    if (!targetUserId || !amount) {
      res.status(400).json({ success: false, message: 'userId and amount are required' });
      return;
    }

    if (db) {
      try {
        const userRef = db.collection('users').doc(targetUserId);
        let newBalance = 0;

        await db.runTransaction(async (tx: any) => {
          const userDoc = await tx.get(userRef);
          if (!userDoc.exists) throw new Error('User not found');
          const current = userDoc.data().carbonCredits || 0;
          newBalance = current + amount;
          tx.update(userRef, { carbonCredits: newBalance, updatedAt: new Date().toISOString() });
        });

        const transaction = {
          userId: targetUserId, amount, type: 'credit', reason: reason || 'Waste Scan',
          wasteType: wasteType || 'general', balance: newBalance, createdAt: new Date().toISOString()
        };
        await db.collection('reward_transactions').add(transaction);

        res.status(200).json({ success: true, data: { newBalance, transaction, tier: getTier(newBalance) } });
        return;
      } catch (e) { console.warn('Firestore addCredits failed:', e); }
    }

    res.status(200).json({ success: true, data: { newBalance: (req.user?.carbonCredits || 100) + amount, transaction: { amount, reason } } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const redeemCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, itemId, itemName } = req.body;
    const userId = req.user?.firebaseId;

    if (!amount) { res.status(400).json({ success: false, message: 'amount is required' }); return; }

    if (db && userId) {
      try {
        const userRef = db.collection('users').doc(userId);
        let newBalance = 0;

        await db.runTransaction(async (tx: any) => {
          const userDoc = await tx.get(userRef);
          if (!userDoc.exists) throw new Error('User not found');
          const current = userDoc.data().carbonCredits || 0;
          if (current < amount) throw new Error('Insufficient credits');
          newBalance = current - amount;
          tx.update(userRef, { carbonCredits: newBalance, updatedAt: new Date().toISOString() });
        });

        const redemption = {
          userId, amount, type: 'debit', reason: `Redeemed: ${itemName || itemId || 'Marketplace Item'}`,
          itemId: itemId || null, balance: newBalance, createdAt: new Date().toISOString()
        };
        await db.collection('reward_transactions').add(redemption);

        res.status(200).json({ success: true, data: { newBalance, redemption, tier: getTier(newBalance) } });
        return;
      } catch (e: any) {
        if (e.message === 'Insufficient credits') {
          res.status(400).json({ success: false, message: 'Insufficient credits' });
          return;
        }
        console.warn('Firestore redeemCredits failed:', e);
      }
    }

    res.status(200).json({ success: true, data: { newBalance: Math.max(0, (req.user?.carbonCredits || 100) - amount), message: 'Credits redeemed (demo mode)' } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRewardHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId;
    const { limit = 20, type } = req.query;

    if (db && userId) {
      try {
        let queryRef: any = db.collection('reward_transactions').where('userId', '==', userId);
        if (type) queryRef = queryRef.where('type', '==', type);
        const snapshot = await queryRef.limit(Number(limit)).get();
        const history = snapshot.docs.map((d: any) => ({ _id: d.id, ...d.data() }));
        res.status(200).json({ success: true, data: history });
        return;
      } catch (e) { console.warn('Firestore getRewardHistory failed:', e); }
    }

    res.status(200).json({
      success: true,
      data: [
        { _id: 'tx-1', amount: 15, type: 'credit', reason: 'Plastic Bottle Scan', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { _id: 'tx-2', amount: 10, type: 'credit', reason: 'Organic Waste Scan', createdAt: new Date(Date.now() - 7200000).toISOString() },
        { _id: 'tx-3', amount: 50, type: 'debit', reason: 'Redeemed: Tree Sapling', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ]
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
