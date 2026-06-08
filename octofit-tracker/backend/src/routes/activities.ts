import express from 'express';
import Activity from '../models/Activity';

const router = express.Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').sort({ recordedAt: -1 });
  res.json(activities);
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

export default router;
