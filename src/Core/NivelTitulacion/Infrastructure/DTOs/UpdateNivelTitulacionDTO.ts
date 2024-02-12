import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateNivelTitulacion } from "../../Domain/IUpdateNivelTitulacion";

const schema = z.object<ZodInferSchema<IUpdateNivelTitulacion>>({
	nombre: z.string().optional(),
});

export class UpdateNivelTitulacionDTO {
	private data: IUpdateNivelTitulacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
