import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateCampoModeloEvaluativo } from "../../Domain/ICreateCampoModeloEvaluativo";

const schema = z.object<ZodInferSchema<ICreateCampoModeloEvaluativo>>({
	codigo: z.string(),
	ordenActa: z.number(),
	notaMaxima: z.number(),
	notaMinima: z.number(),
	decimales: z.number(),
	campoDependiente: z.boolean(),
	actualizaEstado: z.boolean(),
	actualizaEstadoNegativo: z.boolean(),
	determinaEstadoFinal: z.boolean(),
	defineMaximos: z.boolean(),
	alternativaId: z.string(),
	modeloEvaluativoId: z.string(),
});

export class CreateCampoModeloEvaluativoDTO {
	private data: ICreateCampoModeloEvaluativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
