"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const inspirationCategory = [
    {
        id: 1,
        category_name: "Design d'intérieur"
    }
];
const inspirationImages = [
    {
        id: 1,
        URL: "/inspirations/Modelisation_3D_1.jpg",
        label: "Design d'intérieur"
    },
    {
        id: 2,
        URL: "/inspirations/Modelisation_3D_4.jpg",
        label: "Inspiration scandinave"
    },
    {
        id: 3,
        URL: "/inspirations/Modelisation_3D_5.jpg",
        label: "Inspiration slovaque"
    },
    {
        id: 4,
        URL: "/inspirations/Modelisation_3D_8.jpg",
        label: "Idée novatrice"
    }
];
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Début de la création des catégories de réalisations...");
            //Création de ma catégorie d'articles
            yield prisma.realisationCategory.create({
                data: {
                    id: 1,
                    photo_category_name: "Mes projets récents",
                }
            });
            //Création de mes articles associés à la seule catégorie créée
            yield realisationArticles.map((el) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.realisationArticle.create({
                    data: Object.assign(Object.assign({}, el), { realisationCategoryId: 1 }),
                });
            }));
            // Création de ma catégorie d'inspirations (prévues pour les carousels):
            yield prisma.inspirationCategory.create({
                data: {
                    id: 1,
                    category_name: "Design d'intérieur",
                }
            });
            //Création de mes images associés à la seule catégorie d'inspiration créée
            yield inspirationImages.map((el) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.inspirationImage.create({
                    data: Object.assign(Object.assign({}, el), { inspirationCategoryId: 1 }),
                });
            }));
            console.log("Les opérations de création sont terminées");
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main();
