import express, { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import multer from "multer";

const router: Router = express.Router();

const upload = multer({ dest: './public/uploads' });

router.post("/", upload.single('image'), uploadController);

export default router;