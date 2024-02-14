import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCalculoCosto } from "../../Domain/IUpdateCalculoCosto";

const schema = z.object<ZodInferSchema<IUpdateCalculoCosto>>({
	tipo: z
		.enum(["COSTO_POR_NIVEL_Y_MATERIAS", "COSTO_POR_PLAN_CUOTA"] as const)
		.optional(),
	costoPorSesion: z.boolean().nullable().optional(),
	cronogramaFechasOpcionPago: z.boolean().nullable().optional(),
	estudiantesEligenOpcionPago: z.boolean().nullable().optional(),
});

class UpdateCalculoCostoDTOError extends BaseDTOError<IUpdateCalculoCosto> {
	constructor(error: z.ZodError<IUpdateCalculoCosto>) {
		super(error);
		this.name = "UpdateCalculoCostoDTOError";
		this.message = "Error de validacion para actualizar el calculo de costo";
	}
}

export class UpdateCalculoCostoDTO extends BaseValidatorDTO<
	IUpdateCalculoCosto,
	UpdateCalculoCostoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCalculoCostoDTOError, input);
	}
}
