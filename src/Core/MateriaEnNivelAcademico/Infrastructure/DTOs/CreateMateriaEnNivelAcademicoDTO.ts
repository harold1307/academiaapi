import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateMateriaEnNivelAcademico } from "../../Domain/ICreateMateriaEnNivelAcademico";

const schema = z.object<ZodInferSchema<ICreateMateriaEnNivelAcademico>>({
	modeloEvaluativoId: z.string().uuid(),
	nivelAcademicoId: z.string().uuid(),
	asignaturasMalla: z.array(z.string().uuid()),
	modulosMalla: z.array(z.string().uuid()),
});

class CreateMateriaEnNivelAcademicoDTOError extends BaseDTOError<ICreateMateriaEnNivelAcademico> {
	constructor(error: z.ZodError<ICreateMateriaEnNivelAcademico>) {
		super(error);
		this.name = "CreateMateriaEnNivelAcademicoDTOError";
		this.message =
			"Error de validacion para crear la materia en nivel academico";
	}
}

export class CreateMateriaEnNivelAcademicoDTO extends BaseValidatorDTO<
	ICreateMateriaEnNivelAcademico,
	CreateMateriaEnNivelAcademicoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateMateriaEnNivelAcademicoDTOError, input);
	}
}
