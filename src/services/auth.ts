import argon2 from "argon2";
import { Request, Response, NextFunction } from "express";
import { EmailI, PayloadI, TokenI } from "../interfaces/auth";
import { AdminI, IMessageWithSuccess } from "../interfaces/interfaces";
import AdminModel from "../models/admin.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const hashingOptions = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
  parallelism: 1,
};

export const hashedPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hash = await argon2.hash(req.body.password, hashingOptions);

    req.body.password = hash;

    next();
  } catch(err: any) {
    console.error(err);
  }
};

export const isEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IMessageWithSuccess | {}> => {
  const { email } = req.body;

  try {
    const adminModel = new AdminModel();
    const isEmail = await adminModel.getAdminByEmail(email);

    if (!isEmail) {
      return res.status(404).send({
        success: false,
        message: `Admin with the email ${email} was not found`,
      });
    }

    const userData: AdminI = isEmail;

    res.locals.user = userData;

    next();
  } catch (err: any) {
    
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
  return {};
};

// Changer le retour de la fonction
export const isPasswordValid = async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  if (!password) {
    res.status(500).send({
      success: false,
      message: "Password is undefined",
    });
  } else {
    try {
      if (await argon2.verify(res.locals.user.password, password)) {
        delete res.locals.user.password;
  
        const payload: PayloadI = res.locals.user;
        
        if (process.env.JWT_SECRET) {
          const secretKey: string = process.env.JWT_SECRET;
          const token = jwt.sign({ payload }, secretKey, { expiresIn: "1h" });
    
          res.status(200).send({ token });
        }
      } else {
        res.status(500).send({
          success: false,
          message: "Passwords do not match",
        });
      }
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.get("Authorization");



    if (!authorizationHeader) {
      throw new Error("Authorization header is missing")
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the good type")
    }


    if (process.env.JWT_SECRET) {
      const secretKey: string = process.env.JWT_SECRET;
      const tokenVerification = jwt.verify(token, secretKey);
  
      console.log("Vérification du token", tokenVerification)
  
      if (tokenVerification) {
        next()
      } else {
        res.status(403).json({
          success: false,
        })
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Unknown secret key"
      })
    }


  } catch(err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).send({ message: "Token has expired" })
    }
  }
}
