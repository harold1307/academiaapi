import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateLugarEjecucion } from "../../Domain/ICreateLugarEjecucion";
import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";

const schema = z.object<ZodInferSchema<ICreateLugarEjecucion>>({
	mallaId: z.string(),
	codigo: z.string().nullable(),
	sedeId: z.string().uuid(),
});

class CreateLugarEjecucionDTOError extends BaseDTOError<ICreateLugarEjecucion> {
	constructor(error: z.ZodError<ICreateLugarEjecucion>) {
		super(error);
		this.name = "CreateLugarEjecucionDTOError";
		this.message = "Error de validacion para crear el lugar de ejecucion";
	}
}

export class CreateLugarEjecucionDTO extends BaseValidatorDTO<
	ICreateLugarEjecucion,
	CreateLugarEjecucionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateLugarEjecucionDTOError, input);
	}
}
