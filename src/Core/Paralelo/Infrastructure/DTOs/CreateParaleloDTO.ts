import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateParalelo } from "../../Domain/ICreateParalelo";

const schema = z.object<ZodInferSchema<ICreateParalelo>>({
	nombre: z.string(),
	orden: z.number().int(),
});

class CreateParaleloDTOError extends BaseDTOError<ICreateParalelo> {
	constructor(error: z.ZodError<ICreateParalelo>) {
		super(error);
		this.name = "CreateParaleloDTOError";
		this.message = "Error de validacion para crear el paralelo";
	}
}

export class CreateParaleloDTO extends BaseValidatorDTO<
	ICreateParalelo,
	CreateParaleloDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateParaleloDTOError, input);
	}
}
