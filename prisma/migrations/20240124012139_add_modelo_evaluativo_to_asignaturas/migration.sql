-- AlterTable
ALTER TABLE `asignatura_en_curso_escuela` ADD COLUMN `modeloEvaluativoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `asignaturas_en_variantes_curso` ADD COLUMN `modeloEvaluativoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
