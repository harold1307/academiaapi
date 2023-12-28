import { z } from "zod";

import type { ICreateCurso } from "../../Domain/ICreateCurso";

const schema: z.ZodType<ICreateCurso> = z.object({
	estado: z.boolean(),
	nombre: z.string(),
	certificado: z.string().nullable(),
	alias: z.string().nullable(),
});

export class CreateCursoDTO {
	private curso: ICreateCurso | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.curso = parse.data;
		}

		return parse;
	}
}
