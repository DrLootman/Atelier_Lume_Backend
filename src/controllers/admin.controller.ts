import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AdminModel from "../models/admin.model";

import {
  AdminI,
  IMessageWithSuccess,
} from "../interfaces/interfaces";

const prisma = new PrismaClient();

export default {
  // Method to get every administrators
  async getAllAdmin(req: Request, res: Response) {
    try {
      const adminModel = new AdminModel();
      const allAdmin = await adminModel.getAll();
      res.status(200).send(allAdmin);
    } catch (err) {
      console.error(err);
    }
  },

  // Method to create a new admin
  async createAdmin(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password }: { email: string; password: string } = req.body;

    try {
      const adminModel = new AdminModel();
      const newAdmin = await adminModel.createAdmin(
        req.body.email,
        req.body.password
      );
      res.status(201).send(newAdmin);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  // Method to delete an admin :
  async deleteAdmin(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;
    
    try {
      const adminModel = new AdminModel();
      const deletedAdmin = await adminModel.deleteAdmin(id);
      if (!deletedAdmin) {
        return res.status(404).send({
          success: false,
          message: `Admin with the id ${id} was not found`,
        });
      } else {
        return res.status(201).send({
          success: true,
          message: `Admin with the id ${id} was deleted successfully`,
        });
      }
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
    return {};
  },

  // Method to update an admin :
  async updateAdmin(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;
    
    try {
      const adminModel = new AdminModel();
      const existingAdmin = await adminModel.getAdminById(parseInt(id));
      
      if (!existingAdmin) {
        return res.status(404).send({
          success: false,
          message: `The expected user with the ${id} probably doesn't exist`,
        });
      }
      
      const { email, password }: { email: string; password: string } = req.body;      
      const updatedAdmin = await adminModel.updateAdmin(id, email, password);
      res.status(201).send({
        message: "User was updated successfully",
        updatedAdmin,
      });
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
    return {};
  },
};
