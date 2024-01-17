/*
  Warnings:

  - Added the required column `orden` to the `paralelos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paralelos` ADD COLUMN `orden` INTEGER NOT NULL;
