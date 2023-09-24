import express, { Router } from "express";
import { verifyToken } from "../services/auth";

const router: Router = express.Router();

router.post("/", verifyToken);

export default router;