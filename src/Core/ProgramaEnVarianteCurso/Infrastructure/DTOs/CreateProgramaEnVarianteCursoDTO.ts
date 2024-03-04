import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateProgramaEnVarianteCurso } from "../../Domain/ICreateProgramaEnVarianteCurso";

const schema = z.object<ZodInferSchema<ICreateProgramaEnVarianteCurso>>({
	mallaId: z.string().uuid().nullable(),
	modalidadId: z.string().uuid().nullable(),
	programaId: z.string().uuid(),
	registroExterno: z.boolean(),
	varianteCursoId: z.string().uuid(),
});

class CreateProgramaEnVarianteCursoDTOError extends BaseDTOError<ICreateProgramaEnVarianteCurso> {
	constructor(error: z.ZodError<ICreateProgramaEnVarianteCurso>) {
		super(error);
		this.name = "CreateProgramaEnVarianteCursoDTOError";
		this.message =
			"Error de validacion para crear el programa en variante de curso";
	}
}

export class CreateProgramaEnVarianteCursoDTO extends BaseValidatorDTO<
	ICreateProgramaEnVarianteCurso,
	CreateProgramaEnVarianteCursoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateProgramaEnVarianteCursoDTOError, input);
	}
}
