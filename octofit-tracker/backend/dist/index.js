"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit';
const PORT = Number(process.env.PORT || 8000);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error', err));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
