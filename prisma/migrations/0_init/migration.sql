-- CreateTable
CREATE TABLE `mallas_curriculares` (
    `id` VARCHAR(191) NOT NULL,
    `modalidad` ENUM('VIRTUAL', 'PRESENCIAL', 'DUAL', 'EN_LINEA', 'SEMIPRESENCIAL') NOT NULL,
    `tituloObtenido` VARCHAR(191) NOT NULL,
    `tipoDuracion` ENUM('HORAS', 'SEMESTRES', 'CREDITOS', 'ANOS') NOT NULL,
    `fechaAprobacion` DATETIME(3) NOT NULL,
    `fechaLimiteVigencia` DATETIME(3) NOT NULL,
    `niveles` INTEGER NOT NULL,
    `maximoMateriasMatricula` INTEGER NOT NULL,
    `cantidadLibreOpcionEgreso` INTEGER NOT NULL,
    `cantidadOptativasEgreso` INTEGER NOT NULL,
    `cantidadArrastres` INTEGER NOT NULL,
    `practicasLigadasMaterias` BOOLEAN NOT NULL,
    `horasPractica` DOUBLE NOT NULL,
    `registroPracticasDesde` INTEGER NOT NULL,
    `horasVinculacion` DOUBLE NOT NULL,
    `registroVinculacionDesde` INTEGER NOT NULL,
    `registroProyectosDesde` INTEGER NOT NULL,
    `usaNivelacion` BOOLEAN NOT NULL,
    `plantillasSilabo` BOOLEAN NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `perfilEgreso` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instituciones` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('FISCAL', 'PARTICULAR') NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas_en_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `tipoAsignatura` ENUM('PRACTICA', 'TEORICA', 'TEORICA_PRACTICA') NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `permiteMatriculacion` BOOLEAN NOT NULL,
    `validaCredito` BOOLEAN NOT NULL,
    `validaPromedio` BOOLEAN NOT NULL,
    `costoEnMatricula` BOOLEAN NOT NULL,
    `practicasPreProfesionales` BOOLEAN NOT NULL,
    `requeridaEgreso` BOOLEAN NOT NULL,
    `cantidadMatriculas` INTEGER NOT NULL,
    `horasSemanales` DOUBLE NOT NULL,
    `horasColaborativas` DOUBLE NOT NULL,
    `horasAsistidasDocente` DOUBLE NOT NULL,
    `horasAutonomas` DOUBLE NOT NULL,
    `horasPracticas` DOUBLE NOT NULL,
    `creditos` DOUBLE NOT NULL,
    `noValidaAsistencia` BOOLEAN NOT NULL,
    `materiaComun` BOOLEAN NOT NULL,
    `objetivos` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `resultadosAprendizaje` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `asignaturaId` VARCHAR(191) NOT NULL,
    `mallaId` VARCHAR(191) NOT NULL,
    `areaConocimientoId` VARCHAR(191) NOT NULL,
    `campoFormacionId` VARCHAR(191) NOT NULL,
    `ejeFormativoId` VARCHAR(191) NULL,
    `esAnexo` BOOLEAN NOT NULL DEFAULT false,
    `sumaHoras` BOOLEAN NOT NULL,

    INDEX `asignaturas_en_mallas_areaConocimientoId_fkey`(`areaConocimientoId`),
    INDEX `asignaturas_en_mallas_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignaturas_en_mallas_campoFormacionId_fkey`(`campoFormacionId`),
    INDEX `asignaturas_en_mallas_ejeFormativoId_fkey`(`ejeFormativoId`),
    INDEX `asignaturas_en_mallas_mallaId_fkey`(`mallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas_en_variantes_curso` (
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
    `varianteCursoId` VARCHAR(191) NOT NULL,

    INDEX `asignaturas_en_variantes_curso_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignaturas_en_variantes_curso_varianteCursoId_fkey`(`varianteCursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lugares_ejecucion` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `mallaId` VARCHAR(191) NOT NULL,
    `institucionId` VARCHAR(191) NOT NULL,

    INDEX `lugares_ejecucion_institucionId_fkey`(`institucionId`),
    INDEX `lugares_ejecucion_mallaId_fkey`(`mallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titulos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `institucionId` VARCHAR(191) NULL,

    INDEX `titulos_institucionId_fkey`(`institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `nombre` VARCHAR(191) NOT NULL,
    `certificado` VARCHAR(191) NULL,
    `alias` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variantes_de_cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigoBase` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `registroExterno` BOOLEAN NOT NULL,
    `registroInterno` BOOLEAN NOT NULL,
    `verificarSesion` BOOLEAN NOT NULL,
    `verificarEdad` BOOLEAN NOT NULL,
    `edadMinima` INTEGER NULL,
    `edadMaxima` INTEGER NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `aprobarCursoPrevio` BOOLEAN NOT NULL,
    `costoPorMateria` BOOLEAN NOT NULL,
    `cumpleRequisitosMalla` BOOLEAN NOT NULL,
    `fechaAprobacion` DATETIME(3) NOT NULL,
    `pasarRecord` BOOLEAN NOT NULL,
    `registroDesdeOtraSede` BOOLEAN NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    INDEX `variantes_de_cursos_cursoId_fkey`(`cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competencias` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('ESPECIFICA', 'GENERICA') NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `asignaturaEnMallaId` VARCHAR(191) NULL,

    UNIQUE INDEX `competencias_asignaturaEnMallaId_key`(`asignaturaEnMallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ejes_formativos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas_de_conocimiento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_de_formacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `expires_in` INTEGER NULL,
    `ext_expires_in` INTEGER NULL,

    INDEX `accounts_userId_fkey`(`userId`),
    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    INDEX `sessions_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asignaturas_en_mallas` ADD CONSTRAINT `asignaturas_en_mallas_areaConocimientoId_fkey` FOREIGN KEY (`areaConocimientoId`) REFERENCES `areas_de_conocimiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_mallas` ADD CONSTRAINT `asignaturas_en_mallas_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_mallas` ADD CONSTRAINT `asignaturas_en_mallas_campoFormacionId_fkey` FOREIGN KEY (`campoFormacionId`) REFERENCES `campos_de_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_mallas` ADD CONSTRAINT `asignaturas_en_mallas_ejeFormativoId_fkey` FOREIGN KEY (`ejeFormativoId`) REFERENCES `ejes_formativos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_mallas` ADD CONSTRAINT `asignaturas_en_mallas_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_varianteCursoId_fkey` FOREIGN KEY (`varianteCursoId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lugares_ejecucion` ADD CONSTRAINT `lugares_ejecucion_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lugares_ejecucion` ADD CONSTRAINT `lugares_ejecucion_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulos` ADD CONSTRAINT `titulos_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variantes_de_cursos` ADD CONSTRAINT `variantes_de_cursos_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competencias` ADD CONSTRAINT `competencias_asignaturaEnMallaId_fkey` FOREIGN KEY (`asignaturaEnMallaId`) REFERENCES `asignaturas_en_mallas`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

