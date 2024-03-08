import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateProgramaEnCursoEscuela } from "../../Domain/IUpdateProgramaEnCursoEscuela";

const schema = z.object<ZodInferSchema<IUpdateProgramaEnCursoEscuela>>({
	registroExterno: z.boolean().optional(),
	programaId: z.string().uuid().optional(),
	mallaId: z.string().uuid().nullable().optional(),
	modalidadId: z.string().uuid().nullable().optional(),
	nivelDesde: z.number().int().min(0).max(10).nullable().optional(),
	nivelHasta: z.number().int().min(0).max(10).nullable().optional(),
});

class UpdateProgramaEnCursoEscuelaDTOError extends BaseDTOError<IUpdateProgramaEnCursoEscuela> {
	constructor(error: z.ZodError<IUpdateProgramaEnCursoEscuela>) {
		super(error);
		this.name = "UpdateProgramaEnCursoEscuelaDTOError";
		this.message =
			"Error de validacion para actualizar el programa en curso escuela";
	}
}

export class UpdateProgramaEnCursoEscuelaDTO extends BaseValidatorDTO<
	IUpdateProgramaEnCursoEscuela,
	UpdateProgramaEnCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateProgramaEnCursoEscuelaDTOError, input);
	}
}
