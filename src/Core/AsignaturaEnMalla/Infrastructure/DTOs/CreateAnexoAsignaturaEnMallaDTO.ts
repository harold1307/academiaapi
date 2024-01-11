import { $Enums } from "@prisma/client";
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateAnexoAsignaturaEnMalla } from "../../Domain/ICreateAnexoAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<ICreateAnexoAsignaturaEnMalla>>({
	esAnexo: z.literal(true),
	nivel: z.literal(0),
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
	sumaHoras: z.boolean(),
	creditos: z.number(),

	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),

	objetivos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),

	asignaturaId: z.string(),
	mallaId: z.string(),
	ejeFormativoId: z.null(),
	areaConocimientoId: z.string(),
	campoFormacionId: z.string(),
});

export class CreateAnexoAsignaturaEnMallaDTO {
	private anexoAsignaturaEnMalla: ICreateAnexoAsignaturaEnMalla | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.anexoAsignaturaEnMalla = parse.data;
		}

		return parse;
	}
}
