-- CreateTable
CREATE TABLE `modelos_nivelacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_proyectos_integradores` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `ordenActa` INTEGER NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaMinima` DOUBLE NOT NULL,
    `decimales` INTEGER NOT NULL,
    `campoDependiente` BOOLEAN NOT NULL,
    `actualizaEstado` BOOLEAN NOT NULL,
    `determinaEstadoFinal` BOOLEAN NOT NULL,
    `proyectoIntegradorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos_integradores` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campos_proyectos_integradores` ADD CONSTRAINT `campos_proyectos_integradores_proyectoIntegradorId_fkey` FOREIGN KEY (`proyectoIntegradorId`) REFERENCES `proyectos_integradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
