import { z } from "zod";

import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";

const schema: z.ZodType<ICreateAsignatura> = z.object({
	nombre: z.string(),
	codigo: z.string().nullable(),
});

export class CreateAsignaturaDTO {
	private asignatura: ICreateAsignatura | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.asignatura = parse.data;
		}

		return parse;
	}
}
