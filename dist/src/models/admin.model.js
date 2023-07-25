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
class AdminModel {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    // Request to get all registered administrators
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.admin.findMany();
        });
    }
    // Request to get an admin by id
    getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.client.admin.findUnique({
                where: { id },
            });
            return admin !== null && admin !== void 0 ? admin : null;
        });
    }
    // Request to get an admin by email
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.client.admin.findUnique({
                where: { email },
            });
            return admin !== null && admin !== void 0 ? admin : null;
        });
    }
    createAdmin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.admin.create({
                data: {
                    email,
                    password,
                },
            });
        });
    }
    deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.admin.delete({
                where: {
                    id: parseInt(id),
                },
            });
        });
    }
    updateAdmin(id, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.admin.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    email,
                    password,
                },
            });
        });
    }
}
exports.default = AdminModel;
