import express from 'express';
import Team from '../models/Team';

const router = express.Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

export default router;
