import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateResponsableCrm } from "../../Domain/ICreateResponsableCrm";

const schema = z.object<ZodInferSchema<ICreateResponsableCrm>>({
	administrativoId: z.string().uuid(),
});

class CreateResponsableCrmDTOError extends BaseDTOError<ICreateResponsableCrm> {
	constructor(error: z.ZodError<ICreateResponsableCrm>) {
		super(error);
		this.name = "CreateResponsableCrmDTOError";
		this.message = "Error de validacion para crear el responsable de crm";
	}
}

export class CreateResponsableCrmDTO extends BaseValidatorDTO<
	ICreateResponsableCrm,
	CreateResponsableCrmDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateResponsableCrmDTOError, input);
	}
}
