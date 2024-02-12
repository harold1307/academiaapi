import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCurso } from "../../Domain/ICreateCurso";

const schema = z.object<ZodInferSchema<ICreateCurso>>({
	nombre: z.string(),
});

class CreateCursoError extends BaseDTOError<ICreateCurso> {
	constructor(error: z.ZodError<ICreateCurso>) {
		super(error);
		this.name = "CreateCursoError";
		this.message = "Error de validacion para crear la plantilla de curso";
	}
}

export class CreateCursoDTO extends BaseValidatorDTO<
	ICreateCurso,
	CreateCursoError
> {
	constructor(input: unknown) {
		super(schema, CreateCursoError, input);
	}
}
