import { $Enums } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAnexoAsignaturaEnMalla } from "../../Domain/ICreateAnexoAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<ICreateAnexoAsignaturaEnMalla>>({
	esAnexo: z.literal(true),
	nivel: z.literal(0),
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
	competenciaGenerica: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),

	ejeFormativoId: z.null(),
	asignaturaId: z.string().uuid(),
	mallaId: z.string().uuid(),
	areaConocimientoId: z.string().uuid(),
	campoFormacionId: z.string().uuid(),
});

class CreateAnexoAsignaturaEnMallaDTOError extends BaseDTOError<ICreateAnexoAsignaturaEnMalla> {
	constructor(error: z.ZodError<ICreateAnexoAsignaturaEnMalla>) {
		super(error);
		this.name = "CreateAnexoAsignaturaEnMallaDTOError";
		this.message =
			"Error de validacion para crear la asignatura anexa a la malla";
	}
}

export class CreateAnexoAsignaturaEnMallaDTO extends BaseValidatorDTO<
	ICreateAnexoAsignaturaEnMalla,
	CreateAnexoAsignaturaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAnexoAsignaturaEnMallaDTOError, input);
	}
}
