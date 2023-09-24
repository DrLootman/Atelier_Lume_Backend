"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const creation_controller_1 = __importDefault(require("../controllers/creation.controller"));
// Router that deal with table inspiration_image;
router.get("/", creation_controller_1.default.getThreeCreationPhoto);
router.put("/", creation_controller_1.default.updateCreationPhoto);
// router.get("/images", realisationArticleController.getThreeArticleImages);
// router.get("/:id", realisationArticleController.getArticleById);
// router.post("/", realisationArticleController.createArticle);
// router.delete("/:id", realisationArticleController.deleteArticleById);
exports.default = router;
