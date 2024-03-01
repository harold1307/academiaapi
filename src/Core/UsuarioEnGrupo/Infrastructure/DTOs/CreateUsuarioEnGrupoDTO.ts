import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateUsuarioEnGrupo } from "../../Domain/ICreateUsuarioEnGrupo";

const schema = z.object<ZodInferSchema<ICreateUsuarioEnGrupo>>({
	grupoId: z.string().uuid(),
	usuarioId: z.string().uuid(),
});

class CreateUsuarioEnGrupoDTOError extends BaseDTOError<ICreateUsuarioEnGrupo> {
	constructor(error: z.ZodError<ICreateUsuarioEnGrupo>) {
		super(error);
		this.name = "CreateUsuarioEnGrupoDTOError";
		this.message = "Error de validacion para crear el usuario en grupo";
	}
}

export class CreateUsuarioEnGrupoDTO extends BaseValidatorDTO<
	ICreateUsuarioEnGrupo,
	CreateUsuarioEnGrupoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateUsuarioEnGrupoDTOError, input);
	}
}
