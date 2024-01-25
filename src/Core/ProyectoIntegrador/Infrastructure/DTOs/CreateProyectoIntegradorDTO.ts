import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateProyectoIntegrador } from "../../Domain/ICreateProyectoIntegrador";

const schema = z.object<ZodInferSchema<ICreateProyectoIntegrador>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	observaciones: z.string().nullable(),
});

export class CreateProyectoIntegradorDTO {
	private data: ICreateProyectoIntegrador | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
