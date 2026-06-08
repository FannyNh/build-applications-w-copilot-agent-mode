"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.default.find().sort({ createdAt: -1 });
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const workout = new Workout_1.default(req.body);
    await workout.save();
    res.status(201).json(workout);
});
exports.default = router;
