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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class RealisationModel {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    // Method that display every realisation categories and their articles
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationCategory.findMany({
                include: {
                    realisationArticles: true,
                },
            });
        });
    }
    // Request to get a category by id
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.realisationCategory.findUnique({
                where: { id },
            });
            return category !== null && category !== void 0 ? category : null;
        });
    }
    createCategory(photo_category_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationCategory.create({
                data: {
                    photo_category_name
                }
            });
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.realisationCategory.findUnique({
                where: {
                    id: parseInt(id),
                },
                include: {
                    realisationArticles: true,
                },
            });
            if (!category) {
                return null;
            }
            for (const article of category.realisationArticles) {
                yield this.client.realisationArticle.delete({
                    where: {
                        id: article.id,
                    },
                });
            }
            yield this.client.realisationCategory.delete({
                where: {
                    id: category.id,
                },
            });
            return category;
        });
    }
    updateCategory(id, photo_category_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationCategory.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    photo_category_name,
                },
            });
        });
    }
}
exports.default = RealisationModel;
