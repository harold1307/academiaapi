export const TYPES = {
	PrismaClient: Symbol.for("PrismaClient"),
	InstitucionRepository: Symbol.for("InstitucionRepository"),
	InstitucionService: Symbol.for("InstitucionService"),
	MallaCurricularRepository: Symbol.for("MallaCurricularRepository"),
	MallaCurricularService: Symbol.for("MallaCurricularService"),
	AsignaturaRepository: Symbol.for("AsignaturaRepository"),
	AsignaturaService: Symbol.for("AsignaturaService"),
	CursoRepository: Symbol.for("CursoRepository"),
	CursoService: Symbol.for("CursoService"),
	CompetenciaRepository: Symbol.for("CompetenciaRepository"),
	CompetenciaService: Symbol.for("CompetenciaService"),
	AsignaturaEnMallaRepository: Symbol.for("AsignaturaEnMallaRepository"),
	AsignaturaEnMallaService: Symbol.for("AsignaturaEnMallaService"),
	EjeFormativoRepository: Symbol.for("EjeFormativoRepository"),
	EjeFormativoService: Symbol.for("EjeFormativoService"),
	CampoFormacionRepository: Symbol.for("CampoFormacionRepository"),
	CampoFormacionService: Symbol.for("CampoFormacionService"),
	AreaConocimientoRepository: Symbol.for("AreaConocimientoRepository"),
	AreaConocimientoService: Symbol.for("AreaConocimientoService"),
	LugarEjecucionRepository: Symbol.for("LugarEjecucionRepository"),
	AsignaturaEnVarianteCursoRepository: Symbol.for(
		"AsignaturaEnVarianteCursoRepository",
	),
	VarianteCursoRepository: Symbol.for("VarianteCursoRepository"),
	VarianteCursoService: Symbol.for("VarianteCursoService"),
	AsignaturaEnVarianteCursoService: Symbol.for(
		"AsignaturaEnVarianteCursoService",
	),
	ModalidadRepository: Symbol.for("ModalidadRepository"),
	ModalidadService: Symbol.for("ModalidadService"),
	CursoEscuelaRepository: Symbol.for("CursoEscuelaRepository"),
	CursoEscuelaService: Symbol.for("CursoEscuelaService"),
	ParaleloRepository: Symbol.for("ParaleloRepository"),
	ParaleloService: Symbol.for("ParaleloService"),
	SesionRepository: Symbol.for("SesionRepository"),
	SesionService: Symbol.for("SesionService"),
	TurnoRepository: Symbol.for("TurnoRepository"),
	TurnoService: Symbol.for("TurnoService"),
	AsignaturaEnCursoEscuelaRepository: Symbol.for(
		"AsignaturaEnCursoEscuelaRepository",
	),
	AsignaturaEnCursoEscuelaService: Symbol.for(
		"AsignaturaEnCursoEscuelaService",
	),
	AlternativaEvaluacionRepository: Symbol.for(
		"AlternativaEvaluacionRepository",
	),
	AlternativaEvaluacionService: Symbol.for("AlternativaEvaluacionService"),
	ModeloEvaluativoRepository: Symbol.for("ModeloEvaluativoRepository"),
	ModeloEvaluativoService: Symbol.for("ModeloEvaluativoService"),
} as const;
