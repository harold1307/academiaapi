import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
// import type { ZodInferSchema } from "../../../../types";
import type { IUpdateUsuarioEnGrupo } from "../../Domain/IUpdateUsuarioEnGrupo";

// const schema = z.object<ZodInferSchema<IUpdateUsuarioEnGrupo>>({})
const schema = z.object({});

class UpdateUsuarioEnGrupoDTOError extends BaseDTOError<IUpdateUsuarioEnGrupo> {
	constructor(error: z.ZodError<IUpdateUsuarioEnGrupo>) {
		super(error);
		this.name = "UpdateUsuarioEnGrupoDTOError";
		this.message = "Error de validacion para actualizar el UsuarioEnGrupo";
	}
}

export class UpdateUsuarioEnGrupoDTO extends BaseValidatorDTO<
	IUpdateUsuarioEnGrupo,
	UpdateUsuarioEnGrupoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateUsuarioEnGrupoDTOError, input);
	}
}
