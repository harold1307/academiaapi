import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateSubPeriodoLectivo } from "../../Domain/IUpdateSubPeriodoLectivo";

const schema = z.object<ZodInferSchema<IUpdateSubPeriodoLectivo>>({
	fechaFin: z.date().optional(),
	fechaInicio: z.date().optional(),
	nombre: z.string().optional(),
});

class UpdateSubPeriodoLectivoDTOError extends BaseDTOError<IUpdateSubPeriodoLectivo> {
	constructor(error: z.ZodError<IUpdateSubPeriodoLectivo>) {
		super(error);
		this.name = "UpdateSubPeriodoLectivoDTOError";
		this.message = "Error de validacion para actualizar el subperiodo lectivo";
	}
}

export class UpdateSubPeriodoLectivoDTO extends BaseValidatorDTO<
	IUpdateSubPeriodoLectivo,
	UpdateSubPeriodoLectivoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateSubPeriodoLectivoDTOError, input);
	}
}
