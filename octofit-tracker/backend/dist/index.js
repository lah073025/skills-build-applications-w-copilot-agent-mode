"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const octofitRoutes_1 = __importDefault(require("./routes/octofitRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)({ origin: frontendOrigin }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', apiBaseUrl });
});
app.use('/api', octofitRoutes_1.default);
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
void startServer();
