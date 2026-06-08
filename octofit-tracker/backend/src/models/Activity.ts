import { Schema, model, Document, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  recordedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    recordedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<ActivityDocument>('Activity', activitySchema);
