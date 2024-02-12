import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateTipoDocumento } from "../../Domain/ICreateTipoDocumento";

const schema = z.object<ZodInferSchema<ICreateTipoDocumento>>({
	nombre: z.string(),
	titulo: z.boolean(),
	actaGrado: z.boolean(),
	cedula: z.boolean(),
	papeletaVotacion: z.boolean(),
	carnetConadis: z.boolean(),
	convalidacion: z.boolean(),
	partidaNacimiento: z.boolean(),
	preNivelacion: z.boolean(),
	serviciosBasicos: z.boolean(),
	examenIngreso: z.boolean(),
	paraPasantia: z.boolean(),
});

class CreateTipoDocumentoDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateTipoDocumentoDTOError";
		this.message = "Error de validacion para crear el tipo de documento";
		this.issues = issues;
	}
}

export class CreateTipoDocumentoDTO {
	private data: ICreateTipoDocumento;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateTipoDocumentoDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
