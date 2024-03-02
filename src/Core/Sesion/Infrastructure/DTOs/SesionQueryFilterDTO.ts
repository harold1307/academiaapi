import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ISesionQueryFilter } from "../../Domain/ISesionQueryFilter";

const schema = z
	.object<ZodInferSchema<ISesionQueryFilter>>({
		nombre: z.string().optional(),
		sedeId: z.string().uuid().optional(),
		alias: z.string().optional(),
		lunes: z.boolean({ coerce: true }).optional(),
		martes: z.boolean({ coerce: true }).optional(),
		miercoles: z.boolean({ coerce: true }).optional(),
		jueves: z.boolean({ coerce: true }).optional(),
		viernes: z.boolean({ coerce: true }).optional(),
		sabado: z.boolean({ coerce: true }).optional(),
		domingo: z.boolean({ coerce: true }).optional(),
		estado: z.boolean({ coerce: true }).optional(),
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
