import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePracticaPreProfesionalEnMalla } from "../../Domain/IUpdatePracticaPreProfesionalEnMalla";

const schema = z.object<ZodInferSchema<IUpdatePracticaPreProfesionalEnMalla>>({
	requiereAutorizacion: z.boolean().optional(),

	creditos: z.number().nullable().optional(),

	horas: z.number().nullable().optional(),

	registroDesdeNivel: z.number().min(1).max(10).nullable().optional(),
	registroPracticasAdelantadas: z.boolean().optional(),
	mallaCurricularId: z.string().uuid(),
});

class UpdatePracticaPreProfesionalEnMallaDTOError extends BaseDTOError<IUpdatePracticaPreProfesionalEnMalla> {
	constructor(error: z.ZodError<IUpdatePracticaPreProfesionalEnMalla>) {
		super(error);
		this.name = "UpdatePracticaPreProfesionalEnMallaDTOError";
		this.message =
			"Error de validacion para actualizar la practica pre profesional en la malla";
	}
}

export class UpdatePracticaPreProfesionalEnMallaDTO extends BaseValidatorDTO<
	IUpdatePracticaPreProfesionalEnMalla,
	UpdatePracticaPreProfesionalEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdatePracticaPreProfesionalEnMallaDTOError, input);
	}
}
