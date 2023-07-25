import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminI, IMessageWithSuccess } from "../interfaces/interfaces";
import { EmailI } from "../interfaces/auth";

export default class AdminModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  // Request to get all registered administrators

  async getAll(): Promise<AdminI[]> {
    return await this.client.admin.findMany();
  }

  // Request to get an admin by id
  async getAdminById(id: number): Promise<AdminI | null> {
    const admin = await this.client.admin.findUnique({
      where: { id },
    });
    return admin ?? null;
  }

  // Request to get an admin by email
  async getAdminByEmail(email: string): Promise<AdminI | null> {
    const admin = await this.client.admin.findUnique({
      where: { email },
    });
    return admin ?? null;
  }

  async createAdmin(email: string, password: string): Promise<AdminI> {
    return await this.client.admin.create({
      data: {
        email,
        password,
      },
    });
  }

  async deleteAdmin(id: string): Promise<AdminI> {
    return await this.client.admin.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updateAdmin(
    id: string,
    email?: string,
    password?: string
  ): Promise<AdminI> {
    return await this.client.admin.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        password,
      },
    });
  }
}
