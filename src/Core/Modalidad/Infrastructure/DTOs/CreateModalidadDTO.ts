import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateModalidad } from "../../Domain/ICreateModalidad";

const schema = z.object<ZodInferSchema<ICreateModalidad>>({
	alias: z.string().toUpperCase().nullable(),
	nombre: z.string().toUpperCase(),
});

class CreateModalidadDTOError extends BaseDTOError<ICreateModalidad> {
	constructor(error: z.ZodError<ICreateModalidad>) {
		super(error);
		this.name = "CreateModalidadDTOError";
		this.message = "Error de validacion para crear la modalidad";
	}
}

export class CreateModalidadDTO extends BaseValidatorDTO<
	ICreateModalidad,
	CreateModalidadDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateModalidadDTOError, input);
	}
}
