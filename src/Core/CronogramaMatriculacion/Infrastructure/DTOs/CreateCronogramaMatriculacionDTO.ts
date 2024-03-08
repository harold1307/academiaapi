import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCronogramaMatriculacion } from "../../Domain/ICreateCronogramaMatriculacion";

const schema = z.object<ZodInferSchema<ICreateCronogramaMatriculacion>>({
	fechaFin: z.date(),
	fechaInicio: z.date(),
	nivel: z.number().int().min(0).max(10).nullable(),

	modalidadId: z.string().uuid().nullable(),
	programaId: z.string().uuid(),
	sedeId: z.string().uuid(),
	periodoId: z.string().uuid(),
});

class CreateCronogramaMatriculacionDTOError extends BaseDTOError<ICreateCronogramaMatriculacion> {
	constructor(error: z.ZodError<ICreateCronogramaMatriculacion>) {
		super(error);
		this.name = "CreateCronogramaMatriculacionDTOError";
		this.message =
			"Error de validacion para crear el cronograma de matriculacion";
	}
}

export class CreateCronogramaMatriculacionDTO extends BaseValidatorDTO<
	ICreateCronogramaMatriculacion,
	CreateCronogramaMatriculacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCronogramaMatriculacionDTOError, input);
	}
}
