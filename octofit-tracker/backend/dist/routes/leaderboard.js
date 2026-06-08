"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.default.find()
        .populate('user', 'name email')
        .sort({ totalCalories: -1, totalDuration: -1 });
    res.json(leaderboard.map((entry) => ({
        user: entry.user,
        totalDuration: entry.totalDuration,
        totalCalories: entry.totalCalories,
        activityCount: entry.activityCount,
    })));
});
exports.default = router;
