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

	nivelId: z.string().uuid(),
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
