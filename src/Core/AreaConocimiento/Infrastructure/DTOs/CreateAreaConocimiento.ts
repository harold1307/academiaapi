import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAreaConocimiento } from "../../Domain/ICreateAreaConocimiento";

const schema = z.object<ZodInferSchema<ICreateAreaConocimiento>>({
	codigo: z.string().nullable(),
	nombre: z.string(),
});

class CreateAreaConocimientoDTOError extends BaseDTOError<ICreateAreaConocimiento> {
	constructor(error: z.ZodError<ICreateAreaConocimiento>) {
		super(error);
		this.name = "CreateAreaConocimientoDTOError";
		this.message = "Error de validacion para crear la area conocimiento";
	}
}

export class CreateAreaConocimientoDTO extends BaseValidatorDTO<
	ICreateAreaConocimiento,
	CreateAreaConocimientoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAreaConocimientoDTOError, input);
	}
}
