import { TipoDuracion } from "@prisma/client";
import { z } from "zod";

import type { IMallaCurricular } from "../../Domain/IMallaCurricular";

type ICreateMallaCurricularInput = Omit<
	IMallaCurricular,
	"id" | "createdAt" | "fechaAprobacion" | "fechaLimiteVigencia"
> & {
	fechaAprobacion: string;
	fechaLimiteVigencia: string;
};

export type ICreateMallaCurricularOutput = Omit<
	IMallaCurricular,
	"id" | "createdAt"
>;

const schema: z.ZodType<
	ICreateMallaCurricularOutput,
	z.ZodTypeDef,
	ICreateMallaCurricularInput
> = z.object({
	modalidadId: z.string(),
	tituloObtenido: z.string(),
	tipoDuracion: z.nativeEnum(TipoDuracion),
	fechaAprobacion: z
		.string()
		.datetime()
		.transform(str => new Date(str)),
	fechaLimiteVigencia: z
		.string()
		.datetime()
		.transform(str => new Date(str)),
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

export class CreateMallaCurricularDTO {
	private mallaCurricular: ICreateMallaCurricularOutput | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.mallaCurricular = parse.data;
		}

		return parse;
	}
}
