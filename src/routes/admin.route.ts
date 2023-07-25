import express, { Express, Router } from "express";
const router: Router = express.Router();

import adminController from "../controllers/admin.controller"
import { hashedPassword, isEmailExist, isPasswordValid } from "../services/auth";
// Possibilité d'importer plusieurs controller en une ligne en écrivant from "../controllers/";

router.post("/", hashedPassword, adminController.createAdmin);
router.post("/login", isEmailExist, isPasswordValid);
router.get("/", adminController.getAllAdmin);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export default router;