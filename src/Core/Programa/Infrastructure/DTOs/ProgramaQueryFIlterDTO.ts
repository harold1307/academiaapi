import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IProgramaQueryFilter } from "../../Domain/IProgramaQueryFilter";

const schema = z
	.object<ZodInferSchema<IProgramaQueryFilter>>({
		nombre: z.string().optional(),
		mencion: z.string().optional(),
		alias: z.string().optional(),
		detalleNivelTitulacionId: z.string().uuid().optional(),
		coordinacionId: z.string().uuid().optional(),
		coordinacion_sedeId: z.string().uuid().optional(),
		estado: z.boolean({ coerce: true }).optional(),
	})
	.optional();

class ProgramaQueryFilterDTOError extends BaseDTOError<IProgramaQueryFilter> {
	constructor(error: z.ZodError<IProgramaQueryFilter>) {
		super(error);
		this.name = "ProgramaQueryFilterDTOError";
		this.message = "Filtros de programa invalidos";
	}
}

export class ProgramaQueryFilterDTO extends BaseValidatorDTO<
	IProgramaQueryFilter,
	ProgramaQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, ProgramaQueryFilterDTOError, input);
	}
}
