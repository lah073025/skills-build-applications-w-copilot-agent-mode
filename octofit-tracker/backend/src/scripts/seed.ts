import dotenv from 'dotenv';

import { connectDatabase, disconnectDatabase } from '../database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await UserModel.insertMany([
    {
      name: 'Mona Rodriguez',
      email: 'mona.rodriguez@example.com',
      role: 'Team Captain',
      favoriteActivity: 'Cycling',
      weeklyGoalMinutes: 240,
    },
    {
      name: 'Avery Chen',
      email: 'avery.chen@example.com',
      role: 'Member',
      favoriteActivity: 'Trail Running',
      weeklyGoalMinutes: 180,
    },
    {
      name: 'Jordan Patel',
      email: 'jordan.patel@example.com',
      role: 'Member',
      favoriteActivity: 'Strength Training',
      weeklyGoalMinutes: 210,
    },
  ]);

  await TeamModel.insertMany([
    {
      name: 'Velocity Vipers',
      description: 'Cyclists and runners focused on weekly endurance streaks.',
      captainName: 'Mona Rodriguez',
      members: ['Mona Rodriguez', 'Avery Chen'],
    },
    {
      name: 'Core Crushers',
      description: 'Strength and mobility group building consistent full-body habits.',
      captainName: 'Jordan Patel',
      members: ['Jordan Patel'],
    },
  ]);

  await ActivityModel.insertMany([
    {
      userName: 'Mona Rodriguez',
      activityType: 'Cycling',
      durationMinutes: 52,
      caloriesBurned: 520,
      activityDate: new Date('2026-06-15T13:30:00Z'),
      notes: 'Hill intervals on the river loop.',
    },
    {
      userName: 'Avery Chen',
      activityType: 'Trail Running',
      durationMinutes: 38,
      caloriesBurned: 410,
      activityDate: new Date('2026-06-16T11:00:00Z'),
      notes: 'Moderate climb with a fast final kilometer.',
    },
    {
      userName: 'Jordan Patel',
      activityType: 'Strength Training',
      durationMinutes: 45,
      caloriesBurned: 360,
      activityDate: new Date('2026-06-17T18:15:00Z'),
      notes: 'Upper-body push session with accessory core work.',
    },
  ]);

  await LeaderboardEntryModel.insertMany([
    {
      userName: 'Mona Rodriguez',
      teamName: 'Velocity Vipers',
      points: 1280,
      rank: 1,
    },
    {
      userName: 'Jordan Patel',
      teamName: 'Core Crushers',
      points: 1125,
      rank: 2,
    },
    {
      userName: 'Avery Chen',
      teamName: 'Velocity Vipers',
      points: 990,
      rank: 3,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Endurance Builder Ride',
      focusArea: 'Cardio',
      difficulty: 'Intermediate',
      durationMinutes: 50,
      suggestedFor: 'Cyclists building sustained power',
      exercises: [
        { name: 'Warm-up spin', sets: 1, reps: '10 minutes' },
        { name: 'Tempo intervals', sets: 4, reps: '6 minutes' },
        { name: 'Cool-down spin', sets: 1, reps: '8 minutes' },
      ],
    },
    {
      title: 'Trail Runner Stability',
      focusArea: 'Mobility',
      difficulty: 'Beginner',
      durationMinutes: 30,
      suggestedFor: 'Runners improving balance and durability',
      exercises: [
        { name: 'Single-leg deadlift', sets: 3, reps: '10 each side' },
        { name: 'Lateral lunges', sets: 3, reps: '12 each side' },
        { name: 'Calf raises', sets: 3, reps: '15' },
      ],
    },
    {
      title: 'Functional Strength Circuit',
      focusArea: 'Strength',
      difficulty: 'Advanced',
      durationMinutes: 42,
      suggestedFor: 'Athletes increasing total-body capacity',
      exercises: [
        { name: 'Goblet squat', sets: 4, reps: '12' },
        { name: 'Push press', sets: 4, reps: '8' },
        { name: 'Plank row', sets: 3, reps: '10 each side' },
      ],
    },
  ]);

  console.log('Finished seeding octofit_db.');
};

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
