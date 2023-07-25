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
const realisation_model_1 = __importDefault(require("../models/realisation.model"));
const prisma = new client_1.PrismaClient();
exports.default = {
    getAllRealisationCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const realisationModel = new realisation_model_1.default();
                const allRealisationCategories = yield realisationModel.getAll();
                res.status(200).send(allRealisationCategories);
            }
            catch (_a) {
                res.status(404).send({
                    success: false,
                    message: "No category could be found"
                });
            }
            return {
                success: false,
                message: "Internal server error"
            };
        });
    },
    // This method will delete a category and all articles linked to it.
    deleteRealisationCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const realisationModel = new realisation_model_1.default();
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
    }
};
