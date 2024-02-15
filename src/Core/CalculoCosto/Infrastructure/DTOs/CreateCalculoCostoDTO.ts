import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCalculoCosto } from "../../Domain/ICreateCalculoCosto";

const schema = z
	.object<ZodInferSchema<ICreateCalculoCosto>>({
		tipo: z.enum([
			"COSTO_POR_NIVEL_Y_MATERIAS",
			"COSTO_POR_PLAN_CUOTA",
		] as const),
		costoPorSesion: z.boolean().nullable(),
		cronogramaFechasOpcionPago: z.boolean().nullable(),
		estudiantesEligenOpcionPago: z.boolean().nullable(),
	})
	.superRefine(
		(
			{
				costoPorSesion,
				cronogramaFechasOpcionPago,
				estudiantesEligenOpcionPago,
				tipo,
			},
			ctx,
		) => {
			switch (tipo) {
				case "COSTO_POR_NIVEL_Y_MATERIAS": {
					const opcionesPago = [
						cronogramaFechasOpcionPago,
						estudiantesEligenOpcionPago,
					];

					const opcionesPagoNull = opcionesPago.filter(
						(field): field is null => field === null,
					);

					if (costoPorSesion !== null && opcionesPagoNull.length !== 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								"En costo por nivel y materias, si se quiere costo por sesion, los demas valores deben ser null.",
							path: [
								"costoPorSesion",
								"cronogramaFechasOpcionPago",
								"estudiantesEligenOpcionPago",
							],
						});

						return;
					}

					if (costoPorSesion !== null && opcionesPagoNull.length === 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								"En costo por nivel y materias, no se puede costo por sesion y opciones de pago a la vez",
							path: [
								"costoPorSesion",
								"estudiantesEligenOpcionPago",
								"cronogramaFechasOpcionPago",
							],
						});
						return;
					}

					if (opcionesPagoNull.length !== 2 && opcionesPagoNull.length !== 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								"En costo por nivel y materias, si se quiere opciones de pago, los campos respectivos son requeridos de lo contrario todos null.",
							path: [
								"cronogramaFechasOpcionPago",
								"estudiantesEligenOpcionPago",
							],
						});

						return;
					}

					break;
				}
				case "COSTO_POR_PLAN_CUOTA": {
					break;
				}
			}
		},
	);

class CreateCalculoCostoDTOError extends BaseDTOError<ICreateCalculoCosto> {
	constructor(error: z.ZodError<ICreateCalculoCosto>) {
		super(error);
		this.name = "CreateCalculoCostoDTOError";
		this.message = "Error de validacion para crear el calculo de costo";
	}
}

export class CreateCalculoCostoDTO extends BaseValidatorDTO<
	ICreateCalculoCosto,
	CreateCalculoCostoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCalculoCostoDTOError, input);
	}
}
