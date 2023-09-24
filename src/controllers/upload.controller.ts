import fs from "fs";
import { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const uploadController = (
  req: Request,
  res: Response
) => {
  if (req.file) {
    console.log("Ma variable :", process.env.PHOTO_NAME)
    fs.rename(
      req.file.path,
      `./public/uploads/${process.env.PHOTO_NAME}`,
      (err) => {
        if (err) {
          res.status(400).send("Error while uploading this file");
        } else {
          res.status(203).json({
            success: true,
            message: "Upload successfull",
            url: `http://localhost:${process.env.PORT}/public/uploads/${req.file?.originalname}`,
          });
        }
      }
    );
  }
};
