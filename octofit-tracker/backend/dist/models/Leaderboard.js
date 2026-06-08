"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    totalDuration: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    activityCount: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
