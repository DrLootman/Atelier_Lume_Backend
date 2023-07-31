import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import InspirationImageModel from "../models/inspirationImage.model";
import { InspirationCategoryI } from "../interfaces/interfaces";

export default {
  async getAllInspirationImages(
    req: Request,
    res: Response
  ): Promise<InspirationCategoryI[] | void> {
    try {
      const inspirationModel = new InspirationImageModel();
      const allInspirationModel = await inspirationModel.getAll();
      res.status(200).send(allInspirationModel);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
  }
}