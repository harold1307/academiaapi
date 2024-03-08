import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateInscripcion } from "../../Domain/IUpdateInscripcion";

const schema = z.object<ZodInferSchema<IUpdateInscripcion>>({
	matricula: z.boolean().optional(),
	matricularseConLimite: z.boolean().optional(),
	nivelAcademicoId: z.string().uuid().optional(),
});

class UpdateInscripcionDTOError extends BaseDTOError<IUpdateInscripcion> {
	constructor(error: z.ZodError<IUpdateInscripcion>) {
		super(error);
		this.name = "UpdateInscripcionDTOError";
		this.message = "Error de validacion para actualizar la inscripcion";
	}
}

export class UpdateInscripcionDTO extends BaseValidatorDTO<
	IUpdateInscripcion,
	UpdateInscripcionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateInscripcionDTOError, input);
	}
}
