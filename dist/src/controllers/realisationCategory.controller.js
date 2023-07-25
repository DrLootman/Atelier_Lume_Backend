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
const realisationCategory_model_1 = __importDefault(require("../models/realisationCategory.model"));
const prisma = new client_1.PrismaClient();
exports.default = {
    getAllRealisationCategoriesWithArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const realisationModel = new realisationCategory_model_1.default();
                const allRealisationCategories = yield realisationModel.getAll();
                res.status(200).send(allRealisationCategories);
            }
            catch (err) {
                res.status(500).send({ error: err });
            }
            return [];
        });
    },
    getRealisationCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const realisationModel = new realisationCategory_model_1.default();
                const existingCategory = yield realisationModel.getCategoryById(parseInt(id));
                if (!existingCategory) {
                    res.status(404).send({
                        success: false,
                        message: `The expected category with id ${id} probably doesn't exist`,
                    });
                }
                res.status(200).send(existingCategory);
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: "Internal server error",
                });
            }
            return {};
        });
    },
    createRealisationCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { photo_category_name } = req.body;
            try {
                const realisationModel = new realisationCategory_model_1.default();
                const createRealisationCategories = yield realisationModel.createCategory(photo_category_name);
                if (createRealisationCategories) {
                    res.status(201).send({
                        success: true,
                        message: `A category named ${photo_category_name} has been successfully created!`
                    });
                }
            }
            catch (err) {
                if (err.code === 'P2002') {
                    res.status(409).send({
                        success: false,
                        message: `A category with the name ${photo_category_name} already exists!`
                    });
                }
            }
            return {};
        });
    },
    updateRealisationCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const realisationModel = new realisationCategory_model_1.default();
                const existingCategory = yield realisationModel.getCategoryById(parseInt(id));
                if (!existingCategory) {
                    return res.status(404).send({
                        success: false,
                        message: `The expected user with the ${id} probably doesn't exist`,
                    });
                }
                const { photo_category_name } = req.body;
                const updatedCategory = yield realisationModel.updateCategory(id, photo_category_name);
                res.status(201).send({
                    success: true,
                    message: `Category was updated successfully, with a new name: ${photo_category_name}`,
                });
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: "Internal server error",
                });
            }
            return [];
        });
    },
    // This method will delete a category and all articles linked to it.
    deleteRealisationCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const realisationModel = new realisationCategory_model_1.default();
                const deletedCategory = yield realisationModel.deleteCategory(id);
                if (!deletedCategory) {
                    return res.status(404).send({
                        success: false,
                        message: `Category with id: ${id} was not found`,
                    });
                }
                else {
                    return res.status(201).send({
                        success: true,
                        message: `Category with id: ${id} was deleted successfully`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: "Internal server error",
                });
            }
            return {};
        });
    },
};
