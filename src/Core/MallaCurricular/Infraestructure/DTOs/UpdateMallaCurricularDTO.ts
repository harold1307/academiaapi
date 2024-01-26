import { TipoDuracion } from "@prisma/client";
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateMallaCurricular } from "../../Domain/IUpdateMallaCurricular";

const schema = z.object<ZodInferSchema<IUpdateMallaCurricular>>({
	modalidadId: z.string().optional(),
	tituloObtenido: z.string().optional(),
	tipoDuracion: z.nativeEnum(TipoDuracion).optional(),
	fechaAprobacion: z.date().optional(),
	fechaLimiteVigencia: z.date().optional(),
	niveles: z.number().optional(),
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

export class UpdateMallaCurricularDTO {
	private data: IUpdateMallaCurricular | undefined;
	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
