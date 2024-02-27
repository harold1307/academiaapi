import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAdministrativo } from "../../Domain/ICreateAdministrativo";

const schema = z.object<ZodInferSchema<ICreateAdministrativo>>({
	sedeId: z.string().uuid(),
});

class CreateAdministrativoDTOError extends BaseDTOError<ICreateAdministrativo> {
	constructor(error: z.ZodError<ICreateAdministrativo>) {
		super(error);
		this.name = "CreateAdministrativoDTOError";
		this.message = "Error de validacion para crear el usuario administrativo";
	}
}

export class CreateAdministrativoDTO extends BaseValidatorDTO<
	ICreateAdministrativo,
	CreateAdministrativoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAdministrativoDTOError, input);
	}
}
