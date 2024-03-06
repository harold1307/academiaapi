// import { z } from "zod";

// import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
// import type { ZodInferSchema } from "../../../../types";
// import type { IUpdateResponsableEnAsesorEstudiante } from "../../Domain/IUpdateResponsableEnAsesorEstudiante";

// const schema = z.object<ZodInferSchema<IUpdateResponsableEnAsesorEstudiante>>({})

// class UpdateResponsableEnAsesorEstudianteDTOError extends BaseDTOError<IUpdateResponsableEnAsesorEstudiante> {
// 	constructor(error: z.ZodError<IUpdateResponsableEnAsesorEstudiante>) {
// 		super(error);
// 		this.name = "UpdateResponsableEnAsesorEstudianteDTOError";
// 		this.message =
// 			"Error de validacion para actualizar el ResponsableEnAsesorEstudiante";
// 	}
// }

// export class UpdateResponsableEnAsesorEstudianteDTO extends BaseValidatorDTO<
// 	IUpdateResponsableEnAsesorEstudiante,
// 	UpdateResponsableEnAsesorEstudianteDTOError
// > {
// 	constructor(input: unknown) {
// 		super(schema, UpdateResponsableEnAsesorEstudianteDTOError, input);
// 	}
// }
