import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAreaConocimiento } from "../../Domain/IUpdateAreaConocimiento";

const schema = z.object<ZodInferSchema<IUpdateAreaConocimiento>>({
	// @ts-expect-error not well implemented ZodInferSchema for nullable and optional
	codigo: z.string().nullable().optional(),
	nombre: z.string().optional(),
});

class UpdateAreaConocimientoDTOError extends BaseDTOError<IUpdateAreaConocimiento> {
	constructor(error: z.ZodError<IUpdateAreaConocimiento>) {
		super(error);
		this.name = "UpdateAreaConocimientoDTOError";
		this.message = "Error de validacion para actualizar la area conocimiento";
	}
}

export class UpdateAreaConocimientoDTO extends BaseValidatorDTO<
	IUpdateAreaConocimiento,
	UpdateAreaConocimientoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAreaConocimientoDTOError, input);
	}
}
