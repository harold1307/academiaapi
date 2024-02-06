import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateModeloNivelacion } from "../../Domain/IUpdateModeloNivelacion";

const schema = z.object<ZodInferSchema<IUpdateModeloNivelacion>>({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	observaciones: z.string().nullable().optional(),
});

export class UpdateModeloNivelacionDTO {
	private data: IUpdateModeloNivelacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
