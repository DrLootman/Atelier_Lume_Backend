import { PrismaClient } from "@prisma/client";
import {
  PersonnalInformationsI,
  PersonnalParagraphI
} from "../interfaces/interfaces";

export default class CreationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getAll(): Promise<PersonnalInformationsI[]> {
    return await this.client.personnalInformations.findMany();
  }

  async updatePersonnalParagraph({ profile_paragraph }: PersonnalParagraphI) : Promise<PersonnalInformationsI> {
    return await this.client.personnalInformations.update({
      where: {
        id: 1,
      },
      data: {
        profile_paragraph: profile_paragraph,
      }
    })
  }
}