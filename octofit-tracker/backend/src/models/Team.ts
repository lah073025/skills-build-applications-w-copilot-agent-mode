import { model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    captainName: { type: String, required: true },
    members: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const TeamModel = model('Team', teamSchema);
