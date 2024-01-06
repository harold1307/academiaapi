import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateAreaConocimiento } from "../../Domain/ICreateAreaConocimiento";

const schema = z.object<ZodInferSchema<ICreateAreaConocimiento>>({
	codigo: z.string().nullable(),
	nombre: z.string(),
});

export class CreateAreaConocimientoDTO {
	private data: ICreateAreaConocimiento | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
