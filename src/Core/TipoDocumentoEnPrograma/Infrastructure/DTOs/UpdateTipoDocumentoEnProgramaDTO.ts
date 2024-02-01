import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateTipoDocumentoEnPrograma } from "../../Domain/IUpdateTipoDocumentoEnPrograma";

const schema = z.object<ZodInferSchema<IUpdateTipoDocumentoEnPrograma>>({
	requeridoDigital: z.boolean().optional(),
	requeridoFisico: z.boolean().optional(),
	tipoDocumentoId: z.string().uuid().optional(),
});

class UpdateTipoDocumentoEnProgramaDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateTipoDocumentoEnProgramaDTOError";
		this.message =
			"Error de validacion para actualizar el tipo de documento en programa";
		this.issues = issues;
	}
}

export class UpdateTipoDocumentoEnProgramaDTO {
	private data: IUpdateTipoDocumentoEnPrograma;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateTipoDocumentoEnProgramaDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
