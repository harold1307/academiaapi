import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateCompetenciaForAsignaturaEnMalla } from "../../Domain/ICreateCompetenciaForAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<ICreateCompetenciaForAsignaturaEnMalla>>(
	{
		nombre: z.string(),
		asignaturaEnMallaId: z.string(),
	},
);

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
