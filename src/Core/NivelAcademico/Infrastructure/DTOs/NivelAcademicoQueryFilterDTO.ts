import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { INivelAcademicoQueryFilter } from "../../Domain/INivelAcademicoQueryFilter";

const schema = z
	.object<ZodInferSchema<INivelAcademicoQueryFilter>>({
		nombre: z.string().nullable().optional(),
		fechaInicio: z.date().optional(),
		fechaFin: z.date().optional(),
		inicioAgregaciones: z.date().optional(),
		limiteAgregaciones: z.date().optional(),
		validaRequisitosMalla: z.boolean().optional(),
		validaCumplimientoMaterias: z.boolean().optional(),
		horasMinimasPracticasComunitarias: z.number().nullable().optional(),
		horasMinimasPracticasPreprofesionales: z.number().nullable().optional(),
		estudiantesPuedenSeleccionarMaterias: z.boolean().optional(),
		estudiantesPuedenSeleccionarMateriasOtrosHorarios: z.boolean().optional(),
		estudiantesPuedenSeleccionarMateriasOtrasModalidades: z
			.boolean()
			.optional(),
		estudiantesRegistranProyectosIntegradores: z.boolean().optional(),
		redireccionAPagos: z.boolean().optional(),
		limiteOrdinaria: z.date().optional(),
		limiteExtraordinaria: z.date().optional(),
		limiteEspecial: z.date().optional(),
		diasVencimientoMatricula: z.number().optional(),
		capacidad: z.number().int().min(0).optional(),
		mensaje: z.string().nullable().optional(),
		terminosCondiciones: z.string().nullable().optional(),

		paraleloId: z.string().optional(),
		modeloEvaluativoId: z.string().uuid().optional(),
		sesionId: z.string().uuid().optional(),
		nivelMallaId: z.string().uuid().optional(),
		mallaId: z.string().uuid().optional(),
		periodoId: z.string().uuid().optional(),

		estado: z.boolean().optional(),
		profesores: z.boolean().optional(),
		horarios: z.boolean().optional(),
		cuposMaterias: z.boolean().optional(),
		planificacionProfesores: z.boolean().optional(),
		matriculacion: z.boolean().optional(),
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
