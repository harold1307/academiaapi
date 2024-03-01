import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateRequisitoMatriculacion } from "../../Domain/ICreateRequisitoMatriculacion";

const schema = z.object<ZodInferSchema<ICreateRequisitoMatriculacion>>({
	obligatorio: z.boolean(),
	transferenciaIES: z.boolean(),
	primeraMatricula: z.boolean(),
	repitenMaterias: z.boolean(),
	descripcion: z.string().nullable(),
	nivel: z.number().int().min(0).max(10).nullable(),
	nombre: z.string(),

	programaId: z.string().uuid().nullable(),
	sedeId: z.string().uuid(),
	modalidadId: z.string().uuid().nullable(),
	periodoId: z.string().uuid(),
	tipoDocumentoId: z.string().uuid(),
});

class CreateRequisitoMatriculacionDTOError extends BaseDTOError<ICreateRequisitoMatriculacion> {
	constructor(error: z.ZodError<ICreateRequisitoMatriculacion>) {
		super(error);
		this.name = "CreateRequisitoMatriculacionDTOError";
		this.message =
			"Error de validacion para crear el requisito de matriculacion";
	}
}

export class CreateRequisitoMatriculacionDTO extends BaseValidatorDTO<
	ICreateRequisitoMatriculacion,
	CreateRequisitoMatriculacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateRequisitoMatriculacionDTOError, input);
	}
}
