import express, { Express, Router } from "express";
const router: Router = express.Router();

import personnalInformationsController from "../controllers/personnalInformations.controller";

router.get("/", personnalInformationsController.getAllInformations);

export default router;