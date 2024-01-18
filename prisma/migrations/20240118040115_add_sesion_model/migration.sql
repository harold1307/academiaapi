/*
  Warnings:

  - Added the required column `sesionId` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curso_escuelas` ADD COLUMN `sesionId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `sesiones` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NULL,
    `lunes` BOOLEAN NOT NULL,
    `martes` BOOLEAN NOT NULL,
    `miercoles` BOOLEAN NOT NULL,
    `jueves` BOOLEAN NOT NULL,
    `viernes` BOOLEAN NOT NULL,
    `sabado` BOOLEAN NOT NULL,
    `domingo` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_sesionId_fkey` FOREIGN KEY (`sesionId`) REFERENCES `sesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
