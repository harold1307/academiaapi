import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCoordinacion } from "../../Domain/IUpdateCoordinacion";

const schema = z.object<ZodInferSchema<IUpdateCoordinacion>>({
	alias: z.string().optional(),
	nombre: z.string().optional(),
});

class UpdateCoordinacionDTOError extends BaseDTOError<IUpdateCoordinacion> {
	constructor(error: z.ZodError<IUpdateCoordinacion>) {
		super(error);
		this.name = "UpdateCoordinacionDTOError";
		this.message = "Error de validacion para crear la coordinacion";
	}
}

export class UpdateCoordinacionDTO extends BaseValidatorDTO<
	IUpdateCoordinacion,
	UpdateCoordinacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCoordinacionDTOError, input);
	}
}
