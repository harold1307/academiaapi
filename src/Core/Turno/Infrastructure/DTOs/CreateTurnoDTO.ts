import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateTurno } from "../../Domain/ICreateTurno";

const schema = z.object<ZodInferSchema<ICreateTurno>>({
	horas: z.number(),
	comienza: z.date(),
	termina: z.date(),
	sesionId: z.string().uuid(),
});

class CreateTurnoDTOError extends BaseDTOError<ICreateTurno> {
	constructor(error: z.ZodError<ICreateTurno>) {
		super(error);
		this.name = "CreateTurnoDTOError";
		this.message = "Error de validacion para crear el turno";
	}
}

export class CreateTurnoDTO extends BaseValidatorDTO<
	ICreateTurno,
	CreateTurnoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateTurnoDTOError, input);
	}
}
