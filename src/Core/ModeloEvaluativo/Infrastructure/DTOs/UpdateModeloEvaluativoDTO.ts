import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateModeloEvaluativo } from "../../Domain/IUpdateModeloEvaluativo";

const schema = z.object<ZodInferSchema<IUpdateModeloEvaluativo>>({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	notaRecuperacion: z.number().optional(),
	porcentajeAsistenciaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	defineMaximos: z.boolean().optional(),
	camposActualizanEstado: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	observaciones: z.string().nullable().optional(),
});

export class UpdateModeloEvaluativoDTO {
	private data: IUpdateModeloEvaluativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
