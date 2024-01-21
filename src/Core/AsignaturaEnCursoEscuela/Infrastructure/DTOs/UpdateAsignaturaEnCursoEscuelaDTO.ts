import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaEnCursoEscuela } from "../../Domain/IUpdateAsignaturaEnCursoEscuela";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaEnCursoEscuela>>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),
	asistenciaAprobar: z.number().optional(),
	asignaturaId: z.string().optional(),
	// @ts-expect-error ZodInferSchema doesnt work with nullable and optional types
	profesorId: z.string().nullable().optional(),
});

export class UpdateAsignaturaEnCursoEscuelaDTO {
	private data: IUpdateAsignaturaEnCursoEscuela | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
