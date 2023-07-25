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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationArticle.findMany();
        });
    }
    getArticleImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const threeImages = yield this.client.realisationArticle.findMany({
                take: 3,
                orderBy: { id: 'asc' },
                select: { URL: true },
            });
            return threeImages;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.client.realisationArticle.findUnique({
                where: {
                    id,
                },
            });
            return article !== null && article !== void 0 ? article : null;
        });
    }
    createArticle(URL, title, paragraph, realisationCategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationArticle.create({
                data: {
                    URL,
                    title,
                    paragraph,
                    realisationCategoryId,
                },
            });
        });
    }
    deleteArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletion = yield this.client.realisationArticle.delete({
                where: {
                    id,
                }
            });
            return deletion !== null && deletion !== void 0 ? deletion : null;
        });
    }
    updateArticle(id, URL, title, paragraph, realisationCategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.realisationArticle.update({
                where: {
                    id,
                },
                data: {
                    URL,
                    title,
                    paragraph,
                    realisationCategoryId,
                },
            });
        });
    }
}
exports.default = RealisationModel;
