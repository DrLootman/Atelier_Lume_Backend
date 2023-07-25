"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const realisationArticle_model_1 = __importDefault(require("../models/realisationArticle.model"));
const prisma = new client_1.PrismaClient();
exports.default = {
    getAllRealisationArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const realisationModel = new realisationArticle_model_1.default();
                const allRealisationCategories = yield realisationModel.getAll();
                res.status(200).send(allRealisationCategories);
            }
            catch (err) {
                res.status(500).send({ error: err });
            }
            return [];
        });
    },
    getThreeArticleImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const realisationModel = new realisationArticle_model_1.default();
                const allRealisationCategories = yield realisationModel.getArticleImages();
                res.status(200).send(allRealisationCategories);
            }
            catch (err) {
                res.status(500).send({ error: err });
            }
            return [];
        });
    },
    getArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const realisationModel = new realisationArticle_model_1.default();
                const realisationArticle = yield realisationModel.getById(parseInt(id));
                console.log("C'est quoi cet article ?", realisationArticle);
                if (!realisationArticle) {
                    res.status(404).send({
                        success: false,
                        message: `The expected article with id ${id} probably doesn't exist`,
                    });
                }
                else {
                    res.status(200).json(realisationArticle);
                }
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: `Internal Server Error`,
                });
            }
            return {};
        });
    },
    createArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { URL, title, paragraph, realisationCategoryId, } = req.body;
            try {
                const realisationModel = new realisationArticle_model_1.default();
                const createNewArticle = realisationModel.createArticle(URL, title, paragraph, realisationCategoryId);
                res.status(201).send({
                    success: true,
                    message: `This article titled ${title} has been created successfully`,
                });
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: `Internal Server Error`,
                });
            }
            return {};
        });
    },
    deleteArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const realisationModel = new realisationArticle_model_1.default();
                const deletedArticle = realisationModel.deleteArticleById(parseInt(id));
                console.log("Hohoho", deletedArticle);
                if (!deletedArticle) {
                    return res.status(404).send({
                        success: false,
                        message: `Article with id: ${id} was not found`,
                    });
                }
                else {
                    return res.status(201).send({
                        success: true,
                        message: `Article with id: ${id} has been successfully deleted`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: `Internal Server Error`,
                });
            }
            return {};
        });
    },
};
