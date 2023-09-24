"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload.controller");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: './public/uploads' });
router.post("/", upload.single('image'), upload_controller_1.uploadController);
exports.default = router;
