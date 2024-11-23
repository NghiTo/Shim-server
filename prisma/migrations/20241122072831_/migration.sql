/*
  Warnings:

  - You are about to drop the column `description` on the `quiz` table. All the data in the column will be lost.
  - Added the required column `grade` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `description`,
    ADD COLUMN `grade` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL;
