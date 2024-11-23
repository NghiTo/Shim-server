/*
  Warnings:

  - Added the required column `point` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `point` INTEGER NOT NULL,
    ADD COLUMN `time` INTEGER NOT NULL;
