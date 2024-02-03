import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../Domain/ICreatePracticaPreProfesionalEnMalla";

export const createPracticaPreProfesionalEnMallaSchema = z
	.object<ZodInferSchema<ICreatePracticaPreProfesionalEnMalla>>({
		requiereAutorizacion: z.boolean(),
		creditos: z.number().nullable(),
		horas: z.number().nullable(),
		registroDesdeNivel: z.number().min(1).max(10).nullable(),
		mallaCurricularId: z.string().uuid(),
		registroPracticasAdelantadas: z.boolean(),
	})
	.superRefine(({ horas, creditos, registroDesdeNivel }, ctx) => {
		if (horas !== null && creditos !== null && registroDesdeNivel !== null) {
			return;
		}

		if (horas === null && creditos === null && registroDesdeNivel === null) {
			return;
		}

		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				"Si se realizan practicas pre profesionales y no estan ligadas a las materias, se deben especificar las horas, creditos y desde que nivel sera el registro",
			path: ["horas", "creditos", "registroDesdeNivel"],
		});
	});

class CreatePracticaPreProfesionalEnMallaDTOError extends BaseDTOError<ICreatePracticaPreProfesionalEnMalla> {
	constructor(error: z.ZodError<ICreatePracticaPreProfesionalEnMalla>) {
		super(error);
		this.name = "CreatePracticaPreProfesionalEnMallaDTOError";
		this.message =
			"Error de validacion para crear la practica pre profesional en la malla";
	}
}

export class CreatePracticaPreProfesionalEnMallaDTO extends BaseValidatorDTO<
	ICreatePracticaPreProfesionalEnMalla,
	CreatePracticaPreProfesionalEnMallaDTOError
> {
	constructor(input: unknown) {
		super(
			createPracticaPreProfesionalEnMallaSchema,
			CreatePracticaPreProfesionalEnMallaDTOError,
			input,
		);
	}
}
