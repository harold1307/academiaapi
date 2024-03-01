import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCronogramaMatriculacion } from "../../Domain/IUpdateCronogramaMatriculacion";

const schema = z.object<ZodInferSchema<IUpdateCronogramaMatriculacion>>({
	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
	nivel: z.number().int().min(0).max(10).nullable().optional(),

	modalidadId: z.string().uuid().nullable().optional(),
	sedeId: z.string().uuid().optional(),
	programaId: z.string().uuid().optional(),
});

class UpdateCronogramaMatriculacionDTOError extends BaseDTOError<IUpdateCronogramaMatriculacion> {
	constructor(error: z.ZodError<IUpdateCronogramaMatriculacion>) {
		super(error);
		this.name = "UpdateCronogramaMatriculacionDTOError";
		this.message =
			"Error de validacion para actualizar el cronograma de matriculacion";
	}
}

export class UpdateCronogramaMatriculacionDTO extends BaseValidatorDTO<
	IUpdateCronogramaMatriculacion,
	UpdateCronogramaMatriculacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCronogramaMatriculacionDTOError, input);
	}
}
