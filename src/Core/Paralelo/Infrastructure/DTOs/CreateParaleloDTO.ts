import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateParalelo } from "../../Domain/ICreateParalelo";

const schema = z.object<ZodInferSchema<ICreateParalelo>>({
	nombre: z.string(),
	orden: z.number().int(),
});

export class CreateParaleloDTO {
	private data: ICreateParalelo | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
