import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import PersonnalInformationsModel from "../models/personnalInformations.model";
import { PersonnalInformationsI, PersonnalParagraphI, IMessageWithSuccess } from "../interfaces/interfaces";

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

  async updateParagraph(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { profile_paragraph }: PersonnalParagraphI = req.body;

    try {
      const personnalInfosModel = new PersonnalInformationsModel();
      const allPersonnalInfos = await personnalInfosModel.updatePersonnalParagraph({ profile_paragraph });

      res.status(201).send({
        success: true,
        message: `The personnal paragraph has been updated successfully`,
      });
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: `Internal Server Error`,
      });
    }
    return {};
  },

}