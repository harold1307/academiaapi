-- DropForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` DROP FOREIGN KEY `asignaturas_en_variantes_curso_varianteCursoId_fkey`;

-- DropForeignKey
ALTER TABLE `variantes_de_cursos` DROP FOREIGN KEY `variantes_de_cursos_cursoId_fkey`;

-- CreateTable
CREATE TABLE `curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `paraleloId` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `fechaLimiteRegistro` DATETIME(3) NOT NULL,
    `diasLimitePago` INTEGER NOT NULL,
    `nivel` INTEGER NOT NULL,
    `plantillaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paralelos` (
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelos_contrato` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `paraProfesores` BOOLEAN NOT NULL,
    `archivoUrl` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos` (
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modalidades` (
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_varianteCursoId_fkey` FOREIGN KEY (`varianteCursoId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_paraleloId_fkey` FOREIGN KEY (`paraleloId`) REFERENCES `paralelos`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_plantillaId_fkey` FOREIGN KEY (`plantillaId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variantes_de_cursos` ADD CONSTRAINT `variantes_de_cursos_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
