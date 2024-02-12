import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreatePerfilPractica } from "../../Domain/ICreatePerfilPractica";

const schema = z.object<ZodInferSchema<ICreatePerfilPractica>>({
	nombre: z.string(),
	actividades: z.string().nullable(),
	capacidades: z.string().nullable(),
	resultados: z.string().nullable(),
});

class CreatePerfilPracticaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreatePerfilPracticaDTOError";
		this.message = "Error de validacion para crear el perfil de practica";
		this.issues = issues;
	}
}

export class CreatePerfilPracticaDTO {
	private data: ICreatePerfilPractica;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreatePerfilPracticaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
