import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../Domain/ICreatePracticaPreProfesionalEnMalla";

const schema = z
	.object<ZodInferSchema<ICreatePracticaPreProfesionalEnMalla>>({
		requiereAutorizacion: z.boolean(),
		creditos: z.number().nullable(),
		horas: z.number().nullable(),
		registroDesdeNivelId: z.string().uuid().nullable(),
		mallaCurricularId: z.string().uuid(),
		registroPracticasAdelantadas: z.boolean(),
	})
	.superRefine(({ horas, creditos, registroDesdeNivelId }, ctx) => {
		if (horas !== null && creditos !== null && registroDesdeNivelId !== null) {
			return;
		}

		if (horas === null && creditos === null && registroDesdeNivelId === null) {
			return;
		}

		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				"Si se realizan practicas pre profesionales y no estan ligadas a las materias, se deben especificar las horas, creditos y desde que nivel sera el registro",
			path: ["horas", "creditos", "registroDesdeNivelId"],
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
		super(schema, CreatePracticaPreProfesionalEnMallaDTOError, input);
	}
}
