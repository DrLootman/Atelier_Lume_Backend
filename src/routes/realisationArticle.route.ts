import express, { Express, Router } from "express";
const router: Router = express.Router();

import realisationArticleController from "../controllers/realisationArticle.controller";

// Router that deal with table realisation_article;
router.get("/", realisationArticleController.getAllRealisationArticles);
router.get("/images", realisationArticleController.getThreeArticleImages);
router.get("/:id", realisationArticleController.getArticleById);
router.post("/", realisationArticleController.createArticle);
router.delete("/:id", realisationArticleController.deleteArticleById);

export default router;