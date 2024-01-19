-- CreateTable
CREATE TABLE `turnos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `horas` DOUBLE NOT NULL,
    `comienza` TIME(0) NOT NULL,
    `termina` TIME(0) NOT NULL,
    `sesionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `turnos_sesionId_fkey` FOREIGN KEY (`sesionId`) REFERENCES `sesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
