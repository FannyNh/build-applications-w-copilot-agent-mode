"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const log = console.log;
async function seed() {
    log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URL);
    log(`Connected to MongoDB at ${MONGO_URL}`);
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
    ]);
    const users = await User_1.default.create([
        { name: 'Ava Carter', email: 'ava.carter@example.com' },
        { name: 'Miles Brooks', email: 'miles.brooks@example.com' },
        { name: 'Jade Nguyen', email: 'jade.nguyen@example.com' },
    ]);
    const teams = await Team_1.default.create([
        { name: 'Trail Blazers', members: [users[0]._id, users[1]._id] },
        { name: 'Peak Performers', members: [users[1]._id, users[2]._id] },
    ]);
    const workouts = await Workout_1.default.create([
        {
            title: 'Morning Cardio Blast',
            description: 'A quick, high-energy cardio session to get the day moving.',
            difficulty: 'Intermediate',
            duration: 35,
        },
        {
            title: 'Strength Circuit',
            description: 'Full-body strength training with a focus on core and legs.',
            difficulty: 'Advanced',
            duration: 50,
        },
        {
            title: 'Recovery Flow',
            description: 'Gentle stretching and mobility to support recovery.',
            difficulty: 'Beginner',
            duration: 20,
        },
    ]);
    const activities = await Activity_1.default.create([
        {
            user: users[0]._id,
            type: 'Trail Running',
            duration: 55,
            calories: 620,
        },
        {
            user: users[0]._id,
            type: 'Yoga Flow',
            duration: 30,
            calories: 170,
        },
        {
            user: users[1]._id,
            type: 'Strength Training',
            duration: 50,
            calories: 540,
        },
        {
            user: users[1]._id,
            type: 'Cycling',
            duration: 45,
            calories: 480,
        },
        {
            user: users[2]._id,
            type: 'HIIT',
            duration: 28,
            calories: 360,
        },
        {
            user: users[2]._id,
            type: 'Pilates',
            duration: 40,
            calories: 230,
        },
    ]);
    const leaderboardEntries = users.map((user) => {
        const userActivities = activities.filter((activity) => activity.user.equals(user._id));
        return {
            user: user._id,
            totalDuration: userActivities.reduce((sum, activity) => sum + activity.duration, 0),
            totalCalories: userActivities.reduce((sum, activity) => sum + activity.calories, 0),
            activityCount: userActivities.length,
        };
    });
    await Leaderboard_1.default.create(leaderboardEntries);
    log(`Created ${users.length} users, ${teams.length} teams, ${workouts.length} workouts, ${activities.length} activities, and ${leaderboardEntries.length} leaderboard entries.`);
    await mongoose_1.default.disconnect();
    log('Seed complete.');
}
seed().catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
});
