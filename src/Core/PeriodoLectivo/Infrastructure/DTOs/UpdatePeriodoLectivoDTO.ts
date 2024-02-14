import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePeriodoLectivo } from "../../Domain/IUpdatePeriodoLectivo";

const schema = z.object<ZodInferSchema<IUpdatePeriodoLectivo>>({
	nombre: z.string().min(1).optional(),
	inicio: z.date().optional(),
	fin: z.date().optional(),
	tipo: z.enum(["GRADO", "POSGRADO"] as const).optional(),
	abierto: z.boolean().optional(),
	estado: z.boolean().optional(),
	matriculas: z.boolean().optional(),

	limiteMatriculaExtraordinaria: z.date().nullable().optional(),
	limiteMatriculaOrdinaria: z.date().nullable().optional(),
	limiteMatriculaEspecial: z.date().nullable().optional(),
	automatriculaAlumnosFechaExtraordinaria: z.boolean().nullable().optional(),

	estudianteSeleccionaParaleloAutomatricula: z.boolean().nullable().optional(),
	seImpartioNivelacion: z.boolean().optional(),
	planificacionCargaHoraria: z.boolean().optional(),

	planificacionProfesoresFormaTotal: z.boolean().nullable().optional(),
	aprobacionPlanificacionProfesores: z.boolean().nullable().optional(),

	legalizacionAutomaticaContraPagos: z.boolean().nullable().optional(),
	numeroSecuencia: z.number().nullable().optional(),
	corteId: z.string().uuid().nullable().optional(),

	cronogramaNotasCoordinacion: z.boolean().optional(),
	puedenAutomatricularseSegundasOMasMatriculas: z.boolean().optional(),
	puedenMatricularseArrastre: z.boolean().optional(),

	numeroMatriculaAutomatico: z.boolean().nullable().optional(),
	numeroMatricularAlLegalizar: z.boolean().nullable().optional(),

	actividadesDocencia: z.boolean().optional(),
	actividadesInvestigacion: z.boolean().optional(),
	actividadesGestion: z.boolean().optional(),
	actividadesPracticasComunitarias: z.boolean().optional(),
	actividadesPracticasPreprofesionales: z.boolean().optional(),
	otrasActividades: z.boolean().optional(),
});

class UpdatePeriodoLectivoDTOError extends BaseDTOError<IUpdatePeriodoLectivo> {
	constructor(error: z.ZodError<IUpdatePeriodoLectivo>) {
		super(error);
		this.name = "UpdatePeriodoLectivoDTOError";
		this.message = "Error de validacion para actualizar el periodo lectivo";
	}
}

export class UpdatePeriodoLectivoDTO extends BaseValidatorDTO<
	IUpdatePeriodoLectivo,
	UpdatePeriodoLectivoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdatePeriodoLectivoDTOError, input);
	}
}
