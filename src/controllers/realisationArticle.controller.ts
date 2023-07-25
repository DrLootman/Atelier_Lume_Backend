import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import RealisationArticleModel from "../models/realisationArticle.model";
import {
  ArticleImagesI,
  RealisationArticleI,
  IMessageWithSuccess,
} from "../interfaces/interfaces";

const prisma = new PrismaClient();

export default {
  async getAllRealisationArticles(
    req: Request,
    res: Response
  ): Promise<RealisationArticleI[] | IMessageWithSuccess> {
    try {
      const realisationModel = new RealisationArticleModel();
      const allRealisationCategories = await realisationModel.getAll();
      res.status(200).send(allRealisationCategories);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
    return [];
  },

  async getThreeArticleImages(
    req: Request,
    res: Response
  ): Promise<ArticleImagesI[] | IMessageWithSuccess> {
    try {
      const realisationModel = new RealisationArticleModel();
      const allRealisationCategories = await realisationModel.getArticleImages();
      res.status(200).send(allRealisationCategories);
    } catch (err: any) {
      res.status(500).send({ error: err });
    }
    return [];
  },

  async getArticleById(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;
    try {
      const realisationModel = new RealisationArticleModel();
      const realisationArticle = await realisationModel.getById(parseInt(id));

      console.log("C'est quoi cet article ?", realisationArticle);

      if (!realisationArticle) {
        res.status(404).send({
          success: false,
          message: `The expected article with id ${id} probably doesn't exist`,
        });
      } else {
        res.status(200).json(realisationArticle);
      }
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: `Internal Server Error`,
      });
    }
    return {};
  },

  async createArticle(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const {
      URL,
      title,
      paragraph,
      realisationCategoryId,
    }: RealisationArticleI = req.body;
    try {
      const realisationModel = new RealisationArticleModel();
      const createNewArticle = realisationModel.createArticle(
        URL,
        title,
        paragraph,
        realisationCategoryId
      );
      res.status(201).send({
        success: true,
        message: `This article titled ${title} has been created successfully`,
      });
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: `Internal Server Error`,
      });
    }
    return {};
  },

  async deleteArticleById(
    req: Request,
    res: Response
  ): Promise<IMessageWithSuccess | {}> {
    const { id } = req.params;

    try {
      const realisationModel = new RealisationArticleModel();
      const deletedArticle = realisationModel.deleteArticleById(parseInt(id));

      console.log("Hohoho", deletedArticle);

      if (!deletedArticle) {
        return res.status(404).send({
          success: false,
          message: `Article with id: ${id} was not found`,
        });
      } else {
        return res.status(201).send({
          success: true,
          message: `Article with id: ${id} has been successfully deleted`,
        });
      }
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: `Internal Server Error`,
      });
    }
    return {};
  },
};
