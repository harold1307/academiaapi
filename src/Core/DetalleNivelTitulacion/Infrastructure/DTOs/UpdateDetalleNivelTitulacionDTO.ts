import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdateDetalleNivelTitulacion } from "../../Domain/IUpdateDetalleNivelTitulacion";

const schema = z.object<ZodInferSchema<IUpdateDetalleNivelTitulacion>>({
	nombre: z.string().optional(),
});

class UpdateDetalleNivelTitulacionDTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateDetalleNivelTitulacionDTOError";
		this.message =
			"Error de validacion para actualizar el detalle de nivel de titulacion";
		this.issues = issues;
	}
}

export class UpdateDetalleNivelTitulacionDTO {
	private data: IUpdateDetalleNivelTitulacion;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateDetalleNivelTitulacionDTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
