import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";

const schema = z
	.object<ZodInferSchema<ICreateMallaCurricular>>({
		tipoDuracion: z
			.enum(["ANOS", "CREDITOS", "HORAS", "SEMESTRES"] as const)
			.nullable(),
		codigo: z.string().nullable(),
		fechaAprobacion: z.date(),
		fechaLimiteVigencia: z.date(),
		cantidadOtrasMateriasMatricula: z.number(),
		limiteSeleccionMateriaPorAdministrativo: z.boolean(),
		cantidadArrastres: z.number().nullable(),
		porcentajeMinimoPasarNivel: z.number().nullable(),
		maximoMateriasAdelantar: z.number().nullable(),
		automatriculaModulos: z.boolean(),
		plantillasSilabo: z.boolean(),
		modeloPlanificacion: z.boolean(),
		perfilEgreso: z.string().nullable(),
		observaciones: z.string().nullable(),
		tituloObtenidoId: z.string().uuid().nullable(),
		modalidadId: z.string().uuid(),
		programaId: z.string().uuid(),

		niveles: z.number().min(1).max(10),

		practicaComunitariaRequiereAutorizacion: z.boolean().nullable(),
		practicaComunitariaHoras: z.number().nullable(),
		practicaComunitariaCreditos: z.number().nullable(),
		practicaComunitariaRegistroDesdeNivel: z.number().int().nullable(),
		practicaComunitariaRegistroPracticasAdelantadas: z.boolean().nullable(),
		practicaComunitariaRegistroMultiple: z.boolean().nullable(),

		practicaPreProfesionalRequiereAutorizacion: z.boolean().nullable(),
		practicaPreProfesionalHoras: z.number().nullable(),
		practicaPreProfesionalCreditos: z.number().nullable(),
		practicaPreProfesionalRegistroDesdeNivel: z.number().int().nullable(),
		practicaPreProfesionalRegistroPracticasAdelantadas: z.boolean().nullable(),
	})
	.superRefine(({ cantidadArrastres, porcentajeMinimoPasarNivel }, ctx) => {
		if (cantidadArrastres && porcentajeMinimoPasarNivel) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"El calculo de avance puede ser por cantidad de arrastres o porcentaje minimo, no ambos",
				path: ["porcentajeMinimoPasarNivel", "cantidadArrastres"],
			});
		}
	});

class CreateMallaCurricularDTOError extends BaseDTOError<ICreateMallaCurricular> {
	constructor(error: z.ZodError<ICreateMallaCurricular>) {
		super(error);
		this.name = "CreateMallaCurricularDTOError";
		this.message = "Error de validacion para crear la malla curricular";
	}
}

export class CreateMallaCurricularDTO extends BaseValidatorDTO<
	ICreateMallaCurricular,
	CreateMallaCurricularDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateMallaCurricularDTOError, input);
	}
}
