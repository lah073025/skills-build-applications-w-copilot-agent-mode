import { model, Schema } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true },
    exercises: [exerciseSchema],
  },
  { timestamps: true },
);

export const WorkoutModel = model('Workout', workoutSchema);
