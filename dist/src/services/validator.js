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
exports.validateToken = void 0;
const joi_1 = __importDefault(require("joi"));
const tokenSchema = joi_1.default.string().alphanum().min(3).max(200).required();
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    // Validation du token
    const { error } = tokenSchema.validate(token);
    if (error) {
        res.status(400).send({
            success: false,
            message: "Token invalide",
        });
    }
    else {
        res.status(200).send({
            success: true,
            message: "Token valide",
        });
        next();
    }
});
exports.validateToken = validateToken;
