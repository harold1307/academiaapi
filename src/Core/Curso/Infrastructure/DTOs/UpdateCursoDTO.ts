import { z } from "zod";

import type { IUpdateCurso } from "../../Domain/IUpdateCurso";

const schema: z.ZodType<IUpdateCurso> = z.object({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
	certificado: z.string().nullable().optional(),
	alias: z.string().nullable().optional(),
});

export class UpdateCursoDTO {
	private curso: IUpdateCurso | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.curso = parse.data;
		}

		return parse;
	}
}
