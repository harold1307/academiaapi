import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAreaConocimiento } from "../../Domain/IUpdateAreaConocimiento";

const schema = z.object<ZodInferSchema<IUpdateAreaConocimiento>>({
	// @ts-expect-error not well implemented ZodInferSchema for nullable and optional
	codigo: z.string().nullable().optional(),
	nombre: z.string().optional(),
});

export class UpdateAreaConocimientoDTO {
	private data: IUpdateAreaConocimiento | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
