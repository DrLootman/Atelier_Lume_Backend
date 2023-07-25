import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import RealisationModel from "../models/realisationCategory.model";

import {
  RealisationCategoryI,
  IMessageWithSuccess,
} from "../interfaces/interfaces";

const prisma = new PrismaClient();

export default {
  async getAllRealisationCategoriesWithArticles(
    req: Request,
    res: Response
  ): Promise<RealisationCategoryI[] | IMessageWithSuccess> {
    try {
      const realisationModel = new RealisationModel();
      const allRealisationCategories = await realisationModel.getAll();
      res.status(200).send(allRealisationCategories);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
    return [];
  },

  async getRealisationCategoryById(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    try {
      const { id } = req.params;
      const realisationModel = new RealisationModel();
      const existingCategory = await realisationModel.getCategoryById(
        parseInt(id)
      );

      if (!existingCategory) {
        res.status(404).send({
          success: false,
          message: `The expected category with id ${id} probably doesn't exist`,
        });
      }
      res.status(200).send(existingCategory);
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
    return {};
  },

  async createRealisationCategory(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { photo_category_name } = req.body;

    try {
      const realisationModel = new RealisationModel();
      const createRealisationCategories = await realisationModel.createCategory(photo_category_name);
      if (createRealisationCategories) {
        res.status(201).send({
          success: true,
          message: `A category named ${photo_category_name} has been successfully created!`
        })
      }
    } catch (err: any) {
      if (err.code === 'P2002') {
        res.status(409).send({
          success: false,
          message: `A category with the name ${photo_category_name} already exists!`
        });
    }
  }
  return {}
},

  async updateRealisationCategory(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;

    try {
      const realisationModel = new RealisationModel();
      const existingCategory = await realisationModel.getCategoryById(
        parseInt(id)
      );

      if (!existingCategory) {
        return res.status(404).send({
          success: false,
          message: `The expected user with the ${id} probably doesn't exist`,
        });
      }

      const { photo_category_name }: { photo_category_name: string } = req.body;

      const updatedCategory = await realisationModel.updateCategory(
        id,
        photo_category_name
      );
      res.status(201).send({
        success: true,
        message: `Category was updated successfully, with a new name: ${photo_category_name}`,
      });
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
    return [];
  },

  // This method will delete a category and all articles linked to it.
  async deleteRealisationCategory(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;

    try {
      const realisationModel = new RealisationModel();
      const deletedCategory = await realisationModel.deleteCategory(id);

      if (!deletedCategory) {
        return res.status(404).send({
          success: false,
          message: `Category with id: ${id} was not found`,
        });
      } else {
        return res.status(201).send({
          success: true,
          message: `Category with id: ${id} was deleted successfully`,
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
};
