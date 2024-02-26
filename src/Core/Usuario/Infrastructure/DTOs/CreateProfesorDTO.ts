import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateProfesor } from "../../Domain/ICreateProfesor";

const schema = z.object<ZodInferSchema<ICreateProfesor>>({
	tiempoDedicacion: z.enum([
		"TIEMPO_COMPLETO",
		"TIEMPO_PARCIAL",
		"MEDIO_TIEMPO",
	] as const),
	categoria: z.enum([
		"HONORARIO",
		"INVITADO",
		"OCASIONAL",
		"TITULAR_AGREGADO",
		"TITULAR_AUXILIAR",
		"TITULAR_PRINCIPAL",
	] as const),

	coordinacionId: z.string().uuid(),
	programaId: z.string().uuid().nullable(),
});

class CreateProfesorDTOError extends BaseDTOError<ICreateProfesor> {
	constructor(error: z.ZodError<ICreateProfesor>) {
		super(error);
		this.name = "CreateProfesorDTOError";
		this.message = "Error de validacion para crear el usuario profesor";
	}
}

export class CreateProfesorDTO extends BaseValidatorDTO<
	ICreateProfesor,
	CreateProfesorDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateProfesorDTOError, input);
	}
}
