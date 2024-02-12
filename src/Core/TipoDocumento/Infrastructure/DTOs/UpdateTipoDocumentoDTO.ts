import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateTipoDocumento } from "../../Domain/IUpdateTipoDocumento";

const schema = z.object<ZodInferSchema<IUpdateTipoDocumento>>({
	nombre: z.string().optional(),
	titulo: z.boolean().optional(),
	actaGrado: z.boolean().optional(),
	cedula: z.boolean().optional(),
	papeletaVotacion: z.boolean().optional(),
	carnetConadis: z.boolean().optional(),
	convalidacion: z.boolean().optional(),
	partidaNacimiento: z.boolean().optional(),
	preNivelacion: z.boolean().optional(),
	serviciosBasicos: z.boolean().optional(),
	examenIngreso: z.boolean().optional(),
	paraPasantia: z.boolean().optional(),
});

class UpdateTipoDocumentoDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateTipoDocumentoDTOError";
		this.message = "Error de validacion para actualizar el tipo de documento";
		this.issues = issues;
	}
}

export class UpdateTipoDocumentoDTO {
	private data: IUpdateTipoDocumento;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateTipoDocumentoDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
