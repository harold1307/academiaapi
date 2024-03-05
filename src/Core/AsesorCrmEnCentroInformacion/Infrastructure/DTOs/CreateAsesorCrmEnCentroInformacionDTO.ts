import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsesorCrmEnCentroInformacion } from "../../Domain/ICreateAsesorCrmEnCentroInformacion";

const schema = z.object<ZodInferSchema<ICreateAsesorCrmEnCentroInformacion>>({
	centroInformacionIds: z.array(z.string().uuid()),
	asesorCrmId: z.string().uuid(),
});

class CreateAsesorCrmEnCentroInformacionDTOError extends BaseDTOError<ICreateAsesorCrmEnCentroInformacion> {
	constructor(error: z.ZodError<ICreateAsesorCrmEnCentroInformacion>) {
		super(error);
		this.name = "CreateAsesorCrmEnCentroInformacionDTOError";
		this.message =
			"Error de validacion para crear el asesor de crm en centro de informacion";
	}
}

export class CreateAsesorCrmEnCentroInformacionDTO extends BaseValidatorDTO<
	ICreateAsesorCrmEnCentroInformacion,
	CreateAsesorCrmEnCentroInformacionDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsesorCrmEnCentroInformacionDTOError, input);
	}
}
