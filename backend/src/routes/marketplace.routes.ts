import { Router } from 'express';
import { Product, Order } from '../models/biogrid.model';

const router = Router();

// Mock authentication middleware
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { id: 'dummy_buyer_id' };
  next();
};

router.get('/products', async (req, res) => {
  try {
    // const products = await Product.find();
    res.status(200).json({ success: true, data: [
      { id: '1', name: 'Premium Organic Fertilizer', type: 'Fertilizer', pricePerUnit: 500, unit: '50kg Bag' },
      { id: '2', name: 'Bio-Slurry Liquid', type: 'Slurry', pricePerUnit: 200, unit: '10L Can' }
    ] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/orders/create', mockAuth, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const newOrder = new Order({ buyerId: req.user.id, products, totalAmount });
    // await newOrder.save();
    
    // Simulate payment processing here
    res.status(201).json({ success: true, message: 'Order created successfully', data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders/history', mockAuth, async (req, res) => {
  try {
    // const orders = await Order.find({ buyerId: req.user.id });
    res.status(200).json({ success: true, data: [] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
