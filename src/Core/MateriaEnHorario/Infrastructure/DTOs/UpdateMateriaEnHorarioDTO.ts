import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateMateriaEnHorario } from "../../Domain/IUpdateMateriaEnHorario";

const schema = z.object<ZodInferSchema<IUpdateMateriaEnHorario>>({
	dia: z
		.enum([
			"LUNES",
			"MARTES",
			"MIERCOLES",
			"JUEVES",
			"VIERNES",
			"SABADO",
			"DOMINGO",
		] as const)
		.optional(),
	turnoId: z.string().uuid().optional(),
	ubicacionId: z.string().uuid().optional(),
	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
});

class UpdateMateriaEnHorarioDTOError extends BaseDTOError<IUpdateMateriaEnHorario> {
	constructor(error: z.ZodError<IUpdateMateriaEnHorario>) {
		super(error);
		this.name = "UpdateMateriaEnHorarioDTOError";
		this.message = "Error de validacion para actualizar la materia en horario";
	}
}

export class UpdateMateriaEnHorarioDTO extends BaseValidatorDTO<
	IUpdateMateriaEnHorario,
	UpdateMateriaEnHorarioDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateMateriaEnHorarioDTOError, input);
	}
}
