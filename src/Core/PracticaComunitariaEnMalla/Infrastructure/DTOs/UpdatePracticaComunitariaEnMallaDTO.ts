import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePracticaComunitariaEnMalla } from "../../Domain/IUpdatePracticaComunitariaEnMalla";

const schema = z.object<ZodInferSchema<IUpdatePracticaComunitariaEnMalla>>({
	requiereAutorizacion: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	creditos: z.number().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	horas: z.number().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	registroDesdeNivel: z.number().min(1).max(10).nullable().optional(),
	registroPracticasAdelantadas: z.boolean().optional(),
	registroMultiple: z.boolean().optional(),
	mallaCurricularId: z.string().uuid(),
});

class UpdatePracticaComunitariaEnMallaDTOError extends BaseDTOError<IUpdatePracticaComunitariaEnMalla> {
	constructor(error: z.ZodError<IUpdatePracticaComunitariaEnMalla>) {
		super(error);
		this.name = "UpdatePracticaComunitariaEnMallaDTOError";
		this.message =
			"Error de validacion para actualizar la practica comunitaria en la malla";
	}
}

export class UpdatePracticaComunitariaEnMallaDTO extends BaseValidatorDTO<
	IUpdatePracticaComunitariaEnMalla,
	UpdatePracticaComunitariaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdatePracticaComunitariaEnMallaDTOError, input);
	}
}
