import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateResponsableAsesorEstudiante } from "../../Domain/ICreateResponsableAsesorEstudiante";

const schema = z.object<ZodInferSchema<ICreateResponsableAsesorEstudiante>>({
	administrativoId: z.string().uuid(),
	seguimientoBienestar: z.boolean(),
	seguimientoExpediente: z.boolean(),
});

class CreateResponsableAsesorEstudianteDTOError extends BaseDTOError<ICreateResponsableAsesorEstudiante> {
	constructor(error: z.ZodError<ICreateResponsableAsesorEstudiante>) {
		super(error);
		this.name = "CreateResponsableAsesorEstudianteDTOError";
		this.message =
			"Error de validacion para crear el responsable de asesor de estudiante";
	}
}

export class CreateResponsableAsesorEstudianteDTO extends BaseValidatorDTO<
	ICreateResponsableAsesorEstudiante,
	CreateResponsableAsesorEstudianteDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateResponsableAsesorEstudianteDTOError, input);
	}
}
