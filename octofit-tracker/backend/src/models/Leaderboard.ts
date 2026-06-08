import { Schema, model, Document, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  totalDuration: number;
  totalCalories: number;
  activityCount: number;
  createdAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalDuration: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    activityCount: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
