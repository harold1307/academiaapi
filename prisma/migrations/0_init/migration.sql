-- CreateTable
CREATE TABLE `practicas_pre_profesionales_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `requiereAutorizacion` BOOLEAN NOT NULL,
    `horas` INTEGER NULL,
    `creditos` DOUBLE NULL,
    `registroDesdeNivelId` VARCHAR(191) NULL,
    `registroPracticasAdelantadas` BOOLEAN NOT NULL,
    `mallaCurricularId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `practicas_pre_profesionales_mallas_registroDesdeNivelId_key`(`registroDesdeNivelId`),
    UNIQUE INDEX `practicas_pre_profesionales_mallas_mallaCurricularId_key`(`mallaCurricularId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practicas_comunitarias_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `requiereAutorizacion` BOOLEAN NOT NULL,
    `horas` INTEGER NULL,
    `creditos` DOUBLE NULL,
    `registroDesdeNivelId` VARCHAR(191) NULL,
    `registroPracticasAdelantadas` BOOLEAN NOT NULL,
    `registroMultiple` BOOLEAN NOT NULL,
    `mallaCurricularId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `practicas_comunitarias_mallas_registroDesdeNivelId_key`(`registroDesdeNivelId`),
    UNIQUE INDEX `practicas_comunitarias_mallas_mallaCurricularId_key`(`mallaCurricularId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mallas_curriculares` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `tipoDuracion` ENUM('HORAS', 'SEMESTRES', 'CREDITOS', 'ANOS') NULL,
    `codigo` VARCHAR(191) NULL,
    `fechaAprobacion` DATETIME(3) NOT NULL,
    `fechaLimiteVigencia` DATETIME(3) NOT NULL,
    `cantidadOtrasMateriasMatricula` INTEGER NOT NULL,
    `limiteSeleccionMateriaPorAdministrativo` BOOLEAN NOT NULL,
    `cantidadArrastres` INTEGER NULL,
    `porcentajeMinimoPasarNivel` INTEGER NULL,
    `maximoMateriasAdelantar` INTEGER NULL,
    `automatriculaModulos` BOOLEAN NOT NULL,
    `plantillasSilabo` BOOLEAN NOT NULL,
    `modeloPlanificacion` BOOLEAN NOT NULL,
    `perfilEgreso` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `tituloObtenidoId` VARCHAR(191) NULL,
    `modalidadId` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `mallas_curriculares_modalidadId_fkey`(`modalidadId`),
    INDEX `mallas_curriculares_programaId_fkey`(`programaId`),
    INDEX `mallas_curriculares_tituloObtenidoId_fkey`(`tituloObtenidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas_niveles_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `tipoAsignatura` ENUM('PRACTICA', 'TEORICA', 'TEORICA_PRACTICA') NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `permiteMatriculacion` BOOLEAN NOT NULL,
    `calculoNivel` BOOLEAN NOT NULL,
    `validaParaCredito` BOOLEAN NOT NULL,
    `validaParaPromedio` BOOLEAN NOT NULL,
    `costoEnMatricula` BOOLEAN NOT NULL,
    `requeridaParaEgresar` BOOLEAN NOT NULL,
    `cantidadMatriculas` INTEGER NOT NULL,
    `cantidadMatriculasAutorizadas` INTEGER NULL,
    `minimoCreditosRequeridos` INTEGER NULL,
    `maximaCantidadHorasSemanalas` DOUBLE NOT NULL,
    `horasColaborativas` DOUBLE NOT NULL,
    `horasAsistidasDocente` DOUBLE NOT NULL,
    `horasAutonomas` DOUBLE NOT NULL,
    `horasPracticas` DOUBLE NOT NULL,
    `sumaHoras` BOOLEAN NOT NULL,
    `creditos` DOUBLE NOT NULL,
    `horasProyectoIntegrador` DOUBLE NOT NULL,
    `noValidaAsistencia` BOOLEAN NOT NULL,
    `materiaComun` BOOLEAN NOT NULL,
    `guiaPracticaMetodologiaObligatoria` BOOLEAN NOT NULL,
    `aprobarGuiaPracticaMetodologica` BOOLEAN NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `objetivoGeneral` VARCHAR(191) NULL,
    `resultadosAprendizaje` VARCHAR(191) NULL,
    `aporteAsignaturaAlPerfil` VARCHAR(191) NULL,
    `competenciaGenerica` VARCHAR(191) NULL,
    `objetivosEspecificos` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `ejeFormativoId` VARCHAR(191) NOT NULL,
    `nivelMallaId` VARCHAR(191) NOT NULL,
    `asignaturaId` VARCHAR(191) NOT NULL,
    `areaConocimientoId` VARCHAR(191) NOT NULL,
    `campoFormacionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `asignaturas_niveles_mallas_areaConocimientoId_fkey`(`areaConocimientoId`),
    INDEX `asignaturas_niveles_mallas_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignaturas_niveles_mallas_campoFormacionId_fkey`(`campoFormacionId`),
    INDEX `asignaturas_niveles_mallas_ejeFormativoId_fkey`(`ejeFormativoId`),
    INDEX `asignaturas_niveles_mallas_nivelMallaId_fkey`(`nivelMallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveles_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `mallaId` VARCHAR(191) NOT NULL,
    `tituloObtenidoId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `niveles_mallas_mallaId_fkey`(`mallaId`),
    INDEX `niveles_mallas_tituloObtenidoId_fkey`(`tituloObtenidoId`),
    UNIQUE INDEX `niveles_mallas_nivel_mallaId_key`(`nivel`, `mallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas_modulo_mallas` (
    `id` VARCHAR(191) NOT NULL,
    `tipoAsignatura` ENUM('PRACTICA', 'TEORICA', 'TEORICA_PRACTICA') NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `permiteMatriculacion` BOOLEAN NOT NULL,
    `validaParaCredito` BOOLEAN NOT NULL,
    `validaParaPromedio` BOOLEAN NOT NULL,
    `costoEnMatricula` BOOLEAN NOT NULL,
    `requeridaParaGraduar` BOOLEAN NOT NULL,
    `cantidadMatriculas` INTEGER NOT NULL,
    `cantidadMatriculasAutorizadas` INTEGER NULL,
    `minimoCreditosRequeridos` INTEGER NULL,
    `maximaCantidadHorasSemanalas` DOUBLE NOT NULL,
    `horasColaborativas` DOUBLE NOT NULL,
    `horasAsistidasDocente` DOUBLE NOT NULL,
    `horasAutonomas` DOUBLE NOT NULL,
    `horasPracticas` DOUBLE NOT NULL,
    `sumaHoras` BOOLEAN NOT NULL,
    `creditos` DOUBLE NOT NULL,
    `noValidaAsistencia` BOOLEAN NOT NULL,
    `materiaGeneral` BOOLEAN NOT NULL,
    `guiaPracticaMetodologiaObligatoria` BOOLEAN NOT NULL,
    `aprobarGuiaPracticaMetodologica` BOOLEAN NOT NULL,
    `competencia` VARCHAR(191) NULL,
    `objetivosEspecificos` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `resultados` VARCHAR(191) NULL,
    `aporteAsignaturaAlPerfil` VARCHAR(191) NULL,
    `objetivoGeneral` VARCHAR(191) NULL,
    `asignaturaId` VARCHAR(191) NOT NULL,
    `areaConocimientoId` VARCHAR(191) NOT NULL,
    `campoFormacionId` VARCHAR(191) NOT NULL,
    `mallaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `asignaturas_modulo_mallas_areaConocimientoId_fkey`(`areaConocimientoId`),
    INDEX `asignaturas_modulo_mallas_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignaturas_modulo_mallas_campoFormacionId_fkey`(`campoFormacionId`),
    INDEX `asignaturas_modulo_mallas_mallaId_fkey`(`mallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sedes` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
    `creditos` DOUBLE NOT NULL,
    `requeridoAprobar` BOOLEAN NOT NULL,
    `sumaHoras` BOOLEAN NOT NULL,
    `asistenciaAprobar` INTEGER NULL,
    `notaMaxima` DOUBLE NULL,
    `notaMinima` DOUBLE NULL,
    `cantidadDecimales` INTEGER NULL,
    `asignaturaId` VARCHAR(191) NOT NULL,
    `varianteCursoId` VARCHAR(191) NOT NULL,
    `modeloEvaluativoId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `asignaturas_en_variantes_curso_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignaturas_en_variantes_curso_varianteCursoId_fkey`(`varianteCursoId`),
    INDEX `asignaturas_en_variantes_curso_modeloEvaluativoId_fkey`(`modeloEvaluativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lugares_ejecucion` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `mallaId` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `lugares_ejecucion_sedeId_fkey`(`sedeId`),
    INDEX `lugares_ejecucion_mallaId_fkey`(`mallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titulos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `titulos_sedeId_fkey`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ubicaciones_curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cursoEscuelaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ubicaciones_curso_escuelas_nombre_key`(`nombre`),
    INDEX `ubicaciones_curso_escuelas_cursoEscuelaId_fkey`(`cursoEscuelaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `administrativos_curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `cursoEscuelaId` VARCHAR(191) NOT NULL,
    `administrativoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `administrativos_curso_escuelas_administrativoId_fkey`(`administrativoId`),
    UNIQUE INDEX `administrativos_curso_escuelas_cursoEscuelaId_administrativo_key`(`cursoEscuelaId`, `administrativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curso_escuelas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `paraleloId` VARCHAR(191) NOT NULL,
    `sesionId` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `departamento` VARCHAR(191) NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `fechaLimiteRegistro` DATETIME(3) NOT NULL,
    `diasLimitePago` INTEGER NOT NULL,
    `cupos` INTEGER NULL,
    `evaluaProfesor` BOOLEAN NOT NULL,
    `matriculaConDeuda` BOOLEAN NOT NULL,
    `legalizarMatriculas` BOOLEAN NOT NULL,
    `registroExterno` BOOLEAN NOT NULL,
    `registroInterno` BOOLEAN NOT NULL,
    `verificaSesion` BOOLEAN NOT NULL,
    `registroDesdeOtraSede` BOOLEAN NOT NULL,
    `edadMinima` INTEGER NULL,
    `edadMaxima` INTEGER NULL,
    `costoPorMateria` BOOLEAN NOT NULL,
    `cumpleRequisitosMalla` BOOLEAN NOT NULL,
    `pasarRecord` BOOLEAN NOT NULL,
    `plantillaId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `periodoId` VARCHAR(191) NOT NULL,

    INDEX `curso_escuelas_paraleloId_fkey`(`paraleloId`),
    INDEX `curso_escuelas_periodoId_fkey`(`periodoId`),
    INDEX `curso_escuelas_plantillaId_fkey`(`plantillaId`),
    INDEX `curso_escuelas_sesionId_fkey`(`sesionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `asistenciaAprobar` INTEGER NULL,
    `notaMaxima` DOUBLE NULL,
    `notaMinima` DOUBLE NULL,
    `cantidadDecimales` INTEGER NULL,
    `asignaturaId` VARCHAR(191) NOT NULL,
    `cursoEscuelaId` VARCHAR(191) NOT NULL,
    `profesorId` VARCHAR(191) NULL,
    `modeloEvaluativoId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `asignatura_en_curso_escuela_asignaturaId_fkey`(`asignaturaId`),
    INDEX `asignatura_en_curso_escuela_cursoEscuelaId_fkey`(`cursoEscuelaId`),
    INDEX `asignatura_en_curso_escuela_modeloEvaluativoId_fkey`(`modeloEvaluativoId`),
    INDEX `asignatura_en_curso_escuela_profesorId_fkey`(`profesorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paralelos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variantes_de_cursos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `codigoBase` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `registroExterno` BOOLEAN NOT NULL,
    `registroInterno` BOOLEAN NOT NULL,
    `registroDesdeOtraSede` BOOLEAN NOT NULL,
    `costoPorMateria` BOOLEAN NOT NULL,
    `costoPorCantidadMateria` BOOLEAN NOT NULL,
    `verificaSesion` BOOLEAN NOT NULL,
    `edadMinima` INTEGER NULL,
    `edadMaxima` INTEGER NULL,
    `cumpleRequisitosMalla` BOOLEAN NOT NULL,
    `fechaAprobacion` DATETIME(3) NOT NULL,
    `pasarRecord` BOOLEAN NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `variantes_de_cursos_cursoId_fkey`(`cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competencias` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('ESPECIFICA', 'GENERICA') NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `competencias_programaId_fkey`(`programaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ejes_formativos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas_de_conocimiento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_de_formacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelos_contrato` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `paraProfesores` BOOLEAN NOT NULL,
    `archivoUrl` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modalidades` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turnos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `horas` DOUBLE NOT NULL,
    `comienza` TIME(0) NOT NULL,
    `termina` TIME(0) NOT NULL,
    `sesionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `turnos_sesionId_fkey`(`sesionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alternativas_evaluacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `campos_modelo_evaluativo_alternativaId_fkey`(`alternativaId`),
    INDEX `campos_modelo_evaluativo_modeloEvaluativoId_fkey`(`modeloEvaluativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelos_evaluativos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `notaRecuperacion` DOUBLE NOT NULL,
    `porcentajeAsistenciaAprobatoria` INTEGER NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `defineMaximos` BOOLEAN NOT NULL,
    `camposActualizanEstado` BOOLEAN NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelos_nivelacion` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_proyectos_integradores` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `ordenActa` INTEGER NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaMinima` DOUBLE NOT NULL,
    `decimales` INTEGER NOT NULL,
    `campoDependiente` BOOLEAN NOT NULL,
    `actualizaEstado` BOOLEAN NOT NULL,
    `determinaEstadoFinal` BOOLEAN NOT NULL,
    `proyectoIntegradorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `campos_proyectos_integradores_proyectoIntegradorId_fkey`(`proyectoIntegradorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos_integradores` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `notaMaxima` DOUBLE NOT NULL,
    `notaAprobatoria` DOUBLE NOT NULL,
    `decimalesNotaFinal` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesiones` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NOT NULL,
    `lunes` BOOLEAN NOT NULL,
    `martes` BOOLEAN NOT NULL,
    `miercoles` BOOLEAN NOT NULL,
    `jueves` BOOLEAN NOT NULL,
    `viernes` BOOLEAN NOT NULL,
    `sabado` BOOLEAN NOT NULL,
    `domingo` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `sesiones_sedeId_fkey`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metodologias_aprendizaje` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfiles_practica` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `capacidades` VARCHAR(191) NULL,
    `resultados` VARCHAR(191) NULL,
    `actividades` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfiles_practica_programas` (
    `perfilPracticaId` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `perfiles_practica_programas_programaId_fkey`(`programaId`),
    PRIMARY KEY (`perfilPracticaId`, `programaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos_acreditables_evaluacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento_programa` (
    `id` VARCHAR(191) NOT NULL,
    `requeridoFisico` BOOLEAN NOT NULL,
    `requeridoDigital` BOOLEAN NOT NULL,
    `tipoDocumentoId` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tipo_documento_programa_programaId_fkey`(`programaId`),
    INDEX `tipo_documento_programa_tipoDocumentoId_fkey`(`tipoDocumentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveles_titulacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalles_niveles_titucion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `nivelTitulacionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `detalles_niveles_titucion_nivelTitulacionId_fkey`(`nivelTitulacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titulos_obtenidos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `titulos_obtenidos_programaId_fkey`(`programaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coordinaciones` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `coordinaciones_sedeId_fkey`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programas` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `nombre` VARCHAR(191) NOT NULL,
    `mencion` VARCHAR(191) NULL,
    `alias` VARCHAR(191) NOT NULL,
    `detalleNivelTitulacionId` VARCHAR(191) NOT NULL,
    `coordinacionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `programas_coordinacionId_fkey`(`coordinacionId`),
    INDEX `programas_detalleNivelTitulacionId_fkey`(`detalleNivelTitulacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materias_niveles_academicos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `numero` INTEGER NOT NULL AUTO_INCREMENT,
    `alias` VARCHAR(191) NULL,
    `materiaExterna` BOOLEAN NOT NULL DEFAULT false,
    `practicasPermitidas` BOOLEAN NOT NULL DEFAULT false,
    `validaParaCreditos` BOOLEAN NOT NULL,
    `validaParaPromedio` BOOLEAN NOT NULL,
    `sumaHorasProfesor` BOOLEAN NOT NULL DEFAULT true,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `asignaturaEnNivelMallaId` VARCHAR(191) NULL,
    `nivelAcademicoId` VARCHAR(191) NOT NULL,
    `asignaturaModuloId` VARCHAR(191) NULL,
    `modeloEvaluativoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `materias_niveles_academicos_numero_key`(`numero`),
    INDEX `materias_niveles_academicos_numero_idx`(`numero`),
    INDEX `materias_niveles_academicos_asignaturaEnNivelMallaId_fkey`(`asignaturaEnNivelMallaId`),
    INDEX `materias_niveles_academicos_asignaturaModuloId_fkey`(`asignaturaModuloId`),
    INDEX `materias_niveles_academicos_modeloEvaluativoId_fkey`(`modeloEvaluativoId`),
    UNIQUE INDEX `materias_niveles_academicos_nivelAcademicoId_asignaturaEnNiv_key`(`nivelAcademicoId`, `asignaturaEnNivelMallaId`),
    UNIQUE INDEX `materias_niveles_academicos_nivelAcademicoId_asignaturaModul_key`(`nivelAcademicoId`, `asignaturaModuloId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveles_academicos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `profesores` BOOLEAN NOT NULL DEFAULT true,
    `horarios` BOOLEAN NOT NULL DEFAULT true,
    `cuposMaterias` BOOLEAN NOT NULL DEFAULT true,
    `planificacionProfesores` BOOLEAN NOT NULL DEFAULT true,
    `matriculacion` BOOLEAN NOT NULL DEFAULT false,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `inicioAgregaciones` DATETIME(3) NOT NULL,
    `limiteAgregaciones` DATETIME(3) NOT NULL,
    `validaRequisitosMalla` BOOLEAN NOT NULL,
    `validaCumplimientoMaterias` BOOLEAN NOT NULL,
    `horasMinimasPracticasComunitarias` DOUBLE NULL,
    `horasMinimasPracticasPreprofesionales` DOUBLE NULL,
    `estudiantesPuedenSeleccionarMaterias` BOOLEAN NOT NULL,
    `estudiantesPuedenSeleccionarMateriasOtrosHorarios` BOOLEAN NOT NULL,
    `estudiantesPuedenSeleccionarMateriasOtrasModalidades` BOOLEAN NOT NULL,
    `estudiantesRegistranProyectosIntegradores` BOOLEAN NOT NULL,
    `redireccionAPagos` BOOLEAN NOT NULL,
    `limiteOrdinaria` DATETIME(3) NOT NULL,
    `limiteExtraordinaria` DATETIME(3) NOT NULL,
    `limiteEspecial` DATETIME(3) NOT NULL,
    `diasVencimientoMatricula` INTEGER NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `mensaje` VARCHAR(191) NULL,
    `terminosCondiciones` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modeloEvaluativoId` VARCHAR(191) NOT NULL,
    `nivelMallaId` VARCHAR(191) NOT NULL,
    `paraleloId` VARCHAR(191) NOT NULL,
    `periodoId` VARCHAR(191) NOT NULL,
    `sesionId` VARCHAR(191) NOT NULL,

    INDEX `niveles_academicos_modeloEvaluativoId_fkey`(`modeloEvaluativoId`),
    INDEX `niveles_academicos_nivelMallaId_fkey`(`nivelMallaId`),
    INDEX `niveles_academicos_periodoId_fkey`(`periodoId`),
    INDEX `niveles_academicos_sesionId_fkey`(`sesionId`),
    UNIQUE INDEX `niveles_academicos_paraleloId_nivelMallaId_sesionId_periodoI_key`(`paraleloId`, `nivelMallaId`, `sesionId`, `periodoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horarios` (
    `id` VARCHAR(191) NOT NULL,
    `dia` ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO') NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `materiaId` VARCHAR(191) NOT NULL,
    `nivelAcademicoId` VARCHAR(191) NOT NULL,
    `turnoId` VARCHAR(191) NOT NULL,
    `ubicacionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `horarios_materiaId_fkey`(`materiaId`),
    INDEX `horarios_nivelAcademicoId_fkey`(`nivelAcademicoId`),
    INDEX `horarios_turnoId_fkey`(`turnoId`),
    INDEX `horarios_ubicacionId_fkey`(`ubicacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ubicaciones` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('AULA', 'LABORATORIO', 'TALLER', 'SALON') NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `entornoVirtual` BOOLEAN NOT NULL,
    `sedeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ubicaciones_sedeId_fkey`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cortes` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calculos_costos` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('COSTO_POR_NIVEL_Y_MATERIAS', 'COSTO_POR_PLAN_CUOTA') NOT NULL,
    `costoPorSesion` BOOLEAN NULL,
    `estudiantesEligenOpcionPago` BOOLEAN NULL,
    `cronogramaFechasOpcionPago` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requisitos_matriculacion` (
    `id` VARCHAR(191) NOT NULL,
    `obligatorio` BOOLEAN NOT NULL,
    `transferenciaIES` BOOLEAN NOT NULL,
    `primeraMatricula` BOOLEAN NOT NULL,
    `repitenMaterias` BOOLEAN NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `tipoDocumentoId` VARCHAR(191) NOT NULL,
    `periodoId` VARCHAR(191) NOT NULL,
    `nivelId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requisitos_matriculacion_nivelId_fkey`(`nivelId`),
    INDEX `requisitos_matriculacion_periodoId_fkey`(`periodoId`),
    INDEX `requisitos_matriculacion_tipoDocumentoId_fkey`(`tipoDocumentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cronogramas_matriculacion` (
    `id` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `nivelId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `periodoId` VARCHAR(191) NOT NULL,

    INDEX `cronogramas_matriculacion_nivelId_fkey`(`nivelId`),
    INDEX `cronogramas_matriculacion_periodoId_fkey`(`periodoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_periodos_lectivos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `periodoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `sub_periodos_lectivos_periodoId_fkey`(`periodoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodos_lectivos` (
    `id` VARCHAR(191) NOT NULL,
    `matriculas` BOOLEAN NOT NULL DEFAULT false,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `abierto` BOOLEAN NOT NULL DEFAULT true,
    `nombre` VARCHAR(191) NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,
    `limiteMatriculaOrdinaria` DATETIME(3) NULL,
    `limiteMatriculaExtraordinaria` DATETIME(3) NULL,
    `limiteMatriculaEspecial` DATETIME(3) NULL,
    `automatriculaAlumnosFechaExtraordinaria` BOOLEAN NULL,
    `tipo` ENUM('GRADO', 'POSGRADO') NOT NULL,
    `estudianteSeleccionaParaleloAutomatricula` BOOLEAN NULL,
    `seImpartioNivelacion` BOOLEAN NOT NULL,
    `planificacionCargaHoraria` BOOLEAN NOT NULL,
    `planificacionProfesoresFormaTotal` BOOLEAN NULL,
    `aprobacionPlanificacionProfesores` BOOLEAN NULL,
    `cronogramaNotasCoordinacion` BOOLEAN NOT NULL,
    `legalizacionAutomaticaContraPagos` BOOLEAN NULL,
    `puedenMatricularseArrastre` BOOLEAN NOT NULL,
    `puedenAutomatricularseSegundasOMasMatriculas` BOOLEAN NOT NULL,
    `numeroSecuencia` INTEGER NULL,
    `numeroMatriculaAutomatico` BOOLEAN NULL,
    `numeroMatricularAlLegalizar` BOOLEAN NULL,
    `actividadesDocencia` BOOLEAN NOT NULL DEFAULT true,
    `actividadesInvestigacion` BOOLEAN NOT NULL DEFAULT true,
    `actividadesGestion` BOOLEAN NOT NULL DEFAULT true,
    `actividadesPracticasComunitarias` BOOLEAN NOT NULL DEFAULT false,
    `actividadesPracticasPreprofesionales` BOOLEAN NOT NULL DEFAULT false,
    `otrasActividades` BOOLEAN NOT NULL DEFAULT false,
    `corteId` VARCHAR(191) NULL,
    `calculoCostoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `periodos_lectivos_calculoCostoId_fkey`(`calculoCostoId`),
    INDEX `periodos_lectivos_corteId_fkey`(`corteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centros_informacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `centros_informacion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos` (
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `grupos_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_en_grupos` (
    `grupoId` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,

    INDEX `usuarios_en_grupos_usuarioId_fkey`(`usuarioId`),
    PRIMARY KEY (`grupoId`, `usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscripciones` (
    `id` VARCHAR(191) NOT NULL,
    `matricula` BOOLEAN NOT NULL DEFAULT true,
    `matricularseConLimite` BOOLEAN NOT NULL DEFAULT false,
    `alumnoId` VARCHAR(191) NOT NULL,
    `nivelAcademicoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `inscripciones_nivelAcademicoId_fkey`(`nivelAcademicoId`),
    UNIQUE INDEX `inscripciones_alumnoId_nivelAcademicoId_key`(`alumnoId`, `nivelAcademicoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumnos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` ENUM('ACTIVO', 'EGRESADO', 'RETIRADO') NOT NULL DEFAULT 'ACTIVO',
    `colegio` VARCHAR(191) NULL,
    `especialidad` VARCHAR(191) NULL,
    `fechaInscripcion` DATETIME(3) NOT NULL,
    `codigoPromocion` VARCHAR(191) NULL,
    `archivador` VARCHAR(191) NULL,
    `comoNosConocio` ENUM('FACEBOOK', 'INSTAGRAM', 'OTROS_MEDIOS', 'PERIODICO', 'PUBLICIDAD_FISICA', 'RADIO', 'REDES_SOCIALES', 'TELEVISION', 'TIKTOK', 'TWITTER', 'UN_AMIGO_ESTUDIO_AQUI', 'UN_FAMILIAR_ESTUDIO_AQUI', 'VISITAS_A_COLEGIOS') NOT NULL,
    `razonesParaInscribirse` ENUM('AMIGOS', 'CARRERAS', 'HORARIOS', 'INSTALACIONES', 'MENCIONES') NOT NULL,
    `fechaExamenSNNA` DATETIME(3) NULL,
    `puntajeSNNA` DOUBLE NULL,
    `titulo` BOOLEAN NOT NULL,
    `papeletaVotacion` BOOLEAN NOT NULL,
    `copiaLicencia` BOOLEAN NOT NULL,
    `condicionado` BOOLEAN NOT NULL,
    `rindioExamenEgresoInstitucion` BOOLEAN NOT NULL,
    `actaGrado` BOOLEAN NOT NULL,
    `partidaNacimiento` BOOLEAN NOT NULL,
    `certificadoAntecedentes` BOOLEAN NOT NULL,
    `planillaServicioBasico` BOOLEAN NOT NULL,
    `transferenciaOtraIES` BOOLEAN NOT NULL,
    `certificadoEstudios` BOOLEAN NOT NULL,
    `documentosHomologacion` BOOLEAN NOT NULL,
    `certificadoSanguineo` BOOLEAN NOT NULL,
    `silabos` BOOLEAN NOT NULL,
    `cedula` BOOLEAN NOT NULL,
    `fotos` BOOLEAN NOT NULL,
    `certificadoSalud` BOOLEAN NOT NULL,
    `transcript` BOOLEAN NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `centroInformacionId` VARCHAR(191) NOT NULL,
    `asesorCrmId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `alumnos_usuarioId_key`(`usuarioId`),
    INDEX `alumnos_asesorCrmId_fkey`(`asesorCrmId`),
    INDEX `alumnos_centroInformacionId_fkey`(`centroInformacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsables_crm` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `administrativoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `responsables_crm_administrativoId_key`(`administrativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesores_estudiantes_alumnos` (
    `id` VARCHAR(191) NOT NULL,
    `seguimientoBienestar` BOOLEAN NOT NULL,
    `seguimientoExpediente` BOOLEAN NOT NULL,
    `asesorEstudianteId` VARCHAR(191) NOT NULL,
    `alumnoId` VARCHAR(191) NOT NULL,

    INDEX `asesores_estudiantes_alumnos_alumnoId_fkey`(`alumnoId`),
    UNIQUE INDEX `asesores_estudiantes_alumnos_asesorEstudianteId_alumnoId_key`(`asesorEstudianteId`, `alumnoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesores_estudiantes` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `seguimientoBienestar` BOOLEAN NOT NULL,
    `seguimientoExpediente` BOOLEAN NOT NULL,
    `administrativoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `asesores_estudiantes_administrativoId_key`(`administrativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsable_en_asesores_estudiantes` (
    `id` VARCHAR(191) NOT NULL,
    `responsableId` VARCHAR(191) NOT NULL,
    `asesorEstudianteId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `responsable_en_asesores_estudiantes_asesorEstudianteId_fkey`(`asesorEstudianteId`),
    UNIQUE INDEX `responsable_en_asesores_estudiantes_responsableId_asesorEstu_key`(`responsableId`, `asesorEstudianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsables_asesores_estudiantes` (
    `id` VARCHAR(191) NOT NULL,
    `seguimientoBienestar` BOOLEAN NOT NULL,
    `seguimientoExpediente` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesores_crm` (
    `id` VARCHAR(191) NOT NULL,
    `administrativoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `asesores_crm_administrativoId_key`(`administrativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesores_centros_informacion` (
    `id` VARCHAR(191) NOT NULL,
    `asesorId` VARCHAR(191) NOT NULL,
    `centroInformacionId` VARCHAR(191) NOT NULL,

    INDEX `asesores_centros_informacion_centroInformacionId_fkey`(`centroInformacionId`),
    UNIQUE INDEX `asesores_centros_informacion_asesorId_centroInformacionId_key`(`asesorId`, `centroInformacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `administrativos` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `parametrosInstitucion` BOOLEAN NOT NULL DEFAULT false,
    `talentoHumano` BOOLEAN NOT NULL DEFAULT false,
    `personalAdministrativo` BOOLEAN NOT NULL DEFAULT false,
    `profesores` BOOLEAN NOT NULL DEFAULT false,
    `periodosLectivos` BOOLEAN NOT NULL DEFAULT false,
    `asignaturas` BOOLEAN NOT NULL DEFAULT false,
    `modelosEvaluativos` BOOLEAN NOT NULL DEFAULT false,
    `crmPreinscritos` BOOLEAN NOT NULL DEFAULT false,
    `sedeId` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `administrativos_usuarioId_key`(`usuarioId`),
    INDEX `administrativos_sedeId_fkey`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesores` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `tiempoDedicacion` ENUM('TIEMPO_COMPLETO', 'TIEMPO_PARCIAL', 'MEDIO_TIEMPO') NOT NULL,
    `categoria` ENUM('HONORARIO', 'INVITADO', 'OCASIONAL', 'TITULAR_AGREGADO', 'TITULAR_AUXILIAR', 'TITULAR_PRINCIPAL') NOT NULL,
    `coordinacionId` VARCHAR(191) NOT NULL,
    `programaId` VARCHAR(191) NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `profesores_usuarioId_key`(`usuarioId`),
    INDEX `profesores_coordinacionId_fkey`(`coordinacionId`),
    INDEX `profesores_programaId_fkey`(`programaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `callePrincipal` VARCHAR(191) NULL,
    `calleSecundaria` VARCHAR(191) NULL,
    `cantonNacimiento` VARCHAR(191) NULL,
    `cedula` VARCHAR(191) NULL,
    `correoElectronico` VARCHAR(191) NULL,
    `correoInstitucional` VARCHAR(191) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `estadoCivil` ENUM('SOLTERO', 'CASADO', 'DIVORCIADO', 'UNION_LIBRE', 'UNION_DE_HECHO', 'VIUDO') NULL,
    `etnia` ENUM('AFROECUATORIANO', 'BLANCO', 'INDIGENA', 'MESTIZO', 'MONTUVIO', 'MULATO', 'NEGRO', 'OTRO') NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `genero` ENUM('FEMENINO', 'MASCULINO') NULL,
    `nacionalidad` VARCHAR(191) NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `numeroDomicilio` VARCHAR(191) NULL,
    `paisNacimiento` VARCHAR(191) NULL,
    `paisResidencia` VARCHAR(191) NULL,
    `parroquiaNacimiento` VARCHAR(191) NULL,
    `pasaporte` VARCHAR(191) NULL,
    `primerApellido` VARCHAR(191) NOT NULL,
    `provinciaDondeSufraga` VARCHAR(191) NULL,
    `provinciaNacimiento` VARCHAR(191) NULL,
    `segundoApellido` VARCHAR(191) NULL,
    `sexo` ENUM('HOMBRE', 'MUJER') NOT NULL,
    `telefonoFijo` VARCHAR(191) NULL,
    `telefonoMovil` VARCHAR(191) NULL,
    `tipoSangre` VARCHAR(191) NULL,
    `tipo` ENUM('PROFESOR', 'ADMINISTRATIVO', 'ALUMNO') NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_correoInstitucional_key`(`correoInstitucional`),
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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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

-- AddForeignKey
ALTER TABLE `practicas_pre_profesionales_mallas` ADD CONSTRAINT `practicas_pre_profesionales_mallas_mallaCurricularId_fkey` FOREIGN KEY (`mallaCurricularId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practicas_pre_profesionales_mallas` ADD CONSTRAINT `practicas_pre_profesionales_mallas_registroDesdeNivelId_fkey` FOREIGN KEY (`registroDesdeNivelId`) REFERENCES `niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practicas_comunitarias_mallas` ADD CONSTRAINT `practicas_comunitarias_mallas_mallaCurricularId_fkey` FOREIGN KEY (`mallaCurricularId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practicas_comunitarias_mallas` ADD CONSTRAINT `practicas_comunitarias_mallas_registroDesdeNivelId_fkey` FOREIGN KEY (`registroDesdeNivelId`) REFERENCES `niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mallas_curriculares` ADD CONSTRAINT `mallas_curriculares_modalidadId_fkey` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mallas_curriculares` ADD CONSTRAINT `mallas_curriculares_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mallas_curriculares` ADD CONSTRAINT `mallas_curriculares_tituloObtenidoId_fkey` FOREIGN KEY (`tituloObtenidoId`) REFERENCES `titulos_obtenidos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_niveles_mallas` ADD CONSTRAINT `asignaturas_niveles_mallas_areaConocimientoId_fkey` FOREIGN KEY (`areaConocimientoId`) REFERENCES `areas_de_conocimiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_niveles_mallas` ADD CONSTRAINT `asignaturas_niveles_mallas_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_niveles_mallas` ADD CONSTRAINT `asignaturas_niveles_mallas_campoFormacionId_fkey` FOREIGN KEY (`campoFormacionId`) REFERENCES `campos_de_formacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_niveles_mallas` ADD CONSTRAINT `asignaturas_niveles_mallas_ejeFormativoId_fkey` FOREIGN KEY (`ejeFormativoId`) REFERENCES `ejes_formativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_niveles_mallas` ADD CONSTRAINT `asignaturas_niveles_mallas_nivelMallaId_fkey` FOREIGN KEY (`nivelMallaId`) REFERENCES `niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_mallas` ADD CONSTRAINT `niveles_mallas_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_mallas` ADD CONSTRAINT `niveles_mallas_tituloObtenidoId_fkey` FOREIGN KEY (`tituloObtenidoId`) REFERENCES `titulos_obtenidos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_modulo_mallas` ADD CONSTRAINT `asignaturas_modulo_mallas_areaConocimientoId_fkey` FOREIGN KEY (`areaConocimientoId`) REFERENCES `areas_de_conocimiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_modulo_mallas` ADD CONSTRAINT `asignaturas_modulo_mallas_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_modulo_mallas` ADD CONSTRAINT `asignaturas_modulo_mallas_campoFormacionId_fkey` FOREIGN KEY (`campoFormacionId`) REFERENCES `campos_de_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_modulo_mallas` ADD CONSTRAINT `asignaturas_modulo_mallas_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas_en_variantes_curso` ADD CONSTRAINT `asignaturas_en_variantes_curso_varianteCursoId_fkey` FOREIGN KEY (`varianteCursoId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lugares_ejecucion` ADD CONSTRAINT `lugares_ejecucion_mallaId_fkey` FOREIGN KEY (`mallaId`) REFERENCES `mallas_curriculares`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lugares_ejecucion` ADD CONSTRAINT `lugares_ejecucion_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulos` ADD CONSTRAINT `titulos_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ubicaciones_curso_escuelas` ADD CONSTRAINT `ubicaciones_curso_escuelas_cursoEscuelaId_fkey` FOREIGN KEY (`cursoEscuelaId`) REFERENCES `curso_escuelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrativos_curso_escuelas` ADD CONSTRAINT `administrativos_curso_escuelas_administrativoId_fkey` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrativos_curso_escuelas` ADD CONSTRAINT `administrativos_curso_escuelas_cursoEscuelaId_fkey` FOREIGN KEY (`cursoEscuelaId`) REFERENCES `curso_escuelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_paraleloId_fkey` FOREIGN KEY (`paraleloId`) REFERENCES `paralelos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos_lectivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_plantillaId_fkey` FOREIGN KEY (`plantillaId`) REFERENCES `variantes_de_cursos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curso_escuelas` ADD CONSTRAINT `curso_escuelas_sesionId_fkey` FOREIGN KEY (`sesionId`) REFERENCES `sesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `asignaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_cursoEscuelaId_fkey` FOREIGN KEY (`cursoEscuelaId`) REFERENCES `curso_escuelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignatura_en_curso_escuela` ADD CONSTRAINT `asignatura_en_curso_escuela_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variantes_de_cursos` ADD CONSTRAINT `variantes_de_cursos_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competencias` ADD CONSTRAINT `competencias_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `turnos_sesionId_fkey` FOREIGN KEY (`sesionId`) REFERENCES `sesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_modelo_evaluativo` ADD CONSTRAINT `campos_modelo_evaluativo_alternativaId_fkey` FOREIGN KEY (`alternativaId`) REFERENCES `alternativas_evaluacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_modelo_evaluativo` ADD CONSTRAINT `campos_modelo_evaluativo_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_proyectos_integradores` ADD CONSTRAINT `campos_proyectos_integradores_proyectoIntegradorId_fkey` FOREIGN KEY (`proyectoIntegradorId`) REFERENCES `proyectos_integradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfiles_practica_programas` ADD CONSTRAINT `perfiles_practica_programas_perfilPracticaId_fkey` FOREIGN KEY (`perfilPracticaId`) REFERENCES `perfiles_practica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfiles_practica_programas` ADD CONSTRAINT `perfiles_practica_programas_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_documento_programa` ADD CONSTRAINT `tipo_documento_programa_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_documento_programa` ADD CONSTRAINT `tipo_documento_programa_tipoDocumentoId_fkey` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipos_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalles_niveles_titucion` ADD CONSTRAINT `detalles_niveles_titucion_nivelTitulacionId_fkey` FOREIGN KEY (`nivelTitulacionId`) REFERENCES `niveles_titulacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulos_obtenidos` ADD CONSTRAINT `titulos_obtenidos_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coordinaciones` ADD CONSTRAINT `coordinaciones_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas` ADD CONSTRAINT `programas_coordinacionId_fkey` FOREIGN KEY (`coordinacionId`) REFERENCES `coordinaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programas` ADD CONSTRAINT `programas_detalleNivelTitulacionId_fkey` FOREIGN KEY (`detalleNivelTitulacionId`) REFERENCES `detalles_niveles_titucion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materias_niveles_academicos` ADD CONSTRAINT `materias_niveles_academicos_asignaturaEnNivelMallaId_fkey` FOREIGN KEY (`asignaturaEnNivelMallaId`) REFERENCES `asignaturas_niveles_mallas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materias_niveles_academicos` ADD CONSTRAINT `materias_niveles_academicos_asignaturaModuloId_fkey` FOREIGN KEY (`asignaturaModuloId`) REFERENCES `asignaturas_modulo_mallas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materias_niveles_academicos` ADD CONSTRAINT `materias_niveles_academicos_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materias_niveles_academicos` ADD CONSTRAINT `materias_niveles_academicos_nivelAcademicoId_fkey` FOREIGN KEY (`nivelAcademicoId`) REFERENCES `niveles_academicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_academicos` ADD CONSTRAINT `niveles_academicos_modeloEvaluativoId_fkey` FOREIGN KEY (`modeloEvaluativoId`) REFERENCES `modelos_evaluativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_academicos` ADD CONSTRAINT `niveles_academicos_nivelMallaId_fkey` FOREIGN KEY (`nivelMallaId`) REFERENCES `niveles_mallas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_academicos` ADD CONSTRAINT `niveles_academicos_paraleloId_fkey` FOREIGN KEY (`paraleloId`) REFERENCES `paralelos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_academicos` ADD CONSTRAINT `niveles_academicos_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos_lectivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles_academicos` ADD CONSTRAINT `niveles_academicos_sesionId_fkey` FOREIGN KEY (`sesionId`) REFERENCES `sesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios` ADD CONSTRAINT `horarios_materiaId_fkey` FOREIGN KEY (`materiaId`) REFERENCES `materias_niveles_academicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios` ADD CONSTRAINT `horarios_nivelAcademicoId_fkey` FOREIGN KEY (`nivelAcademicoId`) REFERENCES `niveles_academicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios` ADD CONSTRAINT `horarios_turnoId_fkey` FOREIGN KEY (`turnoId`) REFERENCES `turnos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios` ADD CONSTRAINT `horarios_ubicacionId_fkey` FOREIGN KEY (`ubicacionId`) REFERENCES `ubicaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ubicaciones` ADD CONSTRAINT `ubicaciones_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos_lectivos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisitos_matriculacion` ADD CONSTRAINT `requisitos_matriculacion_tipoDocumentoId_fkey` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipos_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cronogramas_matriculacion` ADD CONSTRAINT `cronogramas_matriculacion_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `niveles_mallas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cronogramas_matriculacion` ADD CONSTRAINT `cronogramas_matriculacion_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos_lectivos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_periodos_lectivos` ADD CONSTRAINT `sub_periodos_lectivos_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos_lectivos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodos_lectivos` ADD CONSTRAINT `periodos_lectivos_calculoCostoId_fkey` FOREIGN KEY (`calculoCostoId`) REFERENCES `calculos_costos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodos_lectivos` ADD CONSTRAINT `periodos_lectivos_corteId_fkey` FOREIGN KEY (`corteId`) REFERENCES `cortes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_en_grupos` ADD CONSTRAINT `usuarios_en_grupos_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_en_grupos` ADD CONSTRAINT `usuarios_en_grupos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscripciones` ADD CONSTRAINT `inscripciones_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscripciones` ADD CONSTRAINT `inscripciones_nivelAcademicoId_fkey` FOREIGN KEY (`nivelAcademicoId`) REFERENCES `niveles_academicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumnos` ADD CONSTRAINT `alumnos_asesorCrmId_fkey` FOREIGN KEY (`asesorCrmId`) REFERENCES `asesores_crm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumnos` ADD CONSTRAINT `alumnos_centroInformacionId_fkey` FOREIGN KEY (`centroInformacionId`) REFERENCES `centros_informacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumnos` ADD CONSTRAINT `alumnos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responsables_crm` ADD CONSTRAINT `responsables_crm_administrativoId_fkey` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_estudiantes_alumnos` ADD CONSTRAINT `asesores_estudiantes_alumnos_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_estudiantes_alumnos` ADD CONSTRAINT `asesores_estudiantes_alumnos_asesorEstudianteId_fkey` FOREIGN KEY (`asesorEstudianteId`) REFERENCES `asesores_estudiantes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_estudiantes` ADD CONSTRAINT `asesores_estudiantes_administrativoId_fkey` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responsable_en_asesores_estudiantes` ADD CONSTRAINT `responsable_en_asesores_estudiantes_asesorEstudianteId_fkey` FOREIGN KEY (`asesorEstudianteId`) REFERENCES `asesores_estudiantes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responsable_en_asesores_estudiantes` ADD CONSTRAINT `responsable_en_asesores_estudiantes_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `responsables_asesores_estudiantes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_crm` ADD CONSTRAINT `asesores_crm_administrativoId_fkey` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_centros_informacion` ADD CONSTRAINT `asesores_centros_informacion_asesorId_fkey` FOREIGN KEY (`asesorId`) REFERENCES `asesores_crm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesores_centros_informacion` ADD CONSTRAINT `asesores_centros_informacion_centroInformacionId_fkey` FOREIGN KEY (`centroInformacionId`) REFERENCES `centros_informacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrativos` ADD CONSTRAINT `administrativos_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrativos` ADD CONSTRAINT `administrativos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesores` ADD CONSTRAINT `profesores_coordinacionId_fkey` FOREIGN KEY (`coordinacionId`) REFERENCES `coordinaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesores` ADD CONSTRAINT `profesores_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `programas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesores` ADD CONSTRAINT `profesores_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

