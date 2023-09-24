import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import PersonnalInformationsModel from "../models/personnalInformations.model";
import { PersonnalInformationsI } from "../interfaces/interfaces";

export default {
  async getAllInformations(
    req: Request,
    res: Response
  ): Promise<PersonnalInformationsI[] | void> {
    try {
      const personnalInfosModel = new PersonnalInformationsModel();
      const allPersonnalInfos = await personnalInfosModel.getAll();

      res.status(200).send(allPersonnalInfos);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
  },
}