import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCentroInformacion } from "../../Domain/IUpdateCentroInformacion";

const schema = z.object<ZodInferSchema<IUpdateCentroInformacion>>({
	estado: z.boolean().optional(),
	nombre: z.string().min(1).toUpperCase().trim().optional(),
});

class UpdateCentroInformacionDTOError extends BaseDTOError<IUpdateCentroInformacion> {
	constructor(error: z.ZodError<IUpdateCentroInformacion>) {
		super(error);
		this.name = "UpdateCentroInformacionDTOError";
		this.message =
			"Error de validacion para actualizar el centro de informacion";
	}
}

export class UpdateCentroInformacionDTO extends BaseValidatorDTO<
	IUpdateCentroInformacion,
	UpdateCentroInformacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCentroInformacionDTOError, input);
	}
}
