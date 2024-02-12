import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateProyectoIntegrador } from "../../Domain/IUpdateProyectoIntegrador";

const schema = z.object<ZodInferSchema<IUpdateProyectoIntegrador>>({
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	observaciones: z.string().nullable().optional(),
});

export class UpdateProyectoIntegradorDTO {
	private data: IUpdateProyectoIntegrador | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
