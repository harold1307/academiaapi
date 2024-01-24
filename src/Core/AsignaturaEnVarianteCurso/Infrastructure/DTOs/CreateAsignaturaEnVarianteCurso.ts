import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnVarianteCurso } from "../../Domain/ICreateAsignaturaEnVarianteCurso";

const schema = z.object<ZodInferSchema<ICreateAsignaturaEnVarianteCurso>>({
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
	varianteCursoId: z.string(),
	modeloEvaluativoId: z.string().nullable(),
});

export class CreateAsignaturaEnVarianteCurso {
	private data: ICreateAsignaturaEnVarianteCurso | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
