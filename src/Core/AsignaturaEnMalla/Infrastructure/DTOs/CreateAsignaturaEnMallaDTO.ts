import { $Enums } from "@prisma/client";
import { z } from "zod";

import type { ICreateAsignaturaEnMalla } from "../../Domain/ICreateAsignaturaEnMalla";

const schema: z.ZodType<ICreateAsignaturaEnMalla> = z.object({
	ejeFormativo: z.string(),
	nivel: z.number(),
	areaConocimiento: z.string(),
	campoFormacion: z.string(),
	tipoAsignatura: z.nativeEnum($Enums.TipoAsignatura),
	identificacion: z.string(),

	permiteMatriculacion: z.boolean(),
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	practicasPreProfesionales: z.boolean(),
	requeridaEgreso: z.boolean(),

	cantidadMatriculas: z.number(),
	horasSemanales: z.number(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	creditos: z.number(),

	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),

	objetivos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),

	asignaturaId: z.string(),
	mallaId: z.string(),
});

export class CreateAsignaturaEnMallaDTO {
	private asignaturaEnMalla: ICreateAsignaturaEnMalla | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.asignaturaEnMalla = parse.data;
		}

		return parse;
	}
}
