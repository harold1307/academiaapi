import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCurso } from "../../Domain/IUpdateCurso";

const schema = z.object<ZodInferSchema<IUpdateCurso>>({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	certificado: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
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
