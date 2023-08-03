import express, { Express, Router } from "express";
import { sendEmail } from "../services/nodeMailer";

const router: Router = express.Router();

router.post("/", sendEmail);

export default router;