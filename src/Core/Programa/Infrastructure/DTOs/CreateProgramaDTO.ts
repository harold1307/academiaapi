import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreatePrograma } from "../../Domain/ICreatePrograma";

const schema = z.object<ZodInferSchema<ICreatePrograma>>({
	nombre: z.string(),
	mencion: z.string().nullable(),
	alias: z.string(),
	detalleNivelTitulacionId: z.string().uuid(),
	coordinacionId: z.string().uuid(),
});

class CreateProgramaDTOError extends BaseDTOError<ICreatePrograma> {
	constructor(error: z.ZodError<ICreatePrograma>) {
		super(error);
		this.name = "CreateProgramaDTOError";
		this.message = "Error de validacion para actualizar el programa";
	}
}

export class CreateProgramaDTO extends BaseValidatorDTO<
	ICreatePrograma,
	CreateProgramaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateProgramaDTOError, input);
	}
}
