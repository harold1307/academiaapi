import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateResponsableEnAsesorEstudiante } from "../../Domain/ICreateResponsableEnAsesorEstudiante";

const schema = z.object<ZodInferSchema<ICreateResponsableEnAsesorEstudiante>>({
	asesorEstudianteId: z.string().uuid(),
	responsableId: z.string().uuid(),
});

class CreateResponsableEnAsesorEstudianteDTOError extends BaseDTOError<ICreateResponsableEnAsesorEstudiante> {
	constructor(error: z.ZodError<ICreateResponsableEnAsesorEstudiante>) {
		super(error);
		this.name = "CreateResponsableEnAsesorEstudianteDTOError";
		this.message =
			"Error de validacion para crear el responsable en asesor de estudiante";
	}
}

export class CreateResponsableEnAsesorEstudianteDTO extends BaseValidatorDTO<
	ICreateResponsableEnAsesorEstudiante,
	CreateResponsableEnAsesorEstudianteDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateResponsableEnAsesorEstudianteDTOError, input);
	}
}
