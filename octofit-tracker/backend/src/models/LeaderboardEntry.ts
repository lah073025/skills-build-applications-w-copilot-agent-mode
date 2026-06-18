import { model, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntryModel = model('LeaderboardEntry', leaderboardEntrySchema);
