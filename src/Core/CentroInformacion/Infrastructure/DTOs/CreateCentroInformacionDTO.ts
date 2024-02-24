import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCentroInformacion } from "../../Domain/ICreateCentroInformacion";

const schema = z.object<ZodInferSchema<ICreateCentroInformacion>>({
	nombre: z.string().min(1).toUpperCase().trim(),
});

class CreateCentroInformacionDTOError extends BaseDTOError<ICreateCentroInformacion> {
	constructor(error: z.ZodError<ICreateCentroInformacion>) {
		super(error);
		this.name = "CreateCentroInformacionDTOError";
		this.message = "Error de validacion para crear el centro de informacion";
	}
}

export class CreateCentroInformacionDTO extends BaseValidatorDTO<
	ICreateCentroInformacion,
	CreateCentroInformacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCentroInformacionDTOError, input);
	}
}
