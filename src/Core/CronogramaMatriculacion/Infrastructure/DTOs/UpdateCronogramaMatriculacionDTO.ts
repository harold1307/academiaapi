import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCronogramaMatriculacion } from "../../Domain/IUpdateCronogramaMatriculacion";

const schema = z.object<ZodInferSchema<IUpdateCronogramaMatriculacion>>({
	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
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
