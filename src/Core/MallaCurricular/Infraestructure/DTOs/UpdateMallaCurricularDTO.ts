import { TipoDuracion } from "@prisma/client";
import { z } from "zod";

import type { IMallaCurricular } from "../../Domain/IMallaCurricular";

type IUpdateMallaCurricularInput = Partial<
	Omit<
		IMallaCurricular,
		"id" | "createdAt" | "fechaAprobacion" | "fechaLimiteVigencia"
	> & {
		fechaAprobacion: string;
		fechaLimiteVigencia: string;
	}
>;

export type IUpdateMallaCurricularOutput = Partial<
	Omit<IMallaCurricular, "id" | "createdAt">
>;

const schema: z.ZodType<
	IUpdateMallaCurricularOutput,
	z.ZodTypeDef,
	IUpdateMallaCurricularInput
> = z.object({
	modalidad: z.string().optional(),
	tituloObtenido: z.string().optional(),
	tipoDuracion: z.nativeEnum(TipoDuracion).optional(),
	fechaAprobacion: z
		.string()
		.datetime()
		.optional()
		.transform(str => (str ? new Date(str) : undefined)),
	fechaLimiteVigencia: z
		.string()
		.datetime()
		.optional()
		.transform(str => (str ? new Date(str) : undefined)),
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
	prefilEgreso: z.string().optional(),
	observaciones: z.string().optional(),
});

export class UpdateMallaCurricularDTO {
	private mallaCurricular: IUpdateMallaCurricularOutput | undefined;
	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.mallaCurricular = parse.data;
		}

		return parse;
	}
}
