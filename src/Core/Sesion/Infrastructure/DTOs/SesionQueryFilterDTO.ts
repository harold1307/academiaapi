import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ISesionQueryFilter } from "../../Domain/ISesionQueryFilter";

const schema = z
	.object<ZodInferSchema<ISesionQueryFilter>>({
		nombre: z.string().optional(),
		sedeId: z.string().uuid().optional(),
		alias: z.string().optional(),
		lunes: z.boolean().optional(),
		martes: z.boolean().optional(),
		miercoles: z.boolean().optional(),
		jueves: z.boolean().optional(),
		viernes: z.boolean().optional(),
		sabado: z.boolean().optional(),
		domingo: z.boolean().optional(),
		estado: z.boolean().optional(),
	})
	.optional();

class SesionQueryFilterDTOError extends BaseDTOError<ISesionQueryFilter> {
	constructor(error: z.ZodError<ISesionQueryFilter>) {
		super(error);
		this.name = "SesionQueryFilterDTOError";
		this.message = "Filtros de sesion invalidos";
	}
}

export class SesionQueryFilterDTO extends BaseValidatorDTO<
	ISesionQueryFilter,
	SesionQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, SesionQueryFilterDTOError, input);
	}
}
