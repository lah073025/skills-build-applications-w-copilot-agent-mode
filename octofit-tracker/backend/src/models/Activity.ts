import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true },
);

export const ActivityModel = model('Activity', activitySchema);
