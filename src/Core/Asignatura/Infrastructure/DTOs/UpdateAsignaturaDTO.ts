import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignatura } from "../../Domain/IUpdateAsignatura";

const schema = z.object<ZodInferSchema<IUpdateAsignatura>>({
	codigo: z.string().optional(),
	nombre: z.string().optional(),
});

class UpdateAsignaturaDTOError extends BaseDTOError<IUpdateAsignatura> {
	constructor(error: z.ZodError<IUpdateAsignatura>) {
		super(error);
		this.name = "UpdateAsignaturaDTOError";
		this.message = "Error de validacion para actualizar la asignatura";
	}
}

export class UpdateAsignaturaDTO extends BaseValidatorDTO<
	IUpdateAsignatura,
	UpdateAsignaturaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaDTOError, input);
	}
}
