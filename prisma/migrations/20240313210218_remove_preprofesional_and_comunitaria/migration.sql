/*
  Warnings:

  - You are about to drop the `practicas_comunitarias_mallas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practicas_pre_profesionales_mallas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `practicas_comunitarias_mallas` DROP FOREIGN KEY `practicas_comunitarias_mallas_mallaCurricularId_fkey`;

-- DropForeignKey
ALTER TABLE `practicas_comunitarias_mallas` DROP FOREIGN KEY `practicas_comunitarias_mallas_registroDesdeNivelId_fkey`;

-- DropForeignKey
ALTER TABLE `practicas_pre_profesionales_mallas` DROP FOREIGN KEY `practicas_pre_profesionales_mallas_mallaCurricularId_fkey`;

-- DropForeignKey
ALTER TABLE `practicas_pre_profesionales_mallas` DROP FOREIGN KEY `practicas_pre_profesionales_mallas_registroDesdeNivelId_fkey`;

-- AlterTable
ALTER TABLE `mallas_curriculares` ADD COLUMN `practicaComunitariaCreditos` DOUBLE NULL,
    ADD COLUMN `practicaComunitariaHoras` DOUBLE NULL,
    ADD COLUMN `practicaComunitariaRegistroDesdeNivel` INTEGER NULL,
    ADD COLUMN `practicaComunitariaRegistroMultiple` BOOLEAN NULL,
    ADD COLUMN `practicaComunitariaRegistroPracticasAdelantadas` BOOLEAN NULL,
    ADD COLUMN `practicaComunitariaRequiereAutorizacion` BOOLEAN NULL,
    ADD COLUMN `practicaPreProfesionalCreditos` DOUBLE NULL,
    ADD COLUMN `practicaPreProfesionalHoras` DOUBLE NULL,
    ADD COLUMN `practicaPreProfesionalRegistroDesdeNivel` INTEGER NULL,
    ADD COLUMN `practicaPreProfesionalRegistroPracticasAdelantadas` BOOLEAN NULL,
    ADD COLUMN `practicaPreProfesionalRequiereAutorizacion` BOOLEAN NULL;

-- DropTable
DROP TABLE `practicas_comunitarias_mallas`;

-- DropTable
DROP TABLE `practicas_pre_profesionales_mallas`;
