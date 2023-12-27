import { z } from "zod";

import type { IUpdateAsignatura } from "../../Domain/IUpdateAsignatura";

const schema: z.ZodType<IUpdateAsignatura> = z.object({
	codigo: z.string().optional(),
});

export class UpdateAsignaturaDTO {
	private asignatura: IUpdateAsignatura | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.asignatura = parse.data;
		}

		return parse;
	}
}
