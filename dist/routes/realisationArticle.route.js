"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const realisationArticle_controller_1 = __importDefault(require("../src/controllers/realisationArticle.controller"));
// Router that deal with table realisation_article;
router.get("/", realisationArticle_controller_1.default.getAllRealisationArticles);
router.get("/images", realisationArticle_controller_1.default.getThreeArticleImages);
router.get("/:id", realisationArticle_controller_1.default.getArticleById);
router.post("/", realisationArticle_controller_1.default.createArticle);
router.delete("/:id", realisationArticle_controller_1.default.deleteArticleById);
exports.default = router;
