import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateSede } from "../../Domain/ICreateSede";

const schema = z.object<ZodInferSchema<ICreateSede>>({
	nombre: z.string().toUpperCase(),
	pais: z.string().toUpperCase(),
	provincia: z.string().toUpperCase(),
	canton: z.string().toUpperCase(),
	alias: z.string().toUpperCase(),
});

class CreateSedeDTOError extends BaseDTOError<ICreateSede> {
	constructor(error: z.ZodError<ICreateSede>) {
		super(error);
		this.name = "CreateSedeDTOError";
		this.message = "Error de validacion para crear la sede";
	}
}

export class CreateSedeDTO extends BaseValidatorDTO<
	ICreateSede,
	CreateSedeDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateSedeDTOError, input);
	}
}
