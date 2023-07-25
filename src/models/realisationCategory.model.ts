import { PrismaClient } from "@prisma/client";
import {
  RealisationCategoryI,
  RealisationArticleI,
  IMessageWithSuccess,
  RealisationCategoryWithArticlesI,
} from "../interfaces/interfaces";

export default class RealisationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  // Method that display every realisation categories and their articles
  async getAll(): Promise<RealisationCategoryI[]> {
    return await this.client.realisationCategory.findMany({
      include: {
        realisationArticles: true,
      },
    });
  }

  // Request to get a category by id
  async getCategoryById(id: number): Promise<RealisationCategoryI | null> {
    const category = await this.client.realisationCategory.findUnique({
      where: { id },
    });
    return category ?? null;
  }

  async createCategory(
    photo_category_name: string
  ): Promise<RealisationCategoryI> {
    return await this.client.realisationCategory.create({
      data: {
        photo_category_name
      }
    });
  }

  async deleteCategory(
    id: string
  ): Promise<RealisationCategoryWithArticlesI | null> {
    const category = await this.client.realisationCategory.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        realisationArticles: true,
      },
    });

    if (!category) {
      return null;
    }

    for (const article of category.realisationArticles) {
      await this.client.realisationArticle.delete({
        where: {
          id: article.id,
        },
      });
    }

    await this.client.realisationCategory.delete({
      where: {
        id: category.id,
      },
    });

    return category;
  }

  async updateCategory(
    id: string,
    photo_category_name: string
  ): Promise<RealisationCategoryI> {
    return await this.client.realisationCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        photo_category_name,
      },
    });
  }
}
