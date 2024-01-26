import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignatura } from "../../Domain/IUpdateAsignatura";

const schema = z.object<ZodInferSchema<IUpdateAsignatura>>({
	codigo: z.string().optional(),
});

export class UpdateAsignaturaDTO {
	private data: IUpdateAsignatura | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
