import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateModalidad } from "../../Domain/IUpdateModalidad";

const schema = z.object<ZodInferSchema<IUpdateModalidad>>({
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	alias: z.string().nullable().optional(),
	nombre: z.string().optional(),
});

class UpdateModalidadDTOError extends BaseDTOError<IUpdateModalidad> {
	constructor(error: z.ZodError<IUpdateModalidad>) {
		super(error);
		this.name = "UpdateModalidadDTOError";
		this.message = "Error de validacion para actualizar la modalidad";
	}
}

export class UpdateModalidadDTO extends BaseValidatorDTO<
	IUpdateModalidad,
	UpdateModalidadDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateModalidadDTOError, input);
	}
}
