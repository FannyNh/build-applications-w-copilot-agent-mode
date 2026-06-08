import express from 'express';
import Leaderboard from '../models/Leaderboard';

const router = express.Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name email')
    .sort({ totalCalories: -1, totalDuration: -1 });

  res.json(leaderboard.map((entry) => ({
    user: entry.user,
    totalDuration: entry.totalDuration,
    totalCalories: entry.totalCalories,
    activityCount: entry.activityCount,
  })));
});

export default router;
