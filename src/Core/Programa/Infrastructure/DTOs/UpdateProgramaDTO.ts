import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePrograma } from "../../Domain/IUpdatePrograma";

const schema = z.object<ZodInferSchema<IUpdatePrograma>>({
	alias: z.string().optional(),
	detalleNivelTitulacionId: z.string().uuid().optional(),
	estado: z.boolean().optional(),
});

class UpdateProgramaDTOError extends BaseDTOError<IUpdatePrograma> {
	constructor(error: z.ZodError<IUpdatePrograma>) {
		super(error);
		this.name = "UpdateProgramaDTOError";
		this.message = "Error de validacion para actualizar el programa";
	}
}

export class UpdateProgramaDTO extends BaseValidatorDTO<
	IUpdatePrograma,
	UpdateProgramaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateProgramaDTOError, input);
	}
}
