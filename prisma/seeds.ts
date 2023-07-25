import { PrismaClient } from "@prisma/client";

import { RealisationArticleI } from "../src/interfaces/interfaces";

const prisma = new PrismaClient();

const realisationArticles = [
  {
    id: 1,
    URL: "/realisations/prosedenuit.jpg",
    title: "Projet Anne",
    paragraph: "Ma cliente souhaitait un agencement optimal et chaleureux pour son salon ouvert sur la cuisine. Nous avons choisi des tons neutres quasi monochromes et des couleurs claires pour agrandir l'espace. Je lui ai soumis l'idée d'une banquette sur mesure autour de sa table, toujours dans le but d'optimiser l'espace. Enfin un véritable travail autour de la disposition des luminaires a été pensé pour un intérieur le plus chaleureux possible.",
  },
  {
    id: 2,
    URL: "/realisations/picasso.jpg",
    title: "Projet Zola",
    paragraph: "Ici l'appartement disposait d'une belle hauteur sous plafond. Les clients souhaitaient simplement que je les aide à agencer leur mobilier et leurs luminaires afin de créer une ambiance chic et épurée en mettant en avant leurs décorations murales.",
  },
  {
    id: 3,
    URL: "/realisations/boheme.jpg",
    title: "Projet Marchepiou",
    paragraph: "Les clients souhaitaient apporter un côté bohème coloré à leur maison de campagne. Adeptes de la seconde main, nous avons chiné ensemble différents meubles afin que je comprenne au mieux leurs goûts. Je me suis ensuite occupée d'agencer les meubles tout en veillant à satisfaire leur goût pour l'éclectisme les motifs et les couleurs.",
  },
  {
    id: 4,
    URL: "/realisations/baptiste.jpg",
    title: "Projet Baptiste",
    paragraph: "La cliente souhaitait simplement des conseils quant à l'harmonisation et au choix des couleurs pour son fils à naître.  Elle souhaitait des coloris qui puissent avoir une connotation tout à fait neutre.",
  },
  {
    id: 5,
    URL: "/realisations/christmas.jpg",
    title: "Projet Noël",
    paragraph: "Décoration de la table de Noël de ma famille.",
  }
];

async function main() {
  try {
    console.log("Début de la création des catégories de réalisations...");

    //Création de ma catégorie
    await prisma.realisationCategory.create({
      data: {
        id: 1,
        photo_category_name: "Mes projets récents",
      }
    })


    await realisationArticles.map(async (el) => {
      await prisma.realisationArticle.create({
        data: {
          ...el,
          realisationCategoryId: 1
        },
      });
    });

    console.log("Les opérations de création sont terminées");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
