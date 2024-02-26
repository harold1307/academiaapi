import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnVarianteCurso } from "../../Domain/ICreateAsignaturaEnVarianteCurso";

const schema = z
	.object<ZodInferSchema<ICreateAsignaturaEnVarianteCurso>>({
		validaCredito: z.boolean(),
		validaPromedio: z.boolean(),
		horasColaborativas: z.number(),
		horasAsistidasDocente: z.number(),
		horasAutonomas: z.number(),
		horasPracticas: z.number(),
		sumaHoras: z.boolean(),
		creditos: z.number(),
		requeridoAprobar: z.boolean(),
		asignaturaId: z.string(),
		varianteCursoId: z.string(),

		modeloEvaluativoId: z.string().nullable(),
		asistenciaAprobar: z.number().nullable(),
		cantidadDecimales: z.number().int().nullable(),
		notaMaxima: z.number().nullable(),
		notaMinima: z.number().nullable(),
	})
	.superRefine(
		(
			{
				asistenciaAprobar,
				modeloEvaluativoId,
				cantidadDecimales,
				notaMaxima,
				notaMinima,
			},
			ctx,
		) => {
			if (
				!modeloEvaluativoId &&
				asistenciaAprobar === null &&
				cantidadDecimales === null &&
				notaMaxima === null &&
				notaMinima === null
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Debe seleccionar un modelo evaluativo o establecer las notas, asistencia y cantidad de decimales",
					path: [
						"asistenciaAprobar",
						"cantidadDecimales",
						"notaMaxima",
						"notaMinima",
					],
				});
				return; // return early to avoid adding more issues to the context.
			}

			if (
				notaMaxima !== null &&
				notaMinima !== null &&
				notaMaxima < notaMinima
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "La nota minima no puede ser mayor a la nota maxima",
					path: ["notaMinima", "notaMaxima"],
				});

				return;
			}

			if (
				modeloEvaluativoId &&
				(asistenciaAprobar !== null ||
					cantidadDecimales !== null ||
					notaMaxima !== null ||
					notaMinima !== null)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"No puede seleccionar un modelo evaluativo y establecer las notas, asistencia y cantidad de decimales",
					path: [
						"asistenciaAprobar",
						"cantidadDecimales",
						"notaMaxima",
						"notaMinima",
					],
				});

				return;
			}

			const nonNullValues = [cantidadDecimales, notaMaxima, notaMinima].filter(
				(v): v is number => v !== null,
			);

			if (
				!modeloEvaluativoId &&
				asistenciaAprobar !== null &&
				nonNullValues.length === 0
			) {
				return;
			}

			if (
				!modeloEvaluativoId &&
				asistenciaAprobar === null &&
				nonNullValues.length > 0
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si se califica sin modelo evaluativo, debe establecer las notas, asistencia y cantidad de decimales",
				});
			}

			if (
				!modeloEvaluativoId &&
				asistenciaAprobar !== null &&
				nonNullValues.length > 0 &&
				nonNullValues.length !== 3
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si se califica sin modelo evaluativo, debe establecer las notas, asistencia y cantidad de decimales",
					path: [
						"asistenciaAprobar",
						"cantidadDecimales",
						"notaMaxima",
						"notaMinima",
					],
				});

				return;
			}

			// console.log({
			// 	asistenciaAprobar,
			// 	cantidadDecimales,
			// 	notaMaxima,
			// 	notaMinima,
			// 	nonNullValues,
			// });
		},
	);

class CreateAsignaturaEnVarianteCursoDTOError extends BaseDTOError<ICreateAsignaturaEnVarianteCurso> {
	constructor(error: z.ZodError<ICreateAsignaturaEnVarianteCurso>) {
		super(error);
		this.name = "CreateAsignaturaEnVarianteCursoDTOError";
		this.message =
			"Error de validacion para crear la asignatura en la variante de curso";
	}
}

export class CreateAsignaturaEnVarianteCursoDTO extends BaseValidatorDTO<
	ICreateAsignaturaEnVarianteCurso,
	CreateAsignaturaEnVarianteCursoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaEnVarianteCursoDTOError, input);
	}
}
