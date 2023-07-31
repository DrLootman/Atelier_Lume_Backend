// const express = require('express');
import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

// Express part
const app: Express = express();

const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(express.static("./public"));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

import adminRoutes from "./src/routes/admin.route";
import realisationCategoryRoutes from "./src/routes/realisationCategory.route";
import realisationArticleRoutes from "./src/routes/realisationArticle.route";
import inspirationImageRoutes from "./src/routes/inspirationImage.route";

app.use("/api/admin", adminRoutes);
app.use("/api/realisation", realisationCategoryRoutes);
app.use("/api/articles", realisationArticleRoutes);
app.use("/api/inspiration", inspirationImageRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});