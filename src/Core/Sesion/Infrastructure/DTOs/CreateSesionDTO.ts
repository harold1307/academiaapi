import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateSesion } from "../../Domain/ICreateSesion";

const schema = z.object<ZodInferSchema<ICreateSesion>>({
	nombre: z.string(),
	sedeId: z.string().uuid(),
	alias: z.string(),
	lunes: z.boolean(),
	martes: z.boolean(),
	miercoles: z.boolean(),
	jueves: z.boolean(),
	viernes: z.boolean(),
	sabado: z.boolean(),
	domingo: z.boolean(),
});

class CreateSesionDTOError extends BaseDTOError<ICreateSesion> {
	constructor(error: z.ZodError<ICreateSesion>) {
		super(error);
		this.name = "CreateSesionDTOError";
		this.message = "Error de validacion para crear la sesion";
	}
}

export class CreateSesionDTO extends BaseValidatorDTO<
	ICreateSesion,
	CreateSesionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateSesionDTOError, input);
	}
}
