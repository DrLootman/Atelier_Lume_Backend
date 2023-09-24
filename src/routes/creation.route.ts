import express, { Express, Router } from "express";
const router: Router = express.Router();

import creationController from "../controllers/creation.controller";

// Router that deal with table inspiration_image;
router.get("/", creationController.getThreeCreationPhoto);
router.put("/", creationController.updateCreationPhoto);
// router.get("/images", realisationArticleController.getThreeArticleImages);
// router.get("/:id", realisationArticleController.getArticleById);
// router.post("/", realisationArticleController.createArticle);
// router.delete("/:id", realisationArticleController.deleteArticleById);

export default router;