import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCampoProyectoIntegrador } from "../../Domain/IUpdateCampoProyectoIntegrador";

const schema = z.object<ZodInferSchema<IUpdateCampoProyectoIntegrador>>({
	nombre: z.string().optional(),
	codigo: z.string().optional(),

	observaciones: z.string().nullable().optional(),
	ordenActa: z.number().optional(),
	notaMaxima: z.number().optional(),
	notaMinima: z.number().optional(),
	decimales: z.number().optional(),
	campoDependiente: z.boolean().optional(),
	actualizaEstado: z.boolean().optional(),
	determinaEstadoFinal: z.boolean().optional(),
});

export class UpdateCampoProyectoIntegradorDTO {
	private data: IUpdateCampoProyectoIntegrador | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
