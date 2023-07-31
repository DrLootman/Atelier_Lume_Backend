/*
  Warnings:

  - Added the required column `label` to the `InspirationImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspirationimage` ADD COLUMN `label` VARCHAR(55) NOT NULL;
