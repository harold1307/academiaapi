import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateTipoDocumentoEnPrograma } from "../../Domain/ICreateTipoDocumentoEnPrograma";

const schema = z.object<ZodInferSchema<ICreateTipoDocumentoEnPrograma>>({
	programaId: z.string().uuid(),
	tipoDocumentoId: z.string().uuid(),
	requeridoDigital: z.boolean(),
	requeridoFisico: z.boolean(),
});

class CreateTipoDocumentoEnProgramaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateTipoDocumentoEnProgramaDTOError";
		this.message =
			"Error de validacion para crear el tipo de documento en programa";
		this.issues = issues;
	}
}

export class CreateTipoDocumentoEnProgramaDTO {
	private data: ICreateTipoDocumentoEnPrograma;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateTipoDocumentoEnProgramaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
