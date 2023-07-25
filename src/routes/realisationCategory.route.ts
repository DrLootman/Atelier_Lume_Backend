import express, { Express, Router } from "express";
const router: Router = express.Router();

import realisationCategoryController from "../controllers/realisationCategory.controller";
import realisationArticleController from "../controllers/realisationArticle.controller";

// Routes that deal with table realisation_category;s
router.get("/", realisationCategoryController.getAllRealisationCategoriesWithArticles);
router.get("/:id", realisationCategoryController.getRealisationCategoryById);
router.delete("/:id", realisationCategoryController.deleteRealisationCategory);
router.put("/:id", realisationCategoryController.updateRealisationCategory);
router.post("/", realisationCategoryController.createRealisationCategory);

export default router;