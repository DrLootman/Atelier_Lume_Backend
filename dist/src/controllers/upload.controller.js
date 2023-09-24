"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uploadController = (req, res) => {
    if (req.file) {
        console.log("Ma variable :", process.env.PHOTO_NAME);
        fs_1.default.rename(req.file.path, `./public/uploads/${process.env.PHOTO_NAME}`, (err) => {
            var _a;
            if (err) {
                res.status(400).send("Error while uploading this file");
            }
            else {
                res.status(203).json({
                    success: true,
                    message: "Upload successfull",
                    url: `http://localhost:${process.env.PORT}/public/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
                });
            }
        });
    }
};
exports.uploadController = uploadController;
