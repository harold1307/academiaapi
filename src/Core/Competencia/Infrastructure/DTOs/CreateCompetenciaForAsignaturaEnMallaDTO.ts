import { z } from "zod";

import type { ICreateCompetenciaForAsignaturaEnMalla } from "../../Domain/ICreateCompetenciaForAsignaturaEnMalla";

const schema: z.ZodType<ICreateCompetenciaForAsignaturaEnMalla> = z.object({
	nombre: z.string(),
	asignaturaEnMallaId: z.string(),
});

export class CreateCompetenciaForAsignaturaEnMallaDTO {
	private competencia: ICreateCompetenciaForAsignaturaEnMalla | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.competencia = parse.data;
		}

		return parse;
	}
}
