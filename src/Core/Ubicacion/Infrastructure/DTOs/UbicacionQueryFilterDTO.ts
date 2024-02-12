import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUbicacionQueryFilter } from "../../Domain/IUbicacionQueryFilter";

const schema = z
	.object<ZodInferSchema<IUbicacionQueryFilter>>({
		tipo: z
			.enum(["AULA", "LABORATORIO", "TALLER", "SALON"] as const)
			.optional(),
		estado: z.boolean().optional(),
		capacidad: z.number().min(0).int().optional(),
		entornoVirtual: z.boolean().optional(),
		nombre: z.string().min(1).optional(),
		sedeId: z.string().uuid().optional(),
	})
	.optional();

class UbicacionQueryFilterDTOError extends BaseDTOError<IUbicacionQueryFilter> {
	constructor(error: z.ZodError<IUbicacionQueryFilter>) {
		super(error);
		this.name = "UbicacionQueryFilterDTOError";
		this.message = "Filtros de ubicacion invalidos";
	}
}

export class UbicacionQueryFilterDTO extends BaseValidatorDTO<
	IUbicacionQueryFilter,
	UbicacionQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, UbicacionQueryFilterDTOError, input);
	}
}
