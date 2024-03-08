import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { INivelAcademicoQueryFilter } from "../../Domain/INivelAcademicoQueryFilter";

const schema = z
	.object<ZodInferSchema<INivelAcademicoQueryFilter>>({
		nombre: z.string().optional(),
		fechaInicio: z.date().optional(),
		fechaFin: z.date().optional(),
		inicioAgregaciones: z.date().optional(),
		limiteAgregaciones: z.date().optional(),
		validaRequisitosMalla: z.boolean({ coerce: true }).optional(),
		validaCumplimientoMaterias: z.boolean({ coerce: true }).optional(),
		horasMinimasPracticasComunitarias: z.number({ coerce: true }).optional(),
		horasMinimasPracticasPreprofesionales: z
			.number({ coerce: true })
			.optional(),
		estudiantesPuedenSeleccionarMaterias: z
			.boolean({ coerce: true })
			.optional(),
		estudiantesPuedenSeleccionarMateriasOtrosHorarios: z
			.boolean({ coerce: true })
			.optional(),
		estudiantesPuedenSeleccionarMateriasOtrasModalidades: z
			.boolean({ coerce: true })
			.optional(),
		estudiantesRegistranProyectosIntegradores: z
			.boolean({ coerce: true })
			.optional(),
		redireccionAPagos: z.boolean({ coerce: true }).optional(),
		limiteOrdinaria: z.date().optional(),
		limiteExtraordinaria: z.date().optional(),
		limiteEspecial: z.date().optional(),
		diasVencimientoMatricula: z.number({ coerce: true }).optional(),
		capacidad: z.number({ coerce: true }).int().min(0).optional(),
		mensaje: z.string().optional(),
		terminosCondiciones: z.string().optional(),

		paraleloId: z.string().optional(),
		modeloEvaluativoId: z.string().uuid().optional(),
		sesionId: z.string().uuid().optional(),
		nivelMallaId: z.string().uuid().optional(),
		mallaId: z.string().uuid().optional(),
		periodoId: z.string().uuid().optional(),

		estado: z.boolean({ coerce: true }).optional(),
		profesores: z.boolean({ coerce: true }).optional(),
		horarios: z.boolean({ coerce: true }).optional(),
		cuposMaterias: z.boolean({ coerce: true }).optional(),
		planificacionProfesores: z.boolean({ coerce: true }).optional(),
		matriculacion: z.boolean({ coerce: true }).optional(),
	})
	.optional();

class NivelAcademicoQueryFilterDTOError extends BaseDTOError<INivelAcademicoQueryFilter> {
	constructor(error: z.ZodError<INivelAcademicoQueryFilter>) {
		super(error);
		this.name = "NivelAcademicoQueryFilterDTOError";
		this.message = "Filtros de nivel academico invalidos";
	}
}

export class NivelAcademicoQueryFilterDTO extends BaseValidatorDTO<
	INivelAcademicoQueryFilter,
	NivelAcademicoQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, NivelAcademicoQueryFilterDTOError, input);
	}
}
