import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePrograma } from "../../Domain/IUpdatePrograma";

const schema = z.object<ZodInferSchema<IUpdatePrograma>>({
	alias: z.string().optional(),
	detalleNivelTitulacionId: z.string().uuid().optional(),
	estado: z.boolean().optional(),
});

class UpdateProgramaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateProgramaDTOError";
		this.message = "Error de validacion para actualizar el programa";
		this.issues = issues;
	}
}

export class UpdateProgramaDTO {
	private data: IUpdatePrograma;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateProgramaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
