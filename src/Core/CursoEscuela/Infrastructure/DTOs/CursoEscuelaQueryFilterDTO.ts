import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICursoEscuelaQueryFilter } from "../../Domain/ICursoEscuelaQueryFilter";

const schema = z
	.object<ZodInferSchema<ICursoEscuelaQueryFilter>>({
		id: z.string().optional(),
		nombre: z.string().optional(),
		codigo: z.string().optional(),
		paraleloId: z.string().optional(),
		sesionId: z.string().optional(),
		tema: z.string().optional(),
		observaciones: z.string().optional(),
		departamento: z.string().optional(),
		fechaInicio: z.date().optional(),
		fechaFin: z.date().optional(),
		fechaLimiteRegistro: z.date().optional(),
		diasLimitePago: z.number().optional(),
		cupos: z.number().optional(),
		evaluaProfesor: z.boolean().optional(),
		matriculaConDeuda: z.boolean().optional(),
		legalizarMatriculas: z.boolean().optional(),
		registroExterno: z.boolean().optional(),
		registroInterno: z.boolean().optional(),
		verificaSesion: z.boolean().optional(),
		registroDesdeOtraSede: z.boolean().optional(),
		edadMinima: z.number().optional(),
		edadMaxima: z.number().optional(),
		costoPorMateria: z.boolean().optional(),
		cumpleRequisitosMalla: z.boolean().optional(),
		pasarRecord: z.boolean().optional(),
		plantillaId: z.string().optional(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		estado: z.boolean().optional(),
		periodoId: z.string().optional(),
	})
	.optional();

class CursoEscuelaQueryFilterDTOError extends BaseDTOError<ICursoEscuelaQueryFilter> {
	constructor(error: z.ZodError<ICursoEscuelaQueryFilter>) {
		super(error);
		this.name = "CursoEscuelaQueryFilterDTOError";
		this.message = "Filtros de nivel academico invalidos";
	}
}

export class CursoEscuelaQueryFilterDTO extends BaseValidatorDTO<
	ICursoEscuelaQueryFilter,
	CursoEscuelaQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, CursoEscuelaQueryFilterDTOError, input);
	}
}
