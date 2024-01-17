import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateModalidad } from "../../Domain/IUpdateModalidad";

const schema = z.object<ZodInferSchema<IUpdateModalidad>>({
	alias: z.string().nullable(),
});

export class UpdateModalidadDTO {
	private data: IUpdateModalidad | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
