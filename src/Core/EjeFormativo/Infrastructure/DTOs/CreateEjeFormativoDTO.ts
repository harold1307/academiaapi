import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateEjeFormativo } from "../../Domain/ICreateEjeFormativo";

const schema = z.object<ZodInferSchema<ICreateEjeFormativo>>({
	nombre: z.string(),
});

export class CreateEjeFormativoDTO {
	data: ICreateEjeFormativo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
