import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateTurno } from "../../Domain/IUpdateTurno";

const schema = z.object<ZodInferSchema<IUpdateTurno>>({
	horas: z.number().int().optional(),
	comienza: z.date().optional(),
	termina: z.date().optional(),
	estado: z.boolean().optional(),
});

class UpdateTurnoDTOError extends BaseDTOError<IUpdateTurno> {
	constructor(error: z.ZodError<IUpdateTurno>) {
		super(error);
		this.name = "UpdateTurnoDTOError";
		this.message = "Error de validacion para actualizar el turno";
	}
}

export class UpdateTurnoDTO extends BaseValidatorDTO<
	IUpdateTurno,
	UpdateTurnoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateTurnoDTOError, input);
	}
}
