-- DropForeignKey
ALTER TABLE `alumnos` DROP FOREIGN KEY `alumnos_asesorCrmId_fkey`;

-- AlterTable
ALTER TABLE `alumnos` MODIFY `asesorCrmId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `alumnos` ADD CONSTRAINT `alumnos_asesorCrmId_fkey` FOREIGN KEY (`asesorCrmId`) REFERENCES `asesores_crm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
