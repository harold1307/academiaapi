import { z } from "zod";

import type { ICreateVarianteCurso } from "../../Domain/ICreateVarianteCurso";
import type { ZodInferSchema } from "../../../../types";

const schema = z.object<ZodInferSchema<ICreateVarianteCurso>>({
	nombre: z.string(),
	codigoBase: z.string(),
	descripcion: z.string(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificarSesion: z.boolean(),
	verificarEdad: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
});

export class CreateVarianteCursoDTO {
	private curso: ICreateVarianteCurso | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.curso = parse.data;
		}

		return parse;
	}
}
