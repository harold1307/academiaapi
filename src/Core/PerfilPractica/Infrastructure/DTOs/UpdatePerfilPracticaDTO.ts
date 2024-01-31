import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdatePerfilPractica } from "../../Domain/IUpdatePerfilPractica";

const schema = z.object<ZodInferSchema<IUpdatePerfilPractica>>({
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	actividades: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	capacidades: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultados: z.string().nullable().optional(),
});

class UpdatePerfilPracticaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdatePerfilPracticaDTOError";
		this.message = "Error de validacion para actualizar el perfil de practica";
		this.issues = issues;
	}
}

export class UpdatePerfilPracticaDTO {
	private data: IUpdatePerfilPractica;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdatePerfilPracticaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
