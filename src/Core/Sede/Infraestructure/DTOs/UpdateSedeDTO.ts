import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { IUpdateSede } from "../../Domain/IUpdateSede";

const schema: z.ZodType<IUpdateSede> = z.object({
	nombre: z.string().optional(),
	pais: z.string().optional(),
	provincia: z.string().optional(),
	canton: z.string().optional(),
	codigo: z.string().optional(),
});

class UpdateSedeDTOError extends BaseDTOError<IUpdateSede> {
	constructor(error: z.ZodError<IUpdateSede>) {
		super(error);
		this.name = "UpdateSedeDTOError";
		this.message = "Error de validacion para actualizar la sede";
	}
}

export class UpdateSedeDTO extends BaseValidatorDTO<
	IUpdateSede,
	UpdateSedeDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateSedeDTOError, input);
	}
}
