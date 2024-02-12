import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateSesion } from "../../Domain/IUpdateSesion";

const schema = z.object<ZodInferSchema<IUpdateSesion>>({
	nombre: z.string().optional(),
	sedeId: z.string().uuid().optional(),
	alias: z.string().optional(),
	lunes: z.boolean().optional(),
	martes: z.boolean().optional(),
	miercoles: z.boolean().optional(),
	jueves: z.boolean().optional(),
	viernes: z.boolean().optional(),
	sabado: z.boolean().optional(),
	domingo: z.boolean().optional(),
});

class UpdateSesionDTOError extends BaseDTOError<IUpdateSesion> {
	constructor(error: z.ZodError<IUpdateSesion>) {
		super(error);
		this.name = "UpdateSesionDTOError";
		this.message = "Error de validacion para actualizar la sesion";
	}
}

export class UpdateSesionDTO extends BaseValidatorDTO<
	IUpdateSesion,
	UpdateSesionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateSesionDTOError, input);
	}
}
