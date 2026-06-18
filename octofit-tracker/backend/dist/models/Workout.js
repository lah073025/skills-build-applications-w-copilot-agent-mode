"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
}, { _id: false });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true },
    exercises: [exerciseSchema],
}, { timestamps: true });
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
