import { Schema, model, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<WorkoutDocument>('Workout', workoutSchema);
