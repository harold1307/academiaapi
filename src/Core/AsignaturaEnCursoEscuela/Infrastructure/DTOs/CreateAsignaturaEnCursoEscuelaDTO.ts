import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnCursoEscuela } from "../../Domain/ICreateAsignaturaEnCursoEscuela";

const schema = z.object<ZodInferSchema<ICreateAsignaturaEnCursoEscuela>>({
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	requeridoAprobar: z.boolean(),
	asistenciaAprobar: z.number(),
	asignaturaId: z.string(),
	cursoEscuelaId: z.string(),
	profesorId: z.string().nullable(),
});

export class CreateAsignaturaEnCursoEscuelaDTO {
	private data: ICreateAsignaturaEnCursoEscuela | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
