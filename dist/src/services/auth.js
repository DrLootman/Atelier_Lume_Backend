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
exports.isPasswordValid = exports.isEmailExist = exports.hashedPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashingOptions = {
    type: argon2_1.default.argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50,
    parallelism: 1,
};
const hashedPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield argon2_1.default.hash(req.body.password, hashingOptions);
        req.body.password = hash;
        next();
    }
    catch (err) {
        console.error(err);
    }
});
exports.hashedPassword = hashedPassword;
const isEmailExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const adminModel = new admin_model_1.default();
        const isEmail = yield adminModel.getAdminByEmail(email);
        if (!isEmail) {
            return res.status(404).send({
                success: false,
                message: `Admin with the email ${email} was not found`,
            });
        }
        const userData = isEmail;
        res.locals.user = userData;
        next();
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
    return {};
});
exports.isEmailExist = isEmailExist;
// Changer le retour de la fonction
const isPasswordValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    if (!password) {
        res.status(500).send({
            success: false,
            message: "Password is undefined",
        });
    }
    else {
        try {
            if (yield argon2_1.default.verify(res.locals.user.password, password)) {
                delete res.locals.user.password;
                const payload = res.locals.user;
                if (process.env.JWT_SECRET) {
                    const secretKey = process.env.JWT_SECRET;
                    const token = jsonwebtoken_1.default.sign({ payload }, secretKey);
                    res.status(200).send({ token });
                }
            }
            else {
                res.status(500).send({
                    success: false,
                    message: "Passwords doesn't match",
                });
            }
        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
});
exports.isPasswordValid = isPasswordValid;
