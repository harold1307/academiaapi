import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateSubPeriodoLectivo } from "../../Domain/ICreateSubPeriodoLectivo";

const schema = z.object<ZodInferSchema<ICreateSubPeriodoLectivo>>({
	fechaFin: z.date(),
	fechaInicio: z.date(),
	nombre: z.string(),
	periodoId: z.string().uuid(),
});

class CreateSubPeriodoLectivoDTOError extends BaseDTOError<ICreateSubPeriodoLectivo> {
	constructor(error: z.ZodError<ICreateSubPeriodoLectivo>) {
		super(error);
		this.name = "CreateSubPeriodoLectivoDTOError";
		this.message = "Error de validacion para crear el subperiodo lectivo";
	}
}

export class CreateSubPeriodoLectivoDTO extends BaseValidatorDTO<
	ICreateSubPeriodoLectivo,
	CreateSubPeriodoLectivoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateSubPeriodoLectivoDTOError, input);
	}
}
