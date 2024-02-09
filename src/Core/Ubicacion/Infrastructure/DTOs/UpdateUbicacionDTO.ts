import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateUbicacion } from "../../Domain/IUpdateUbicacion";

const schema = z.object<ZodInferSchema<IUpdateUbicacion>>({
	tipo: z.enum(["AULA", "LABORATORIO", "TALLER", "SALON"] as const).optional(),
	capacidad: z.number().min(0).int().optional(),
	entornoVirtual: z.boolean().optional(),
	nombre: z.string().min(1).optional(),
	estado: z.boolean().optional(),
});

class UpdateUbicacionDTOError extends BaseDTOError<IUpdateUbicacion> {
	constructor(error: z.ZodError<IUpdateUbicacion>) {
		super(error);
		this.name = "UpdateUbicacionDTOError";
		this.message = "Error de validacion para actualizar la ubicacion";
	}
}

export class UpdateUbicacionDTO extends BaseValidatorDTO<
	IUpdateUbicacion,
	UpdateUbicacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateUbicacionDTOError, input);
	}
}
