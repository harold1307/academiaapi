import { TipoDuracion } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";

const schema = z.object<ZodInferSchema<ICreateMallaCurricular>>({
	modalidadId: z.string(),
	tituloObtenido: z.string(),
	tipoDuracion: z.nativeEnum(TipoDuracion),
	fechaAprobacion: z.date(),
	fechaLimiteVigencia: z.date(),
	niveles: z.number(),
	maximoMateriasMatricula: z.number(),
	cantidadLibreOpcionEgreso: z.number(),
	cantidadOptativasEgreso: z.number(),
	cantidadArrastres: z.number(),
	practicasLigadasMaterias: z.boolean(),
	horasPractica: z.number(),
	registroPracticasDesde: z.number(),
	horasVinculacion: z.number(),
	registroVinculacionDesde: z.number(),
	registroProyectosDesde: z.number(),
	usaNivelacion: z.boolean(),
	plantillasSilabo: z.boolean(),
	perfilEgreso: z.string(),
	observaciones: z.string(),
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
