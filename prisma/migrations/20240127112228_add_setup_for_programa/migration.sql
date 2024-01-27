-- DropForeignKey
ALTER TABLE `competencias` DROP FOREIGN KEY `competencias_asignaturaEnMallaId_fkey`;

-- AlterTable
ALTER TABLE `competencias` ADD COLUMN `programaId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `titulos` ADD COLUMN `programaId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `recursos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metodologias_aprendizaje` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfiles_practicas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `capacidades` VARCHAR(191) NULL,
    `resultados` VARCHAR(191) NULL,
    `actividades` VARCHAR(191) NULL,
    `programaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos_acreditables_evaluacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_documento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `titulo` BOOLEAN NOT NULL,
    `actaGrado` BOOLEAN NOT NULL,
    `cedula` BOOLEAN NOT NULL,
    `papeletaVotacion` BOOLEAN NOT NULL,
    `carnetConadis` BOOLEAN NOT NULL,
    `convalidacion` BOOLEAN NOT NULL,
    `partidaNacimiento` BOOLEAN NOT NULL,
    `preNivelacion` BOOLEAN NOT NULL,
    `serviciosBasicos` BOOLEAN NOT NULL,
    `examenIngreso` BOOLEAN NOT NULL,
    `paraPasantia` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento_programa` (
    `id` VARCHAR(191) NOT NULL,
    `requeridoFisico` BOOLEAN NOT NULL,
    `requeridoDigital` BOOLEAN NOT NULL,
    `tipoDocumentoId` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveles_titulacion` (
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalles_niveles_titucion` (
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programas` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `mencion` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `detalleNivelTitulacionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `titulos` ADD CONSTRAINT `titulos_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competencias` ADD CONSTRAINT `competencias_asignaturaEnMallaId_fkey` FOREIGN KEY (`asignaturaEnMallaId`) REFERENCES `asignaturas_en_mallas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competencias` ADD CONSTRAINT `competencias_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfiles_practicas` ADD CONSTRAINT `perfiles_practicas_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_documento_programa` ADD CONSTRAINT `tipo_documento_programa_tipoDocumentoId_fkey` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipos_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_documento_programa` ADD CONSTRAINT `tipo_documento_programa_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas` ADD CONSTRAINT `programas_detalleNivelTitulacionId_fkey` FOREIGN KEY (`detalleNivelTitulacionId`) REFERENCES `detalles_niveles_titucion`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
