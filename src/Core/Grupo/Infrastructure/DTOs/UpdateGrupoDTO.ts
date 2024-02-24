import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateGrupo } from "../../Domain/IUpdateGrupo";

const schema = z.object<ZodInferSchema<IUpdateGrupo>>({
	nombre: z.string().min(1).toUpperCase().trim().optional(),
});

class UpdateGrupoDTOError extends BaseDTOError<IUpdateGrupo> {
	constructor(error: z.ZodError<IUpdateGrupo>) {
		super(error);
		this.name = "UpdateGrupoDTOError";
		this.message = "Error de validacion para actualizar el Grupo";
	}
}

export class UpdateGrupoDTO extends BaseValidatorDTO<
	IUpdateGrupo,
	UpdateGrupoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateGrupoDTOError, input);
	}
}
