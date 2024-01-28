/*
  Warnings:

  - Added the required column `updatedAt` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `alternativas_evaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `areas_de_conocimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `asignatura_en_curso_escuela` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `asignaturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `asignaturas_en_mallas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `asignaturas_en_variantes_curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `campos_de_formacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `campos_modelo_evaluativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `campos_proyectos_integradores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `competencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `curso_escuelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `detalles_niveles_titucion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ejes_formativos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `grupos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `instituciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `lugares_ejecucion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `mallas_curriculares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `metodologias_aprendizaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `modalidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `modelos_contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `modelos_evaluativos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `modelos_nivelacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `niveles_titulacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `paralelos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `perfiles_practicas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `productos_acreditables_evaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `programas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `proyectos_integradores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `recursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `sesiones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tipo_documento_programa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tipos_documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `titulos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `turnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `variantes_de_cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `alternativas_evaluacion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `areas_de_conocimiento` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `asignatura_en_curso_escuela` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `asignaturas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `asignaturas_en_mallas` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `asignaturas_en_variantes_curso` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `campos_de_formacion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `campos_modelo_evaluativo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `campos_proyectos_integradores` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `competencias` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `curso_escuelas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `detalles_niveles_titucion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ejes_formativos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `grupos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `instituciones` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lugares_ejecucion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `mallas_curriculares` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `metodologias_aprendizaje` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `modalidades` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `modelos_contrato` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `modelos_evaluativos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `modelos_nivelacion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `niveles_titulacion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `paralelos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `perfiles_practicas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `productos_acreditables_evaluacion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `programas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `proyectos_integradores` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `recursos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sesiones` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tipo_documento_programa` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tipos_documento` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `titulos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `turnos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `variantes_de_cursos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
