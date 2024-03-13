import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCorte } from "../../Domain/ICreateCorte";

const schema = z.object<ZodInferSchema<ICreateCorte>>({
	nombre: z.string().toUpperCase(),
});

class CreateCorteDTOError extends BaseDTOError<ICreateCorte> {
	constructor(error: z.ZodError<ICreateCorte>) {
		super(error);
		this.name = "CreateCorteDTOError";
		this.message = "Error de validacion para crear el corte";
	}
}

export class CreateCorteDTO extends BaseValidatorDTO<
	ICreateCorte,
	CreateCorteDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCorteDTOError, input);
	}
}
