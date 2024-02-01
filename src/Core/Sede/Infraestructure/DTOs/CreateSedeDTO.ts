import { z } from "zod";

import type { ICreateSede } from "../../Domain/ICreateSede";
import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";

const schema: z.ZodType<ICreateSede> = z.object({
	nombre: z.string(),
	pais: z.string(),
	provincia: z.string(),
	canton: z.string(),
	codigo: z.string(),
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
