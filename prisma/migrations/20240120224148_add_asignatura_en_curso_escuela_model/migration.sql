-- CreateTable
CREATE TABLE `asignatura_en_curso_escuela` (
    `id` VARCHAR(191) NOT NULL,
    `validaCredito` BOOLEAN NOT NULL,
    `validaPromedio` BOOLEAN NOT NULL,
    `horasColaborativas` DOUBLE NOT NULL,
    `horasAsistidasDocente` DOUBLE NOT NULL,
    `horasAutonomas` DOUBLE NOT NULL,
    `horasPracticas` DOUBLE NOT NULL,
    `sumaHoras` BOOLEAN NOT NULL,
    `creditos` DOUBLE NOT NULL,
    `requeridoAprobar` BOOLEAN NOT NULL,
    `asistenciaAprobar` INTEGER NOT NULL,
    `asignaturaId` VARCHAR(191) NOT NULL,
    `cursoEscuelaId` VARCHAR(191) NOT NULL,
    `profesorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_cursoEscuelaId_fkey` FOREIGN KEY (`cursoEscuelaId`) REFERENCES `curso_escuelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
