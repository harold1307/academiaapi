-- CreateTable
CREATE TABLE `alternativas_evaluacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_modelo_evaluativo` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `ordenActa` INTEGER NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaMinima` DOUBLE NOT NULL,
    `decimales` INTEGER NOT NULL,
    `campoDependiente` BOOLEAN NOT NULL,
    `actualizaEstado` BOOLEAN NOT NULL,
    `actualizaEstadoNegativo` BOOLEAN NOT NULL,
    `determinaEstadoFinal` BOOLEAN NOT NULL,
    `defineMaximos` BOOLEAN NOT NULL,
    `alternativaId` VARCHAR(191) NOT NULL,
    `modeloEvaluativoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelos_evaluativos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `notaRecuperacion` DOUBLE NOT NULL,
    `porcentajeAsistenciaAprobatoria` INTEGER NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `defineMaximos` BOOLEAN NOT NULL,
    `camposActualizanEstado` BOOLEAN NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campos_modelo_evaluativo` ADD CONSTRAINT `campos_modelo_evaluativo_alternativaId_fkey` FOREIGN KEY (`alternativaId`) REFERENCES `alternativas_evaluacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_modelo_evaluativo` ADD CONSTRAINT `campos_modelo_evaluativo_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
