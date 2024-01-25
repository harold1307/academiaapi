import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateModeloNivelacion } from "../../Domain/ICreateModeloNivelacion";

const schema = z.object<ZodInferSchema<ICreateModeloNivelacion>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	observaciones: z.string().nullable(),
});

export class CreateModeloNivelacionDTO {
	private data: ICreateModeloNivelacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
