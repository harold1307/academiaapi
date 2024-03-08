/*
  Warnings:

  - You are about to drop the column `nivelId` on the `requisitos_matriculacion` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `requisitos_matriculacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sedeId` to the `requisitos_matriculacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `requisitos_matriculacion` DROP FOREIGN KEY `requisitos_matriculacion_nivelId_fkey`;

-- AlterTable
ALTER TABLE `requisitos_matriculacion` DROP COLUMN `nivelId`,
    ADD COLUMN `modalidadId` VARCHAR(191) NULL,
    ADD COLUMN `nivel` INTEGER NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `programaId` VARCHAR(191) NULL,
    ADD COLUMN `sedeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
