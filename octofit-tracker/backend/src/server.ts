import express from 'express';
import userRouter from './routes/users';
import teamRouter from './routes/teams';
import activityRouter from './routes/activities';
import workoutRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';
import { connectDatabase, MONGO_URL } from './config/database';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const PORT = 8000;

connectDatabase()
  .then(() => console.log('Connected to MongoDB', MONGO_URL))
  .catch((err) => console.error('MongoDB connection error', err));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port: PORT });
});

app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/activities', activityRouter);
app.use('/api/workouts', workoutRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
