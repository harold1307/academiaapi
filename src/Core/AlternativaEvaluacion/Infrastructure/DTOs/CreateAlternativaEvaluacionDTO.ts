import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateAlternativaEvaluacion } from "../../Domain/ICreateAlternativaEvaluacion";

const schema = z.object<ZodInferSchema<ICreateAlternativaEvaluacion>>({
	codigo: z.string(),
	nombre: z.string(),
});

export class CreateAlternativaEvaluacionDTO {
	private data: ICreateAlternativaEvaluacion | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
