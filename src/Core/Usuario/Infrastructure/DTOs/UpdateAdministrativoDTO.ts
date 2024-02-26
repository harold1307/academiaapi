import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAdministrativo } from "../../Domain/IUpdateAdministrativo";

const schema = z.object<ZodInferSchema<IUpdateAdministrativo>>({
	estado: z.boolean().optional(),
	parametrosInstitucion: z.boolean().optional(),
	talentoHumano: z.boolean().optional(),
	personalAdministrativo: z.boolean().optional(),
	profesores: z.boolean().optional(),
	periodosLectivos: z.boolean().optional(),
	asignaturas: z.boolean().optional(),
	modelosEvaluativos: z.boolean().optional(),
	crmPreinscritos: z.boolean().optional(),
	sedeId: z.string().uuid().optional(),
});

class UpdateAdministrativoDTOError extends BaseDTOError<IUpdateAdministrativo> {
	constructor(error: z.ZodError<IUpdateAdministrativo>) {
		super(error);
		this.name = "UpdateAdministrativoDTOError";
		this.message =
			"Error de validacion para actualizar el usuario administrativo";
	}
}

export class UpdateAdministrativoDTO extends BaseValidatorDTO<
	IUpdateAdministrativo,
	UpdateAdministrativoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAdministrativoDTOError, input);
	}
}
