import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateProgramaEnVarianteCurso } from "../../Domain/IUpdateProgramaEnVarianteCurso";

const schema = z.object<ZodInferSchema<IUpdateProgramaEnVarianteCurso>>({
	mallaId: z.string().uuid().nullable().optional(),
	modalidadId: z.string().uuid().nullable().optional(),
	programaId: z.string().uuid().optional(),
	registroExterno: z.boolean().optional(),
});

class UpdateProgramaEnVarianteCursoDTOError extends BaseDTOError<IUpdateProgramaEnVarianteCurso> {
	constructor(error: z.ZodError<IUpdateProgramaEnVarianteCurso>) {
		super(error);
		this.name = "UpdateProgramaEnVarianteCursoDTOError";
		this.message =
			"Error de validacion para actualizar el programa en variante de curso";
	}
}

export class UpdateProgramaEnVarianteCursoDTO extends BaseValidatorDTO<
	IUpdateProgramaEnVarianteCurso,
	UpdateProgramaEnVarianteCursoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateProgramaEnVarianteCursoDTOError, input);
	}
}
