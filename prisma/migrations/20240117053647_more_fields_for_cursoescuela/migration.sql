/*
  Warnings:

  - You are about to drop the column `verificarEdad` on the `variantes_de_cursos` table. All the data in the column will be lost.
  - Added the required column `aprobarCursoPrevio` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoPorMateria` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cumpleRequisitosMalla` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluaProfesor` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalizarMatriculas` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matriculaConDeuda` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pasarRecord` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registroDesdeOtraSede` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registroExterno` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registroInterno` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificarSesion` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curso_escuelas` ADD COLUMN `aprobarCursoPrevio` BOOLEAN NOT NULL,
    ADD COLUMN `costoPorMateria` BOOLEAN NOT NULL,
    ADD COLUMN `cumpleRequisitosMalla` BOOLEAN NOT NULL,
    ADD COLUMN `cupos` INTEGER NULL,
    ADD COLUMN `edadMaxima` INTEGER NULL,
    ADD COLUMN `edadMinima` INTEGER NULL,
    ADD COLUMN `evaluaProfesor` BOOLEAN NOT NULL,
    ADD COLUMN `legalizarMatriculas` BOOLEAN NOT NULL,
    ADD COLUMN `matriculaConDeuda` BOOLEAN NOT NULL,
    ADD COLUMN `pasarRecord` BOOLEAN NOT NULL,
    ADD COLUMN `registroDesdeOtraSede` BOOLEAN NOT NULL,
    ADD COLUMN `registroExterno` BOOLEAN NOT NULL,
    ADD COLUMN `registroInterno` BOOLEAN NOT NULL,
    ADD COLUMN `verificarSesion` BOOLEAN NOT NULL,
    MODIFY `observaciones` VARCHAR(191) NULL,
    MODIFY `departamento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `variantes_de_cursos` DROP COLUMN `verificarEdad`,
    MODIFY `estado` BOOLEAN NOT NULL DEFAULT false;
