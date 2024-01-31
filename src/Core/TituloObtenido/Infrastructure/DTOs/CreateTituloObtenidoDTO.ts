import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateTituloObtenido } from "../../Domain/ICreateTituloObtenido";

const schema = z.object<ZodInferSchema<ICreateTituloObtenido>>({
	nombre: z.string(),
	programaId: z.string().uuid(),
});

class CreateTituloObtenidoDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateTituloObtenidoDTOError";
		this.message = "Error de validacion para crear el titulo obtenido";
		this.issues = issues;
	}
}

export class CreateTituloObtenidoDTO {
	private data: ICreateTituloObtenido;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateTituloObtenidoDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
