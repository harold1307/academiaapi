import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateRequisitoMatriculacion } from "../../Domain/IUpdateRequisitoMatriculacion";

const schema = z.object<ZodInferSchema<IUpdateRequisitoMatriculacion>>({
	obligatorio: z.boolean().optional(),
	transferenciaIES: z.boolean().optional(),
	primeraMatricula: z.boolean().optional(),
	repitenMaterias: z.boolean().optional(),
	descripcion: z.string().nullable().optional(),

	nivelId: z.string().uuid().optional(),
	tipoDocumentoId: z.string().uuid().optional(),
});

class UpdateRequisitoMatriculacionDTOError extends BaseDTOError<IUpdateRequisitoMatriculacion> {
	constructor(error: z.ZodError<IUpdateRequisitoMatriculacion>) {
		super(error);
		this.name = "UpdateRequisitoMatriculacionDTOError";
		this.message =
			"Error de validacion para actualizar el requisito de matriculacion";
	}
}

export class UpdateRequisitoMatriculacionDTO extends BaseValidatorDTO<
	IUpdateRequisitoMatriculacion,
	UpdateRequisitoMatriculacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateRequisitoMatriculacionDTOError, input);
	}
}
