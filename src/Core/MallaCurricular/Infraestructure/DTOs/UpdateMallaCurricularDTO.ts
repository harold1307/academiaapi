import { TipoDuracion } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateMallaCurricular } from "../../Domain/IUpdateMallaCurricular";

const schema = z.object<ZodInferSchema<IUpdateMallaCurricular>>({
	estado: z.boolean().optional(),
	tituloObtenidoId: z.string().uuid().optional(),
	tipoDuracion: z.nativeEnum(TipoDuracion).optional(),
	fechaAprobacion: z.date().optional(),
	fechaLimiteVigencia: z.date().optional(),
	maximoMateriasMatricula: z.number().optional(),
	cantidadLibreOpcionEgreso: z.number().optional(),
	cantidadOptativasEgreso: z.number().optional(),
	cantidadArrastres: z.number().optional(),
	practicasLigadasMaterias: z.boolean().optional(),
	horasPractica: z.number().optional(),
	registroPracticasDesde: z.number().optional(),
	horasVinculacion: z.number().optional(),
	registroVinculacionDesde: z.number().optional(),
	registroProyectosDesde: z.number().optional(),
	usaNivelacion: z.boolean().optional(),
	plantillasSilabo: z.boolean().optional(),
	perfilEgreso: z.string().optional(),
	observaciones: z.string().optional(),
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
