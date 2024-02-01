import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCoordinacion } from "../../Domain/ICreateCoordinacion";

const schema = z.object<ZodInferSchema<ICreateCoordinacion>>({
	alias: z.string(),
	nombre: z.string(),
	sedeId: z.string().uuid(),
});

class CreateCoordinacionDTOError extends BaseDTOError<ICreateCoordinacion> {
	constructor(error: z.ZodError<ICreateCoordinacion>) {
		super(error);
		this.name = "CreateCoordinacionDTOError";
		this.message = "Error de validacion para crear la coordinacion";
	}
}

export class CreateCoordinacionDTO extends BaseValidatorDTO<
	ICreateCoordinacion,
	CreateCoordinacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCoordinacionDTOError, input);
	}
}
