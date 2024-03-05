import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsesorCrm } from "../../Domain/ICreateAsesorCrm";

const schema = z.object<ZodInferSchema<ICreateAsesorCrm>>({
	administrativoId: z.string().uuid(),
});

class CreateAsesorCrmDTOError extends BaseDTOError<ICreateAsesorCrm> {
	constructor(error: z.ZodError<ICreateAsesorCrm>) {
		super(error);
		this.name = "CreateAsesorCrmDTOError";
		this.message = "Error de validacion para crear el asesor de crm";
	}
}

export class CreateAsesorCrmDTO extends BaseValidatorDTO<
	ICreateAsesorCrm,
	CreateAsesorCrmDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsesorCrmDTOError, input);
	}
}
