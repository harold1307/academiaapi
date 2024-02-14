import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCorte } from "../../Domain/IUpdateCorte";

const schema = z.object<ZodInferSchema<IUpdateCorte>>({
	nombre: z.string().optional(),
});

class UpdateCorteDTOError extends BaseDTOError<IUpdateCorte> {
	constructor(error: z.ZodError<IUpdateCorte>) {
		super(error);
		this.name = "UpdateCorteDTOError";
		this.message = "Error de validacion para actualizar el Corte";
	}
}

export class UpdateCorteDTO extends BaseValidatorDTO<
	IUpdateCorte,
	UpdateCorteDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCorteDTOError, input);
	}
}
