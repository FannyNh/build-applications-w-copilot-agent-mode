"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Activity_1 = __importDefault(require("../models/Activity"));
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find().populate('user').sort({ recordedAt: -1 });
    res.json(activities);
});
router.post('/', async (req, res) => {
    const activity = new Activity_1.default(req.body);
    await activity.save();
    res.status(201).json(activity);
});
exports.default = router;
