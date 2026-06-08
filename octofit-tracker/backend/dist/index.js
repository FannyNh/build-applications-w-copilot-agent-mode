"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const PORT = 8000;
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB', MONGO_URL))
    .catch((err) => console.error('MongoDB connection error', err));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, port: PORT });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/workouts', workouts_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
