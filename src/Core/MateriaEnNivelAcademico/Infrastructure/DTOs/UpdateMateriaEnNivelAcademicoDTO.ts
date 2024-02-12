import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateMateriaEnNivelAcademico } from "../../Domain/IUpdateMateriaEnNivelAcademico";

const schema = z.object<ZodInferSchema<IUpdateMateriaEnNivelAcademico>>({
	estado: z.boolean().optional(),
	alias: z.string().nullable().optional(),
	fechaFin: z.date().optional(),
	fechaInicio: z.date().optional(),
	materiaExterna: z.boolean().optional(),
	validaParaCreditos: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	practicasPermitidas: z.boolean().optional(),
	sumaHorasProfesor: z.boolean().optional(),
});

class UpdateMateriaEnNivelAcademicoDTOError extends BaseDTOError<IUpdateMateriaEnNivelAcademico> {
	constructor(error: z.ZodError<IUpdateMateriaEnNivelAcademico>) {
		super(error);
		this.name = "UpdateMateriaEnNivelAcademicoDTOError";
		this.message =
			"Error de validacion para actualizar la materia en nivel academico";
	}
}

export class UpdateMateriaEnNivelAcademicoDTO extends BaseValidatorDTO<
	IUpdateMateriaEnNivelAcademico,
	UpdateMateriaEnNivelAcademicoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateMateriaEnNivelAcademicoDTOError, input);
	}
}
