import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

// Express part
const app: Express = express();

const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

import realisationCategoryRoutes from "./src/routes/realisationCategory.route";
import realisationArticleRoutes from "./src/routes/realisationArticle.route";
import inspirationImageRoutes from "./src/routes/inspirationImage.route";
import creationRoutes from "./src/routes/creation.route";
import personnalInformationsRoutes from "./src/routes/personnalInformations.route";
import mailerRoutes from "./src/routes/mailer.route";
import uploadRoutes from "./src/routes/upload.route";
import verifyTokenRoute from "./src/routes/verifyToken.route";
import { isPasswordValid, verifyToken } from "./src/services/auth";
import adminRoutes from "./src/routes/admin.route";

app.use("/api/realisation", realisationCategoryRoutes);
app.use("/api/articles", realisationArticleRoutes);
app.use("/api/inspiration", inspirationImageRoutes);
app.use("/api/creation", creationRoutes);
app.use("/api/send-email", mailerRoutes);
app.use("/api/personnalInfos", personnalInformationsRoutes);

app.use("/api/verifyToken", verifyTokenRoute);

app.use("/api/admin", adminRoutes);
app.use("/api/admin/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});