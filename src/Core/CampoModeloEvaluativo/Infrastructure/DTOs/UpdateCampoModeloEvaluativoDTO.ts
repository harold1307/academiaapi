import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCampoModeloEvaluativo } from "../../Domain/IUpdateCampoModeloEvaluativo";

const schema = z.object<ZodInferSchema<IUpdateCampoModeloEvaluativo>>({
	codigo: z.string().optional(),
	ordenActa: z.number().optional(),
	notaMaxima: z.number().optional(),
	notaMinima: z.number().optional(),
	decimales: z.number().optional(),
	campoDependiente: z.boolean().optional(),
	actualizaEstado: z.boolean().optional(),
	actualizaEstadoNegativo: z.boolean().optional(),
	determinaEstadoFinal: z.boolean().optional(),
	defineMaximos: z.boolean().optional(),
	alternativaId: z.string().optional(),
});

export class UpdateCampoModeloEvaluativoDTO {
	private data: IUpdateCampoModeloEvaluativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
