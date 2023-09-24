-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InspirationCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InspirationImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `URL` VARCHAR(255) NOT NULL,
    `label` VARCHAR(55) NOT NULL,
    `inspirationCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealisationCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo_category_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `RealisationCategory_photo_category_name_key`(`photo_category_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealisationArticle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `URL` VARCHAR(255) NOT NULL,
    `title` VARCHAR(55) NOT NULL,
    `paragraph` VARCHAR(455) NOT NULL,
    `realisationCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Creation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(55) NOT NULL,
    `photo_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InspirationImage` ADD CONSTRAINT `InspirationImage_inspirationCategoryId_fkey` FOREIGN KEY (`inspirationCategoryId`) REFERENCES `InspirationCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealisationArticle` ADD CONSTRAINT `RealisationArticle_realisationCategoryId_fkey` FOREIGN KEY (`realisationCategoryId`) REFERENCES `RealisationCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
