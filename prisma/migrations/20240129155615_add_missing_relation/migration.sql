/*
  Warnings:

  - Added the required column `nivelTitulacionId` to the `detalles_niveles_titucion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalles_niveles_titucion` ADD COLUMN `nivelTitulacionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `detalles_niveles_titucion` ADD CONSTRAINT `detalles_niveles_titucion_nivelTitulacionId_fkey` FOREIGN KEY (`nivelTitulacionId`) REFERENCES `niveles_titulacion`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
