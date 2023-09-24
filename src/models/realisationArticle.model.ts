import { PrismaClient } from "@prisma/client";
import {
  RealisationCategoryI,
  RealisationArticleI,
  IMessageWithSuccess,
  ArticleImagesI
} from "../interfaces/interfaces";

export default class RealisationModel {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getAll(): Promise<RealisationArticleI[]> {
    return await this.client.realisationArticle.findMany();
  }

  async getArticleImages(): Promise<ArticleImagesI[]> {
    const threeImages = await this.client.realisationArticle.findMany({
      take: 3,
      // orderBy: { id: 'asc' },
      select: { id: true, URL: true },
    })
    return threeImages;
  }

  async getById(id: number): Promise<RealisationArticleI | null> {
    const article = await this.client.realisationArticle.findUnique({
      where: {
        id,
      },
    });
    return article ?? null;
  }

  async createArticle(
    URL: string,
    title: string,
    paragraph: string,
    realisationCategoryId: number
  ): Promise<RealisationArticleI> {
    return await this.client.realisationArticle.create({
      data: {
        URL,
        title,
        paragraph,
        realisationCategoryId,
      },
    });
  }

  async deleteArticleById(id: number): Promise<RealisationArticleI | null> {
    const deletion = await this.client.realisationArticle.delete({
      where: {
        id,
      }
    });
    return deletion ?? null;
  }

  async updateArticle(
    id: number,
    URL: string,
    title: string,
    paragraph: string,
    realisationCategoryId: number
  ): Promise<RealisationArticleI> {
    return await this.client.realisationArticle.update({
      where: {
        id,
      },
      data: {
        URL,
        title,
        paragraph,
        realisationCategoryId,
      },
    });
  }
}
