import { PrismaClient } from "@prisma/client";
import {
  PersonnalInformationsI,
} from "../interfaces/interfaces";

export default class CreationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getAll(): Promise<PersonnalInformationsI[]> {
    return await this.client.personnalInformations.findMany();
  }
}