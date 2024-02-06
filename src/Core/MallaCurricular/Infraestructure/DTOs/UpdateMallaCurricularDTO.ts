import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateMallaCurricular } from "../../Domain/IUpdateMallaCurricular";

const schema = z.object<ZodInferSchema<IUpdateMallaCurricular>>({
	estado: z.boolean().optional(),

	tipoDuracion: z
		.enum(["ANOS", "CREDITOS", "HORAS", "SEMESTRES"] as const)
		.nullable()
		.optional(),

	codigo: z.string().nullable().optional(),
	fechaAprobacion: z.date().optional(),
	fechaLimiteVigencia: z.date().optional(),
	cantidadOtrasMateriasMatricula: z.number().optional(),
	limiteSeleccionMateriaPorAdministrativo: z.boolean().optional(),

	cantidadArrastres: z.number().nullable().optional(),

	porcentajeMinimoPasarNivel: z.number().nullable().optional(),

	maximoMateriasAdelantar: z.number().nullable().optional(),
	automatriculaModulos: z.boolean().optional(),
	plantillasSilabo: z.boolean().optional(),
	modeloPlanificacion: z.boolean().optional(),

	perfilEgreso: z.string().nullable().optional(),

	observaciones: z.string().nullable().optional(),

	tituloObtenidoId: z.string().uuid().nullable().optional(),
});

class UpdateMallaCurricularDTOError extends BaseDTOError<IUpdateMallaCurricular> {
	constructor(error: z.ZodError<IUpdateMallaCurricular>) {
		super(error);
		this.name = "UpdateMallaCurricularDTOError";
		this.message = "Error de validacion para actualizar la malla curricular";
	}
}

export class UpdateMallaCurricularDTO extends BaseValidatorDTO<
	IUpdateMallaCurricular,
	UpdateMallaCurricularDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateMallaCurricularDTOError, input);
	}
}
