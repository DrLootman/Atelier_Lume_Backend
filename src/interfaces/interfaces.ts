// Interface about admnistrator informations
export interface AdminI {
  id: string | number;
  email?: string;
  password?: string | undefined;
}

// Interface about the message the status of all requests
export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}

export interface RealisationCategoryI {
  id?: number;
  photo_category_name?: string;
  realisationArticles?: RealisationArticleI[];
}

export interface RealisationArticleI {
  id?: string | number;
  URL: string;
  title: string;
  paragraph: string;
  realisationCategoryId: number;
}

export interface ArticleImagesI {
  URL: string;
}

export interface RealisationCategoryWithArticlesI extends RealisationCategoryI {
  realisationArticles: RealisationArticleI[];
}

export interface InspirationCategoryI {
  id: number;
  category_name: string;
  inspirationImage: InspirationImage[];
}

export interface InspirationImage {
  id: number;
  URL: string;
  inspirationCategory: InspirationCategoryI;
  inspirationCategoryId: number;
}