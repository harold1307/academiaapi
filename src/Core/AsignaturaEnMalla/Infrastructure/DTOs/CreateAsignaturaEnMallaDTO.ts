import { $Enums } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnMalla } from "../../Domain/ICreateAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<ICreateAsignaturaEnMalla>>({
	esAnexo: z.literal(false),
	nivel: z.number(),
	tipoAsignatura: z.nativeEnum($Enums.TipoAsignatura),
	identificacion: z.string(),

	permiteMatriculacion: z.boolean(),
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	practicasPreProfesionales: z.boolean(),
	requeridaEgreso: z.boolean(),

	cantidadMatriculas: z.number(),
	horasSemanales: z.number(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),

	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),

	objetivos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),
	competenciaGenerica: z.string().nullable(),

	asignaturaId: z.string().uuid(),
	mallaId: z.string().uuid(),
	ejeFormativoId: z.string().uuid(),
	areaConocimientoId: z.string().uuid(),
	campoFormacionId: z.string().uuid().nullable(),
});

class CreateAsignaturaEnMallaDTOError extends BaseDTOError<ICreateAsignaturaEnMalla> {
	constructor(error: z.ZodError<ICreateAsignaturaEnMalla>) {
		super(error);
		this.name = "CreateAsignaturaEnMallaDTOError";
		this.message = "Error de validacion para crear la asignatura en malla";
	}
}

export class CreateAsignaturaEnMallaDTO extends BaseValidatorDTO<
	ICreateAsignaturaEnMalla,
	CreateAsignaturaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaEnMallaDTOError, input);
	}
}
