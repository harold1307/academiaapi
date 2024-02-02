import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateEjeFormativo } from "../../Domain/ICreateEjeFormativo";

const schema = z.object<ZodInferSchema<ICreateEjeFormativo>>({
	nombre: z.string(),
});

class CreateEjeFormativoDTOError extends BaseDTOError<ICreateEjeFormativo> {
	constructor(error: z.ZodError<ICreateEjeFormativo>) {
		super(error);
		this.name = "CreateEjeFormativoDTOError";
		this.message = "Error de validacion para crear el eje formativo";
	}
}

export class CreateEjeFormativoDTO extends BaseValidatorDTO<
	ICreateEjeFormativo,
	CreateEjeFormativoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateEjeFormativoDTOError, input);
	}
}
