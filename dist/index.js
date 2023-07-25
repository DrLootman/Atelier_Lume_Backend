"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Express part
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running');
});
const admin_route_1 = __importDefault(require("./src/routes/admin.route"));
const realisationCategory_route_1 = __importDefault(require("./src/routes/realisationCategory.route"));
const realisationArticle_route_1 = __importDefault(require("./src/routes/realisationArticle.route"));
app.use("/api/admin", admin_route_1.default);
app.use("/api/realisation", realisationCategory_route_1.default);
app.use("/api/articles", realisationArticle_route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
