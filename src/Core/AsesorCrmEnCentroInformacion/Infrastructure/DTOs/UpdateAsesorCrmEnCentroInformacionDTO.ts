import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsesorCrmEnCentroInformacion } from "../../Domain/IUpdateAsesorCrmEnCentroInformacion";

const schema = z.object<ZodInferSchema<IUpdateAsesorCrmEnCentroInformacion>>({
	centroInformacionIds: z.array(z.string().uuid()),
	asesorCrmId: z.string().uuid(),
});

class UpdateAsesorCrmEnCentroInformacionDTOError extends BaseDTOError<IUpdateAsesorCrmEnCentroInformacion> {
	constructor(error: z.ZodError<IUpdateAsesorCrmEnCentroInformacion>) {
		super(error);
		this.name = "UpdateAsesorCrmEnCentroInformacionDTOError";
		this.message =
			"Error de validacion para actualizar el AsesorCrmEnCentroInformacion";
	}
}

export class UpdateAsesorCrmEnCentroInformacionDTO extends BaseValidatorDTO<
	IUpdateAsesorCrmEnCentroInformacion,
	UpdateAsesorCrmEnCentroInformacionDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsesorCrmEnCentroInformacionDTOError, input);
	}
}
