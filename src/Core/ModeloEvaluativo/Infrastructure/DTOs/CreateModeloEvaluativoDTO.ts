import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateModeloEvaluativo } from "../../Domain/ICreateModeloEvaluativo";

const schema = z.object<ZodInferSchema<ICreateModeloEvaluativo>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	notaRecuperacion: z.number(),
	porcentajeAsistenciaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	defineMaximos: z.boolean(),
	camposActualizanEstado: z.boolean(),
	observaciones: z.string().nullable(),
});

export class CreateModeloEvaluativoDTO {
	private data: ICreateModeloEvaluativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
