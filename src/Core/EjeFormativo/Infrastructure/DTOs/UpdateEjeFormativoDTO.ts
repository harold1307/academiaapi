import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateEjeFormativo } from "../../Domain/IUpdateEjeFormativo";

const schema = z.object<ZodInferSchema<IUpdateEjeFormativo>>({
	nombre: z.string().optional(),
});

class UpdateEjeFormativoDTOError extends BaseDTOError<IUpdateEjeFormativo> {
	constructor(error: z.ZodError<IUpdateEjeFormativo>) {
		super(error);
		this.name = "UpdateEjeFormativoDTOError";
		this.message = "Error de validacion para actualizar el eje formativo";
	}
}

export class UpdateEjeFormativoDTO extends BaseValidatorDTO<
	IUpdateEjeFormativo,
	UpdateEjeFormativoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateEjeFormativoDTOError, input);
	}
}
