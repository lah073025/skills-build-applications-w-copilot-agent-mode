import { Router } from 'express';

import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/users/', async (_request, response) => {
  const users = await UserModel.find().sort({ name: 1 });
  response.json({ users });
});

router.get('/teams/', async (_request, response) => {
  const teams = await TeamModel.find().sort({ name: 1 });
  response.json({ teams });
});

router.get('/activities/', async (_request, response) => {
  const activities = await ActivityModel.find().sort({ activityDate: -1 });
  response.json({ activities });
});

router.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 });
  response.json({ leaderboard });
});

router.get('/workouts/', async (_request, response) => {
  const workouts = await WorkoutModel.find().sort({ title: 1 });
  response.json({ workouts });
});

export default router;
