"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
// Express part
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running');
});
const realisationCategory_route_1 = __importDefault(require("./src/routes/realisationCategory.route"));
const realisationArticle_route_1 = __importDefault(require("./src/routes/realisationArticle.route"));
const inspirationImage_route_1 = __importDefault(require("./src/routes/inspirationImage.route"));
const creation_route_1 = __importDefault(require("./src/routes/creation.route"));
const personnalInformations_route_1 = __importDefault(require("./src/routes/personnalInformations.route"));
const mailer_route_1 = __importDefault(require("./src/routes/mailer.route"));
const upload_route_1 = __importDefault(require("./src/routes/upload.route"));
const verifyToken_route_1 = __importDefault(require("./src/routes/verifyToken.route"));
const admin_route_1 = __importDefault(require("./src/routes/admin.route"));
app.use("/api/realisation", realisationCategory_route_1.default);
app.use("/api/articles", realisationArticle_route_1.default);
app.use("/api/inspiration", inspirationImage_route_1.default);
app.use("/api/creation", creation_route_1.default);
app.use("/api/send-email", mailer_route_1.default);
app.use("/api/personnalInfos", personnalInformations_route_1.default);
app.use("/api/verifyToken", verifyToken_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/admin/upload", upload_route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
