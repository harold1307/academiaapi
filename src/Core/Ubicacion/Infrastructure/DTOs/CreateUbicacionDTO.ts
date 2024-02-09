import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateUbicacion } from "../../Domain/ICreateUbicacion";

const schema = z.object<ZodInferSchema<ICreateUbicacion>>({
	tipo: z.enum(["AULA", "LABORATORIO", "TALLER", "SALON"] as const),
	capacidad: z.number().min(0).int(),
	entornoVirtual: z.boolean(),
	nombre: z.string().min(1),
});

class CreateUbicacionDTOError extends BaseDTOError<ICreateUbicacion> {
	constructor(error: z.ZodError<ICreateUbicacion>) {
		super(error);
		this.name = "CreateUbicacionDTOError";
		this.message = "Error de validacion para crear la ubicacion";
	}
}

export class CreateUbicacionDTO extends BaseValidatorDTO<
	ICreateUbicacion,
	CreateUbicacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateUbicacionDTOError, input);
	}
}
