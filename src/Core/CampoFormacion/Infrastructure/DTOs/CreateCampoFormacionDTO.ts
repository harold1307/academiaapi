import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCampoFormacion } from "../../Domain/ICreateCampoFormacion";

const schema = z.object<ZodInferSchema<ICreateCampoFormacion>>({
	nombre: z.string(),
});

class CreateCampoFormacionDTOError extends BaseDTOError<ICreateCampoFormacion> {
	constructor(error: z.ZodError<ICreateCampoFormacion>) {
		super(error);
		this.name = "CreateCampoFormacionDTOError";
		this.message = "Error de validacion para crear el campo de formacion";
	}
}

export class CreateCampoFormacionDTO extends BaseValidatorDTO<
	ICreateCampoFormacion,
	CreateCampoFormacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCampoFormacionDTOError, input);
	}
}
