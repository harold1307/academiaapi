import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateResponsableCrm } from "../../Domain/IUpdateResponsableCrm";

const schema = z.object<ZodInferSchema<IUpdateResponsableCrm>>({
	estado: z.boolean().optional(),
});

class UpdateResponsableCrmDTOError extends BaseDTOError<IUpdateResponsableCrm> {
	constructor(error: z.ZodError<IUpdateResponsableCrm>) {
		super(error);
		this.name = "UpdateResponsableCrmDTOError";
		this.message = "Error de validacion para actualizar el responsable de crm";
	}
}

export class UpdateResponsableCrmDTO extends BaseValidatorDTO<
	IUpdateResponsableCrm,
	UpdateResponsableCrmDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateResponsableCrmDTOError, input);
	}
}
