import express, { Express, Router } from "express";
const router: Router = express.Router();

import inspirationImageController from "../controllers/inpirationImage.controller";

// Router that deal with table inspiration_image;
router.get("/", inspirationImageController.getAllInspirationImages);
// router.get("/images", realisationArticleController.getThreeArticleImages);
// router.get("/:id", realisationArticleController.getArticleById);
// router.post("/", realisationArticleController.createArticle);
// router.delete("/:id", realisationArticleController.deleteArticleById);

export default router;