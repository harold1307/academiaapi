import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAlternativaEvaluacion } from "../../Domain/IUpdateAlternativaEvaluacion";

const schema = z.object<ZodInferSchema<IUpdateAlternativaEvaluacion>>({
	codigo: z.string().optional(),
	nombre: z.string().optional(),
});

export class UpdateAlternativaEvaluacionDTO {
	private data: IUpdateAlternativaEvaluacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
