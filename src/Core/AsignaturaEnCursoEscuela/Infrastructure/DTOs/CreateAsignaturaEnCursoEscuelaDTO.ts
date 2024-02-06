import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnCursoEscuela } from "../../Domain/ICreateAsignaturaEnCursoEscuela";

const schema = z.object<ZodInferSchema<ICreateAsignaturaEnCursoEscuela>>({
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	requeridoAprobar: z.boolean(),
	asistenciaAprobar: z.number().nullable(),
	cantidadDecimales: z.number().nullable(),
	notaMaxima: z.number().nullable(),
	notaMinima: z.number().nullable(),

	asignaturaId: z.string(),
	cursoEscuelaId: z.string(),
	profesorId: z.string().nullable(),
	modeloEvaluativoId: z.string().nullable(),
});

class CreateAsignaturaEnCursoEscuelaDTOError extends BaseDTOError<ICreateAsignaturaEnCursoEscuela> {
	constructor(error: z.ZodError<ICreateAsignaturaEnCursoEscuela>) {
		super(error);
		this.name = "CreateAsignaturaEnCursoEscuelaDTOError";
		this.message =
			"Error de validacion para crear la asignatura en curso escuela";
	}
}

export class CreateAsignaturaEnCursoEscuelaDTO extends BaseValidatorDTO<
	ICreateAsignaturaEnCursoEscuela,
	CreateAsignaturaEnCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaEnCursoEscuelaDTOError, input);
	}
}
