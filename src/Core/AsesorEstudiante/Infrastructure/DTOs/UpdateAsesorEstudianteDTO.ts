import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsesorEstudiante } from "../../Domain/IUpdateAsesorEstudiante";

const schema = z.object<ZodInferSchema<IUpdateAsesorEstudiante>>({
	seguimientoBienestar: z.boolean().optional(),
	seguimientoExpediente: z.boolean().optional(),
});

class UpdateAsesorEstudianteDTOError extends BaseDTOError<IUpdateAsesorEstudiante> {
	constructor(error: z.ZodError<IUpdateAsesorEstudiante>) {
		super(error);
		this.name = "UpdateAsesorEstudianteDTOError";
		this.message =
			"Error de validacion para actualizar el asesor de estudiante";
	}
}

export class UpdateAsesorEstudianteDTO extends BaseValidatorDTO<
	IUpdateAsesorEstudiante,
	UpdateAsesorEstudianteDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsesorEstudianteDTOError, input);
	}
}
