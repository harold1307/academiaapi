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
} as const;
