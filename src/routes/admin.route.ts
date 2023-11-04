import express, { Express, Router } from "express";
const router: Router = express.Router();

import personnalInformationsController from "../controllers/personnalInformations.controller";
import adminController from "../controllers/admin.controller"
import { hashedPassword, isEmailExist, isPasswordValid } from "../services/auth";
// Possibilité d'importer plusieurs controller en une ligne en écrivant from "../controllers/";

router.post("/", hashedPassword, adminController.createAdmin);
router.post("/login", isEmailExist, isPasswordValid);

router.get("/", adminController.getAllAdmin);

router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

// Route concernant les informations personnelles

router.put("/personnalInfos/paragraph", personnalInformationsController.updateParagraph);

export default router;