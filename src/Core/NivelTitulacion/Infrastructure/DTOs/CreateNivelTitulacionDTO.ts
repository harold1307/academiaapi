import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateNivelTitulacion } from "../../Domain/ICreateNivelTitulacion";

const schema = z.object<ZodInferSchema<ICreateNivelTitulacion>>({
	nombre: z.string(),
});

export class CreateNivelTitulacionDTO {
	private data: ICreateNivelTitulacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
