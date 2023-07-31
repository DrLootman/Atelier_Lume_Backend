import { InspirationImage, PrismaClient } from "@prisma/client";
import {
  InspirationImageI
} from "../interfaces/interfaces";

export default class RealisationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getAll(): Promise<InspirationImageI[]> {
    return await this.client.inspirationImage.findMany();
  }
}