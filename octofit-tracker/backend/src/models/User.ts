import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    favoriteActivity: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const UserModel = model('User', userSchema);
