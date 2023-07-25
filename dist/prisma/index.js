"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function deleteAllData() {
//   await prisma.article.deleteMany()
//   await prisma.photoCategory.deleteMany()
// }
// deleteAllData()
//   .then(async () => {
//     console.log("All data deleted successfully");
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
// async function main() {
//   await prisma.photoCategory.create({
//     data: {
//       photo_category_name: "Décoration orientale",
//       articles: {
//         create : {
//           URL: "blabliblou",
//           title: "Chambre d'hôte",
//           paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         }
//       }
//     }
//   })
//   const allCategories = await prisma.photoCategory.findMany({
//     include: {
//       articles: true
//     }
//   })
//   console.dir(allCategories, { depth: null })
// }
// async function main() {
//   const allCategories = await prisma.photoCategory.findMany();
//   console.dir(allCategories, { depth: null })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
