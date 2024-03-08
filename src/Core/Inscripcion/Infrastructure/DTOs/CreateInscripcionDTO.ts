import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateInscripcion } from "../../Domain/ICreateInscripcion";

const schema = z.object<ZodInferSchema<ICreateInscripcion>>({
	nivelAcademicoId: z.string().uuid(),
	alumnoId: z.string().uuid(),
});

class CreateInscripcionDTOError extends BaseDTOError<ICreateInscripcion> {
	constructor(error: z.ZodError<ICreateInscripcion>) {
		super(error);
		this.name = "CreateInscripcionDTOError";
		this.message = "Error de validacion para crear la inscripcion";
	}
}

export class CreateInscripcionDTO extends BaseValidatorDTO<
	ICreateInscripcion,
	CreateInscripcionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateInscripcionDTOError, input);
	}
}
