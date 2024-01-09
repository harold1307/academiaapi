import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateLugarEjecucion } from "../../Domain/ICreateLugarEjecucion";

const schema = z.object<ZodInferSchema<ICreateLugarEjecucion>>({
	mallaId: z.string(),
	codigo: z.string().nullable(),
	institucionId: z.string(),
});

export class CreateLugarEjecucionDTO {
	private data: ICreateLugarEjecucion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
