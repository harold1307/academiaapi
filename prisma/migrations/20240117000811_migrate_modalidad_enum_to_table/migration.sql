/*
  Warnings:

  - You are about to drop the column `modalidad` on the `mallas_curriculares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mallas_curriculares` DROP COLUMN `modalidad`,
    ADD COLUMN `modalidadId` VARCHAR(191) NOT NULL DEFAULT 'VIRTUAL';

-- AlterTable
ALTER TABLE `modalidades` ADD COLUMN `alias` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `mallas_curriculares` ADD CONSTRAINT `mallas_curriculares_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
