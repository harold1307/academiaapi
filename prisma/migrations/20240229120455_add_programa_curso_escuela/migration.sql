/*
  Warnings:

  - You are about to drop the column `nivelId` on the `cronogramas_matriculacion` table. All the data in the column will be lost.
  - Added the required column `programaId` to the `cronogramas_matriculacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sedeId` to the `cronogramas_matriculacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cronogramas_matriculacion` DROP FOREIGN KEY `cronogramas_matriculacion_nivelId_fkey`;

-- AlterTable
ALTER TABLE `cronogramas_matriculacion` DROP COLUMN `nivelId`,
    ADD COLUMN `modalidadId` VARCHAR(191) NULL,
    ADD COLUMN `nivel` INTEGER NULL,
    ADD COLUMN `programaId` VARCHAR(191) NOT NULL,
    ADD COLUMN `sedeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `requisitos_programas_curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `asignaturaEnNivelMallaId` VARCHAR(191) NULL,
    `moduloEnMallaId` VARCHAR(191) NULL,
    `programaCursoEscuelaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `requisitos_programas_curso_escuelas_programaCursoEscuelaId_a_key`(`programaCursoEscuelaId`, `asignaturaEnNivelMallaId`),
    UNIQUE INDEX `requisitos_programas_curso_escuelas_programaCursoEscuelaId_m_key`(`programaCursoEscuelaId`, `moduloEnMallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programas_curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `registroExterno` BOOLEAN NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `modalidadId` VARCHAR(191) NULL,
    `mallaId` VARCHAR(191) NULL,
    `nivelDesde` INTEGER NULL,
    `nivelHasta` INTEGER NULL,
    `cursoEscuelaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `programas_curso_escuelas_programaId_modalidadId_mallaId_curs_key`(`programaId`, `modalidadId`, `mallaId`, `cursoEscuelaId`, `nivelDesde`, `nivelHasta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programas_variantes_curso` (
    `id` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `modalidadId` VARCHAR(191) NULL,
    `mallaId` VARCHAR(191) NULL,
    `registroExterno` BOOLEAN NOT NULL,
    `varianteCursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `programas_variantes_curso_programaId_modalidadId_mallaId_var_key`(`programaId`, `modalidadId`, `mallaId`, `varianteCursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requisitos_programas_curso_escuelas` ADD CONSTRAINT `requisitos_programas_curso_escuelas_asignaturaEnNivelMallaI_fkey` FOREIGN KEY (`asignaturaEnNivelMallaId`) REFERENCES `asignaturas_niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_programas_curso_escuelas` ADD CONSTRAINT `requisitos_programas_curso_escuelas_moduloEnMallaId_fkey` FOREIGN KEY (`moduloEnMallaId`) REFERENCES `asignaturas_modulo_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_programas_curso_escuelas` ADD CONSTRAINT `requisitos_programas_curso_escuelas_programaCursoEscuelaId_fkey` FOREIGN KEY (`programaCursoEscuelaId`) REFERENCES `programas_curso_escuelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_curso_escuelas` ADD CONSTRAINT `programas_curso_escuelas_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_curso_escuelas` ADD CONSTRAINT `programas_curso_escuelas_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_curso_escuelas` ADD CONSTRAINT `programas_curso_escuelas_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_curso_escuelas` ADD CONSTRAINT `programas_curso_escuelas_cursoEscuelaId_fkey` FOREIGN KEY (`cursoEscuelaId`) REFERENCES `curso_escuelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_variantes_curso` ADD CONSTRAINT `programas_variantes_curso_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_variantes_curso` ADD CONSTRAINT `programas_variantes_curso_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_variantes_curso` ADD CONSTRAINT `programas_variantes_curso_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas_variantes_curso` ADD CONSTRAINT `programas_variantes_curso_varianteCursoId_fkey` FOREIGN KEY (`varianteCursoId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cronogramas_matriculacion` ADD CONSTRAINT `cronogramas_matriculacion_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cronogramas_matriculacion` ADD CONSTRAINT `cronogramas_matriculacion_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cronogramas_matriculacion` ADD CONSTRAINT `cronogramas_matriculacion_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
