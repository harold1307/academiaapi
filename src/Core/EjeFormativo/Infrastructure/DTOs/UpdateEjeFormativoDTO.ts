import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateEjeFormativo } from "../../Domain/IUpdateEjeFormativo";

const schema = z.object<ZodInferSchema<IUpdateEjeFormativo>>({
	nombre: z.string().optional(),
});

export class UpdateEjeFormativoDTO {
	private data: IUpdateEjeFormativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
