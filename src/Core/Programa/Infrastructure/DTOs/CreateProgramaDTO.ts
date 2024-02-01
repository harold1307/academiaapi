import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreatePrograma } from "../../Domain/ICreatePrograma";

const schema = z.object<ZodInferSchema<ICreatePrograma>>({
	nombre: z.string(),
	mencion: z.string(),
	alias: z.string(),
	detalleNivelTitulacionId: z.string().uuid(),
});

class CreateProgramaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateProgramaDTOError";
		this.message = "Error de validacion para crear el programa";
		this.issues = issues;
	}
}

export class CreateProgramaDTO {
	private data: ICreatePrograma;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateProgramaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
