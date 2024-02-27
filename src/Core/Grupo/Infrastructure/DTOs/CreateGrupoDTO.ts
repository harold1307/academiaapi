import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateGrupo } from "../../Domain/ICreateGrupo";

const schema = z.object<ZodInferSchema<ICreateGrupo>>({
	nombre: z.string().min(1).toUpperCase().trim(),
});

class CreateGrupoDTOError extends BaseDTOError<ICreateGrupo> {
	constructor(error: z.ZodError<ICreateGrupo>) {
		super(error);
		this.name = "CreateGrupoDTOError";
		this.message = "Error de validacion para crear el Grupo";
	}
}

export class CreateGrupoDTO extends BaseValidatorDTO<
	ICreateGrupo,
	CreateGrupoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateGrupoDTOError, input);
	}
}
