import mongoose from 'mongoose';

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  return mongoose.connect(MONGO_URL);
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}
