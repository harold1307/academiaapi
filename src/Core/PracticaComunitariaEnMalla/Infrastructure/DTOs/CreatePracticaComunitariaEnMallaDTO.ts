import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreatePracticaComunitariaEnMalla } from "../../Domain/ICreatePracticaComunitariaEnMalla";

const schema = z
	.object<ZodInferSchema<ICreatePracticaComunitariaEnMalla>>({
		requiereAutorizacion: z.boolean(),
		creditos: z.number().nullable(),
		horas: z.number().nullable(),
		registroDesdeNivelId: z.string().uuid().nullable(),
		mallaCurricularId: z.string().uuid(),
		registroPracticasAdelantadas: z.boolean(),
		registroMultiple: z.boolean(),
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
				"Si se realizan practicas comunitarias y no estan ligadas a las materias, se deben especificar las horas, creditos y desde que nivel sera el registro",
			path: ["horas", "creditos", "registroDesdeNivelId"],
		});
	});

class CreatePracticaComunitariaEnMallaDTOError extends BaseDTOError<ICreatePracticaComunitariaEnMalla> {
	constructor(error: z.ZodError<ICreatePracticaComunitariaEnMalla>) {
		super(error);
		this.name = "CreatePracticaComunitariaEnMallaDTOError";
		this.message =
			"Error de validacion para crear la practica comunitaria en la malla";
	}
}

export class CreatePracticaComunitariaEnMallaDTO extends BaseValidatorDTO<
	ICreatePracticaComunitariaEnMalla,
	CreatePracticaComunitariaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreatePracticaComunitariaEnMallaDTOError, input);
	}
}
