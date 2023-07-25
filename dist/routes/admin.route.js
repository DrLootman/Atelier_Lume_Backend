"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const admin_controller_1 = __importDefault(require("../src/controllers/admin.controller"));
// Possibilité d'importer plusieurs controller en une ligne en écrivant from "../controllers/";
router.post("/", admin_controller_1.default.createAdmin);
router.get("/", admin_controller_1.default.getAllAdmin);
router.put("/:id", admin_controller_1.default.updateAdmin);
router.delete("/:id", admin_controller_1.default.deleteAdmin);
exports.default = router;
