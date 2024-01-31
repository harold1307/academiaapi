import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateTituloObtenido } from "../../Domain/IUpdateTituloObtenido";

const schema = z.object<ZodInferSchema<IUpdateTituloObtenido>>({
	nombre: z.string().optional(),
});

class UpdateTituloObtenidoDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateTituloObtenidoDTOError";
		this.message = "Error de validacion para actualizar el titulo obtenido";
		this.issues = issues;
	}
}

export class UpdateTituloObtenidoDTO {
	private data: IUpdateTituloObtenido;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateTituloObtenidoDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
