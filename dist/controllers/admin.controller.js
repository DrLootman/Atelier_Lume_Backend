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
const admin_model_1 = __importDefault(require("../models/admin.model"));
const prisma = new client_1.PrismaClient();
exports.default = {
    // Method to get every administrators
    getAllAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminModel = new admin_model_1.default();
                const allAdmin = yield adminModel.getAll();
                res.status(200).send(allAdmin);
            }
            catch (err) {
                console.error(err);
            }
        });
    },
    // Method to create a new admin
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { email, password } = req.body;
            try {
                const adminModel = new admin_model_1.default();
                const newAdmin = yield adminModel.createAdmin(req.body.email, req.body.password);
                res.status(201).send(newAdmin);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    },
    // Method to delete an admin :
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const adminModel = new admin_model_1.default();
                const deletedAdmin = yield adminModel.deleteAdmin(id);
                if (!deletedAdmin) {
                    return res.status(404).send({
                        success: false,
                        message: `Admin with the id ${id} was not found`,
                    });
                }
                else {
                    return res.status(201).send({
                        success: true,
                        message: `Admin with the id ${id} was deleted successfully`,
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
    // Method to update an admin :
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const adminModel = new admin_model_1.default();
                const existingAdmin = yield adminModel.getAdminById(parseInt(id));
                if (!existingAdmin) {
                    return res.status(404).send({
                        success: false,
                        message: `The expected user with the ${id} probably doesn't exist`,
                    });
                }
                const { email, password } = req.body;
                const updatedAdmin = yield adminModel.updateAdmin(id, email, password);
                res.status(201).send({
                    message: "User was updated successfully",
                    updatedAdmin,
                });
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
