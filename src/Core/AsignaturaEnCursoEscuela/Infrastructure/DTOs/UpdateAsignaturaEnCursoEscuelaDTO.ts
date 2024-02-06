import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaEnCursoEscuela } from "../../Domain/IUpdateAsignaturaEnCursoEscuela";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaEnCursoEscuela>>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),
	asistenciaAprobar: z.number().nullable().optional(),
	cantidadDecimales: z.number().nullable().optional(),
	notaMaxima: z.number().nullable().optional(),
	notaMinima: z.number().nullable().optional(),

	asignaturaId: z.string().optional(),
	modeloEvaluativoId: z.string().uuid().nullable().optional(),

	profesorId: z.string().nullable().optional(),
});

class UpdateAsignaturaEnCursoEscuelaDTOError extends BaseDTOError<IUpdateAsignaturaEnCursoEscuela> {
	constructor(error: z.ZodError<IUpdateAsignaturaEnCursoEscuela>) {
		super(error);
		this.name = "UpdateAsignaturaEnCursoEscuelaDTOError";
		this.message =
			"Error de validacion para actualizar la asignatura en curso escuela";
	}
}

export class UpdateAsignaturaEnCursoEscuelaDTO extends BaseValidatorDTO<
	IUpdateAsignaturaEnCursoEscuela,
	UpdateAsignaturaEnCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaEnCursoEscuelaDTOError, input);
	}
}
