import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateCampoFormacion } from "../../Domain/ICreateCampoFormacion";

const schema = z.object<ZodInferSchema<ICreateCampoFormacion>>({
	nombre: z.string(),
});

export class CreateCampoFormacionDTO {
	private data: ICreateCampoFormacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
