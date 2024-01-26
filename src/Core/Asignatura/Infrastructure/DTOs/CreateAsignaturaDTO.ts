import { z } from "zod";

import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";
import type { ZodInferSchema } from "../../../../types";

const schema = z.object<ZodInferSchema<ICreateAsignatura>>({
	nombre: z.string(),
	codigo: z.string().nullable(),
});

export class CreateAsignaturaDTO {
	private data: ICreateAsignatura | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
