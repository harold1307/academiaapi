import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCampoFormacion } from "../../Domain/IUpdateCampoFormacion";

const schema = z.object<ZodInferSchema<IUpdateCampoFormacion>>({
	nombre: z.string().optional(),
});

class UpdateCampoFormacionDTOError extends BaseDTOError<IUpdateCampoFormacion> {
	constructor(error: z.ZodError<IUpdateCampoFormacion>) {
		super(error);
		this.name = "UpdateCampoFormacionDTOError";
		this.message = "Error de validacion para actualizar el campo de formacion";
	}
}

export class UpdateCampoFormacionDTO extends BaseValidatorDTO<
	IUpdateCampoFormacion,
	UpdateCampoFormacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCampoFormacionDTOError, input);
	}
}
