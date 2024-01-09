import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCampoFormacion } from "../../Domain/IUpdateCampoFormacion";

const schema = z.object<ZodInferSchema<IUpdateCampoFormacion>>({
	nombre: z.string().optional(),
});

export class UpdateCampoFormacionDTO {
	private data: IUpdateCampoFormacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
