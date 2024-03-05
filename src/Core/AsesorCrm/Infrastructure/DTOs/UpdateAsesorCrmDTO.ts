// import { z } from "zod";

// import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
// import type { ZodInferSchema } from "../../../../types";
// import type { IUpdateAsesorCrm } from "../../Domain/IUpdateAsesorCrm";

// const schema = z.object<ZodInferSchema<IUpdateAsesorCrm>>({})

// class UpdateAsesorCrmDTOError extends BaseDTOError<IUpdateAsesorCrm> {
// 	constructor(error: z.ZodError<IUpdateAsesorCrm>) {
// 		super(error);
// 		this.name = "UpdateAsesorCrmDTOError";
// 		this.message =
// 			"Error de validacion para actualizar el AsesorCrm";
// 	}
// }

// export class UpdateAsesorCrmDTO extends BaseValidatorDTO<
// 	IUpdateAsesorCrm,
// 	UpdateAsesorCrmDTOError
// > {
// 	constructor(input: unknown) {
// 		super(schema, UpdateAsesorCrmDTOError, input);
// 	}
// }
