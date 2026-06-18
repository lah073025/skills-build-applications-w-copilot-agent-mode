"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const seedDatabase = async () => {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Team_1.TeamModel.deleteMany({}),
        Activity_1.ActivityModel.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntryModel.deleteMany({}),
        Workout_1.WorkoutModel.deleteMany({}),
    ]);
    await User_1.UserModel.insertMany([
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
    await Team_1.TeamModel.insertMany([
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
    await Activity_1.ActivityModel.insertMany([
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
    await LeaderboardEntry_1.LeaderboardEntryModel.insertMany([
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
    await Workout_1.WorkoutModel.insertMany([
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
    await (0, database_1.disconnectDatabase)();
});
