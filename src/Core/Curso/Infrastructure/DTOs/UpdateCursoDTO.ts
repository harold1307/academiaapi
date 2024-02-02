import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCurso } from "../../Domain/IUpdateCurso";

const schema = z.object<ZodInferSchema<IUpdateCurso>>({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	certificado: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	alias: z.string().nullable().optional(),
});

class UpdateCursoError extends BaseDTOError<IUpdateCurso> {
	constructor(error: z.ZodError<IUpdateCurso>) {
		super(error);
		this.name = "UpdateCursoError";
		this.message = "Error de validacion para actualizar la plantilla de curso";
	}
}

export class UpdateCursoDTO extends BaseValidatorDTO<
	IUpdateCurso,
	UpdateCursoError
> {
	constructor(input: unknown) {
		super(schema, UpdateCursoError, input);
	}
}
