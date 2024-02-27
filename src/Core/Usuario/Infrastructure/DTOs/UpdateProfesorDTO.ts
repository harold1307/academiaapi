import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateProfesor } from "../../Domain/IUpdateProfesor";

const schema = z.object<ZodInferSchema<IUpdateProfesor>>({
	estado: z.boolean().optional(),
	tiempoDedicacion: z
		.enum(["TIEMPO_COMPLETO", "TIEMPO_PARCIAL", "MEDIO_TIEMPO"] as const)
		.optional(),
	categoria: z
		.enum([
			"HONORARIO",
			"INVITADO",
			"OCASIONAL",
			"TITULAR_AGREGADO",
			"TITULAR_AUXILIAR",
			"TITULAR_PRINCIPAL",
		] as const)
		.optional(),

	coordinacionId: z.string().uuid().optional(),
	programaId: z.string().uuid().nullable().optional(),
});

class UpdateProfesorDTOError extends BaseDTOError<IUpdateProfesor> {
	constructor(error: z.ZodError<IUpdateProfesor>) {
		super(error);
		this.name = "UpdateProfesorDTOError";
		this.message = "Error de validacion para actualizar el usuario profesor";
	}
}

export class UpdateProfesorDTO extends BaseValidatorDTO<
	IUpdateProfesor,
	UpdateProfesorDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateProfesorDTOError, input);
	}
}
