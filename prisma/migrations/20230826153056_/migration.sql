-- CreateTable
CREATE TABLE `PersonnalInformations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo_url` VARCHAR(255) NOT NULL,
    `profile_paragraph` VARCHAR(355) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
