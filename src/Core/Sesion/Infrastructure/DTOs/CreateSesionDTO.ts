import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateSesion } from "../../Domain/ICreateSesion";

const schema = z.object<ZodInferSchema<ICreateSesion>>({
	nombre: z.string(),
	sedeId: z.string(),
	alias: z.string().nullable(),
	lunes: z.boolean(),
	martes: z.boolean(),
	miercoles: z.boolean(),
	jueves: z.boolean(),
	viernes: z.boolean(),
	sabado: z.boolean(),
	domingo: z.boolean(),
});

export class CreateSesionDTO {
	private data: ICreateSesion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
