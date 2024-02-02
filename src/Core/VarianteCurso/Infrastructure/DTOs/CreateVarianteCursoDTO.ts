import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateVarianteCurso } from "../../Domain/ICreateVarianteCurso";

const schema = z
	.object<ZodInferSchema<ICreateVarianteCurso>>({
		nombre: z.string(),
		codigoBase: z.string(),
		descripcion: z.string(),
		registroExterno: z.boolean(),
		registroInterno: z.boolean(),
		verificarSesion: z.boolean(),
		edadMinima: z.number().nullable(),
		edadMaxima: z.number().nullable(),
		fechaAprobacion: z.date(),
		registroDesdeOtraSede: z.boolean(),
		costoPorMateria: z.boolean(),
		cumpleRequisitosMalla: z.boolean(),
		pasarRecord: z.boolean(),
		aprobarCursoPrevio: z.boolean(),
	})
	.superRefine(({ edadMaxima, edadMinima }, ctx) => {
		if (
			(edadMaxima !== null && edadMinima === null) ||
			(edadMaxima === null && edadMinima !== null)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Edad maxima y edad minima deben ser ambos null o numeros",
			});

			return;
		}

		if (edadMaxima !== null && edadMinima !== null && edadMaxima < edadMinima) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Si verificar edad, la edad maxima debe ser mayor.",
			});
		}
	});

class CreateVarianteCursoError extends BaseDTOError<ICreateVarianteCurso> {
	constructor(error: z.ZodError<ICreateVarianteCurso>) {
		super(error);
		this.name = "CreateVarianteCursoError";
		this.message = "Error de validacion para crear la variante de curso";
	}
}

export class CreateVarianteCursoDTO extends BaseValidatorDTO<
	ICreateVarianteCurso,
	CreateVarianteCursoError
> {
	constructor(input: unknown) {
		super(schema, CreateVarianteCursoError, input);
	}
}
