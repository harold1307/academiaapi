export const TYPES = {
	PrismaClient: Symbol.for("PrismaClient"),
	SedeRepository: Symbol.for("SedeRepository"),
	SedeService: Symbol.for("SedeService"),
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
	CampoModeloEvaluativoRepository: Symbol.for(
		"CampoModeloEvaluativoRepository",
	),
	CampoModeloEvaluativoService: Symbol.for("CampoModeloEvaluativoService"),
	ModeloNivelacionRepository: Symbol.for("ModeloNivelacionRepository"),
	ModeloNivelacionService: Symbol.for("ModeloNivelacionService"),
	ProyectoIntegradorRepository: Symbol.for("ProyectoIntegradorRepository"),
	ProyectoIntegradorService: Symbol.for("ProyectoIntegradorService"),
	CampoProyectoIntegradorRepository: Symbol.for(
		"CampoProyectoIntegradorRepository",
	),
	CampoProyectoIntegradorService: Symbol.for("CampoProyectoIntegradorService"),
	NivelTitulacionRepository: Symbol.for("NivelTitulacionRepository"),
	NivelTitulacionService: Symbol.for("NivelTitulacionService"),
	DetalleNivelTitulacionRepository: Symbol.for(
		"DetalleNivelTitulacionRepository",
	),
	DetalleNivelTitulacionService: Symbol.for("DetalleNivelTitulacionService"),
	PerfilPracticaRepository: Symbol.for("PerfilPracticaRepository"),
	PerfilPracticaService: Symbol.for("PerfilPracticaService"),
	TipoDocumentoRepository: Symbol.for("TipoDocumentoRepository"),
	TipoDocumentoService: Symbol.for("TipoDocumentoService"),
	TituloObtenidoRepository: Symbol.for("TituloObtenidoRepository"),
	TituloObtenidoService: Symbol.for("TituloObtenidoService"),
	TipoDocumentoEnProgramaRepository: Symbol.for(
		"TipoDocumentoEnProgramaRepository",
	),
	TipoDocumentoEnProgramaService: Symbol.for("TipoDocumentoEnProgramaService"),
	ProgramaRepository: Symbol.for("ProgramaRepository"),
	ProgramaService: Symbol.for("ProgramaService"),
	CoordinacionRepository: Symbol.for("CoordinacionRepository"),
	CoordinacionService: Symbol.for("CoordinacionService"),
	NivelMallaRepository: Symbol.for("NivelMallaRepository"),
	NivelMallaService: Symbol.for("NivelMallaService"),
	AsignaturaEnNivelMallaRepository: Symbol.for(
		"AsignaturaEnNivelMallaRepository",
	),
	AsignaturaEnNivelMallaService: Symbol.for("AsignaturaEnNivelMallaService"),
	AsignaturaModuloEnMallaRepository: Symbol.for(
		"AsignaturaModuloEnMallaRepository",
	),
	AsignaturaModuloEnMallaService: Symbol.for("AsignaturaModuloEnMallaService"),
	PracticaPreProfesionalEnMallaRepository: Symbol.for(
		"PracticaPreProfesionalEnMallaRepository",
	),
	PracticaPreProfesionalEnMallaService: Symbol.for(
		"PracticaPreProfesionalEnMallaService",
	),
	PracticaComunitariaEnMallaRepository: Symbol.for(
		"PracticaComunitariaEnMallaRepository",
	),
	PracticaComunitariaEnMallaService: Symbol.for(
		"PracticaComunitariaEnMallaService",
	),
	NivelAcademicoRepository: Symbol.for("NivelAcademicoRepository"),
	NivelAcademicoService: Symbol.for("NivelAcademicoService"),
	MateriaEnNivelAcademicoRepository: Symbol.for(
		"MateriaEnNivelAcademicoRepository",
	),
	MateriaEnNivelAcademicoService: Symbol.for("MateriaEnNivelAcademicoService"),
	MateriaEnHorarioRepository: Symbol.for("MateriaEnHorarioRepository"),
	MateriaEnHorarioService: Symbol.for("MateriaEnHorarioService"),
	UbicacionRepository: Symbol.for("UbicacionRepository"),
	UbicacionService: Symbol.for("UbicacionService"),
	PeriodoLectivoRepository: Symbol.for("PeriodoLectivoRepository"),
	PeriodoLectivoService: Symbol.for("PeriodoLectivoService"),
	CorteRepository: Symbol.for("CorteRepository"),
	CorteService: Symbol.for("CorteService"),
	CalculoCostoRepository: Symbol.for("CalculoCostoRepository"),
	CalculoCostoService: Symbol.for("CalculoCostoService"),
	RequisitoMatriculacionRepository: Symbol.for(
		"RequisitoMatriculacionRepository",
	),
	RequisitoMatriculacionService: Symbol.for("RequisitoMatriculacionService"),
	SubPeriodoLectivoRepository: Symbol.for("SubPeriodoLectivoRepository"),
	SubPeriodoLectivoService: Symbol.for("SubPeriodoLectivoService"),
	CronogramaMatriculacionRepository: Symbol.for(
		"CronogramaMatriculacionRepository",
	),
	CronogramaMatriculacionService: Symbol.for("CronogramaMatriculacionService"),
	GrupoRepository: Symbol.for("GrupoRepository"),
	GrupoService: Symbol.for("GrupoService"),
	CentroInformacionRepository: Symbol.for("CentroInformacionRepository"),
	CentroInformacionService: Symbol.for("CentroInformacionService"),
	UsuarioRepository: Symbol.for("UsuarioRepository"),
	UsuarioService: Symbol.for("UsuarioService"),
} as const;
