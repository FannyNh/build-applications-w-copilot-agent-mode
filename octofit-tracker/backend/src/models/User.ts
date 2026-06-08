import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  joinedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joinedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<UserDocument>('User', userSchema);
