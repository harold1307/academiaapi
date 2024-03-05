import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsesorEstudiante } from "../../Domain/ICreateAsesorEstudiante";

const schema = z.object<ZodInferSchema<ICreateAsesorEstudiante>>({
	administrativoId: z.string().uuid(),
	seguimientoBienestar: z.boolean(),
	seguimientoExpediente: z.boolean(),
});

class CreateAsesorEstudianteDTOError extends BaseDTOError<ICreateAsesorEstudiante> {
	constructor(error: z.ZodError<ICreateAsesorEstudiante>) {
		super(error);
		this.name = "CreateAsesorEstudianteDTOError";
		this.message = "Error de validacion para crear el asesor de estudiante";
	}
}

export class CreateAsesorEstudianteDTO extends BaseValidatorDTO<
	ICreateAsesorEstudiante,
	CreateAsesorEstudianteDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsesorEstudianteDTOError, input);
	}
}
