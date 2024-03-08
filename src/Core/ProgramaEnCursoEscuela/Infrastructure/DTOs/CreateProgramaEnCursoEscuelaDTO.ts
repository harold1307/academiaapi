import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateProgramaEnCursoEscuela } from "../../Domain/ICreateProgramaEnCursoEscuela";

const schema = z.object<ZodInferSchema<ICreateProgramaEnCursoEscuela>>({
	registroExterno: z.boolean(),
	programaId: z.string().uuid(),
	cursoEscuelaId: z.string().uuid(),
	mallaId: z.string().uuid().nullable(),
	modalidadId: z.string().uuid().nullable(),
	nivelDesde: z.number().int().min(0).max(10).nullable(),
	nivelHasta: z.number().int().min(0).max(10).nullable(),
});

class CreateProgramaEnCursoEscuelaDTOError extends BaseDTOError<ICreateProgramaEnCursoEscuela> {
	constructor(error: z.ZodError<ICreateProgramaEnCursoEscuela>) {
		super(error);
		this.name = "CreateProgramaEnCursoEscuelaDTOError";
		this.message =
			"Error de validacion para crear el programa en curso escuela";
	}
}

export class CreateProgramaEnCursoEscuelaDTO extends BaseValidatorDTO<
	ICreateProgramaEnCursoEscuela,
	CreateProgramaEnCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateProgramaEnCursoEscuelaDTOError, input);
	}
}
