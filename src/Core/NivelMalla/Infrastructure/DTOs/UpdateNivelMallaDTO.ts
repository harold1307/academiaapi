import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateNivelMalla } from "../../Domain/IUpdateNivelMalla";

const schema = z.object<ZodInferSchema<IUpdateNivelMalla>>({
	tituloObtenidoId: z.string().uuid().nullable(),
});

class UpdateNivelMallaDTOError extends BaseDTOError<IUpdateNivelMalla> {
	constructor(error: z.ZodError<IUpdateNivelMalla>) {
		super(error);
		this.name = "UpdateNivelMallaDTOError";
		this.message = "Error de validacion para actualizar el nivel de la malla";
	}
}

export class UpdateNivelMallaDTO extends BaseValidatorDTO<
	IUpdateNivelMalla,
	UpdateNivelMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateNivelMallaDTOError, input);
	}
}
