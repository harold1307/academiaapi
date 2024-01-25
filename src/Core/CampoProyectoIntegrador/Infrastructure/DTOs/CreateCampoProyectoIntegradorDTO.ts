import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateCampoProyectoIntegrador } from "../../Domain/ICreateCampoProyectoIntegrador";

const schema = z.object<ZodInferSchema<ICreateCampoProyectoIntegrador>>({
	nombre: z.string(),
	codigo: z.string(),
	observaciones: z.string().nullable(),
	ordenActa: z.number(),
	notaMaxima: z.number(),
	notaMinima: z.number(),
	decimales: z.number(),
	campoDependiente: z.boolean(),
	actualizaEstado: z.boolean(),
	determinaEstadoFinal: z.boolean(),
	proyectoIntegradorId: z.string(),
});

export class CreateCampoProyectoIntegradorDTO {
	private data: ICreateCampoProyectoIntegrador | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
