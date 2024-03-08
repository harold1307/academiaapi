-- DropForeignKey
ALTER TABLE `asesores_centros_informacion` DROP FOREIGN KEY `asesores_centros_informacion_asesorId_fkey`;

-- AddForeignKey
ALTER TABLE `asesores_centros_informacion` ADD CONSTRAINT `asesores_centros_informacion_asesorId_fkey` FOREIGN KEY (`asesorId`) REFERENCES `asesores_crm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
