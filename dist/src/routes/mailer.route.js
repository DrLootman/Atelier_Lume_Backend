"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodeMailer_1 = require("../services/nodeMailer");
const router = express_1.default.Router();
router.post("/", nodeMailer_1.sendEmail);
exports.default = router;
