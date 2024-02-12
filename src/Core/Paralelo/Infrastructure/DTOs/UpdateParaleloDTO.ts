import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateParalelo } from "../../Domain/IUpdateParalelo";

const schema = z.object<ZodInferSchema<IUpdateParalelo>>({
	nombre: z.string().optional(),
	orden: z.number().int().optional(),
});

class UpdateParaleloDTOError extends BaseDTOError<IUpdateParalelo> {
	constructor(error: z.ZodError<IUpdateParalelo>) {
		super(error);
		this.name = "UpdateParaleloDTOError";
		this.message = "Error de validacion para actualizar el paralelo";
	}
}

export class UpdateParaleloDTO extends BaseValidatorDTO<
	IUpdateParalelo,
	UpdateParaleloDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateParaleloDTOError, input);
	}
}
