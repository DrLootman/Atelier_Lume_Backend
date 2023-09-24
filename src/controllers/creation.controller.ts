import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import CreationModel from "../models/creation.model";
import { CreationI } from "../interfaces/interfaces";

export default {
  async getThreeCreationPhoto(
    req: Request,
    res: Response
  ): Promise<CreationI[] | void> {
    try {
      const creationModel = new CreationModel();
      const allCreationModel = await creationModel.getAll();

      res.status(200).send(allCreationModel);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
  },

  async updateCreationPhoto(
    req: Request,
    res: Response
  ): Promise<CreationI[] | void> {
    const { id, label, photo_url }: CreationI = req.body;
    try {
      const creationModel = new CreationModel();
      const allCreationModel = await creationModel.updatePhoto(id, label, photo_url);

      res.status(200).send(allCreationModel);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
  }
}