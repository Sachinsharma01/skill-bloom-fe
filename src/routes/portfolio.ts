import express from 'express';
import { authenticateToken } from '../middleware/auth';
import Portfolio from '../models/Portfolio';

const router = express.Router();

// Get portfolio data
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save portfolio data
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { portfolioData } = req.body;
    
    // Validate required fields
    if (!portfolioData.personal.name || !portfolioData.personal.email || !portfolioData.personal.about) {
      return res.status(400).json({ message: 'Missing required personal information' });
    }
    
    if (!portfolioData.skills || portfolioData.skills.length === 0) {
      return res.status(400).json({ message: 'At least one skill is required' });
    }

    // Check if portfolio exists
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findOneAndUpdate(
        { userId: req.user.id },
        { $set: portfolioData },
        { new: true }
      );
    } else {
      // Create new portfolio
      portfolio = new Portfolio({
        userId: req.user.id,
        ...portfolioData
      });
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete portfolio
router.delete('/', authenticateToken, async (req: any, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 