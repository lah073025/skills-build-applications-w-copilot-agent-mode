"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/users/', async (_request, response) => {
    const users = await User_1.UserModel.find().sort({ name: 1 });
    response.json({ users });
});
router.get('/teams/', async (_request, response) => {
    const teams = await Team_1.TeamModel.find().sort({ name: 1 });
    response.json({ teams });
});
router.get('/activities/', async (_request, response) => {
    const activities = await Activity_1.ActivityModel.find().sort({ activityDate: -1 });
    response.json({ activities });
});
router.get('/leaderboard/', async (_request, response) => {
    const leaderboard = await LeaderboardEntry_1.LeaderboardEntryModel.find().sort({ rank: 1 });
    response.json({ leaderboard });
});
router.get('/workouts/', async (_request, response) => {
    const workouts = await Workout_1.WorkoutModel.find().sort({ title: 1 });
    response.json({ workouts });
});
exports.default = router;
