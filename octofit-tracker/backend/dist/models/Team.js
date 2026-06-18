"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    captainName: { type: String, required: true },
    members: [{ type: String, required: true }],
}, { timestamps: true });
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
