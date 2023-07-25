"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const realisationCategory_controller_1 = __importDefault(require("../controllers/realisationCategory.controller"));
const realisationArticle_controller_1 = __importDefault(require("../controllers/realisationArticle.controller"));
// Routes that deal with table realisation_category;s
router.get("/", realisationCategory_controller_1.default.getAllRealisationCategoriesWithArticles);
router.get("/:id", realisationCategory_controller_1.default.getRealisationCategoryById);
router.delete("/:id", realisationCategory_controller_1.default.deleteRealisationCategory);
router.put("/:id", realisationCategory_controller_1.default.updateRealisationCategory);
router.post("/", realisationCategory_controller_1.default.createRealisationCategory);
// Router that deal with table realisation_article;
router.get("/", realisationArticle_controller_1.default.getAllRealisationArticles);
exports.default = router;
