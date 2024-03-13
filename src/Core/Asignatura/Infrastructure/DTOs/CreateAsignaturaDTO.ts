import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";

const schema = z.object<ZodInferSchema<ICreateAsignatura>>({
	nombre: z.string().toUpperCase(),
	codigo: z.string().toUpperCase().nullable(),
});

class CreateAsignaturaDTOError extends BaseDTOError<ICreateAsignatura> {
	constructor(error: z.ZodError<ICreateAsignatura>) {
		super(error);
		this.name = "CreateAsignaturaDTOError";
		this.message = "Error de validacion para crear la asignatura";
	}
}

export class CreateAsignaturaDTO extends BaseValidatorDTO<
	ICreateAsignatura,
	CreateAsignaturaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaDTOError, input);
	}
}
