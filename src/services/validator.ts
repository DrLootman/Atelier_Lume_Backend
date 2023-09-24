import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const tokenSchema = Joi.string().alphanum().min(3).max(200).required();

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.body;

  // Validation du token
  const { error } = tokenSchema.validate(token);

  if (error) {
    res.status(400).send({
      success: false,
      message: "Token invalide",
    });
  } else {
    res.status(200).send({
      success: true,
      message: "Token valide",
    });

    next();
  }
};