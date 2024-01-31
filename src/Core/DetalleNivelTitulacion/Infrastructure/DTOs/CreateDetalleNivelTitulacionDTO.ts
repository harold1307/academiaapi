import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateDetalleNivelTitulacion } from "../../Domain/ICreateDetalleNivelTitulacion";

const schema = z.object<ZodInferSchema<ICreateDetalleNivelTitulacion>>({
	nivelTitulacionId: z.string().uuid(),
	nombre: z.string(),
});

class CreateDetalleNivelTitulacionDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateDetalleNivelTitulacionDTOError";
		this.message =
			"Error de validacion para crear el detalle de nivel de titulacion";
		this.issues = issues;
	}
}

export class CreateDetalleNivelTitulacionDTO {
	private data: ICreateDetalleNivelTitulacion;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateDetalleNivelTitulacionDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
