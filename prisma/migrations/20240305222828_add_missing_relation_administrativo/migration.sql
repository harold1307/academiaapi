/*
  Warnings:

  - A unique constraint covering the columns `[administrativoId]` on the table `responsables_asesores_estudiantes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `administrativoId` to the `responsables_asesores_estudiantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `responsables_asesores_estudiantes` ADD COLUMN `administrativoId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `responsables_asesores_estudiantes_administrativoId_key` ON `responsables_asesores_estudiantes`(`administrativoId`);

-- AddForeignKey
ALTER TABLE `responsables_asesores_estudiantes` ADD CONSTRAINT `responsables_asesores_estudiantes_administrativoId_fkey` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
