import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateModalidad } from "../../Domain/ICreateModalidad";

const schema = z.object<ZodInferSchema<ICreateModalidad>>({
	alias: z.string().nullable(),
	nombre: z.string(),
});

export class CreateModalidadDTO {
	private data: ICreateModalidad | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
