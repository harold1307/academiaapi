// import { z } from "zod";

// import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
// import type { ZodInferSchema } from "../../../../types";
// import type { IUpdateResponsableAsesorEstudiante } from "../../Domain/IUpdateResponsableAsesorEstudiante";

// const schema = z.object<ZodInferSchema<IUpdateResponsableAsesorEstudiante>>({})

// class UpdateResponsableAsesorEstudianteDTOError extends BaseDTOError<IUpdateResponsableAsesorEstudiante> {
// 	constructor(error: z.ZodError<IUpdateResponsableAsesorEstudiante>) {
// 		super(error);
// 		this.name = "UpdateResponsableAsesorEstudianteDTOError";
// 		this.message =
// 			"Error de validacion para actualizar el ResponsableAsesorEstudiante";
// 	}
// }

// export class UpdateResponsableAsesorEstudianteDTO extends BaseValidatorDTO<
// 	IUpdateResponsableAsesorEstudiante,
// 	UpdateResponsableAsesorEstudianteDTOError
// > {
// 	constructor(input: unknown) {
// 		super(schema, UpdateResponsableAsesorEstudianteDTOError, input);
// 	}
// }
