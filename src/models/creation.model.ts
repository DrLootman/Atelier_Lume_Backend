import { PrismaClient } from "@prisma/client";
import {
  CreationI,
} from "../interfaces/interfaces";

export default class CreationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getAll(): Promise<CreationI[]> {
    return await this.client.creation.findMany();
  }

  async updatePhoto(id: number, label: string, photo_url: string): Promise<CreationI> {
    return await this.client.creation.update({
      where: { id: id },
      data: {
        photo_url: photo_url,
        label: label
      }
    })
  }
}