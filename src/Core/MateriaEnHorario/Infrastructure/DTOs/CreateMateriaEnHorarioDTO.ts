import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateMateriaEnHorario } from "../../Domain/ICreateMateriaEnHorario";

const schema = z.object<ZodInferSchema<ICreateMateriaEnHorario>>({
	dia: z.enum([
		"LUNES",
		"MARTES",
		"MIERCOLES",
		"JUEVES",
		"VIERNES",
		"SABADO",
		"DOMINGO",
	] as const),
	materiaId: z.string().uuid(),
	nivelAcademicoId: z.string().uuid(),
	turnoId: z.string().uuid(),
	ubicacionId: z.string().uuid(),
});

class CreateMateriaEnHorarioDTOError extends BaseDTOError<ICreateMateriaEnHorario> {
	constructor(error: z.ZodError<ICreateMateriaEnHorario>) {
		super(error);
		this.name = "CreateMateriaEnHorarioDTOError";
		this.message = "Error de validacion para crear la materia en horario";
	}
}

export class CreateMateriaEnHorarioDTO extends BaseValidatorDTO<
	ICreateMateriaEnHorario,
	CreateMateriaEnHorarioDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateMateriaEnHorarioDTOError, input);
	}
}
